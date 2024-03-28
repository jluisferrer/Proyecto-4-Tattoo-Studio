import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { Service } from "../models/Service";

export const PostAppointment = async (req: Request, res: Response) => {
    try {
        const appointment_date = req.body.appointmentDate;
        const user_id = req.tokenData.userId;
        const service_id = req.body.service_id;

        // Crear la cita
        const newAppointment = await Appointment.create({
            appointmentDate: appointment_date,
            user: { id: user_id },
            service: { id: parseInt(service_id) }
        }).save();

        // Obtener el nombre del servicio
        const service = await Service.findOneBy({ id: parseInt(service_id) });
        if (!service) {
            return res.status(400).json({
                success: false,
                message: "Service not found"
            });
        }

        // Enviar la respuesta con el nombre del servicio
        return res.status(201).json({
            success: true,
            message: "Appointment posted successfully",
            data: {
                ...newAppointment, // Datos de la cita
                serviceName: service.serviceName // Nombre del servicio
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Appointment can't be posted",
            error: error
        });
    }
};

export const UpdateAppointment = async (req: Request, res: Response) => {
    try {
        const AppointmentId = req.body.appointment_id;
        const UserId = req.tokenData.userId;
        const appointment_date = req.body.appointment_date;
        const ServiceId = req.body.service_id
        const appointment = await Appointment.findOneBy({
            id: parseInt(AppointmentId)
        })
        if (!appointment) {
            return res.status(400).json({
                success: false,
                message: "Appointment not found ",
            })
        }
        const appointmentUpdated = await Appointment.update(
            {
                id: parseInt(AppointmentId),
                user: {
                    id: UserId
                }
            },
            {
                appointmentDate: appointment_date,
                service: {
                    id: parseInt(ServiceId)
                },
            },
        )
        return res.status(200).json({
            success: true,
            message: "Appointment updated succesfully ",
            data: appointmentUpdated
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Appointment can't be updated ",
            error: error
        })
    }
}

export const RecoverAppointments = async (req: Request, res: Response) => {
    try {
        const AppointmentId = req.params.id;
        const UserId = req.tokenData.userId;
        const appointment = await Appointment.findOneBy({
            id: parseInt(AppointmentId)
        })

        if (!appointment) {
            return res.status(400).json({
                success: false,
                message: "Appointment not found "
            })
        }
        const users = await Appointment.find({
            where: {
                id: parseInt(AppointmentId),
                user: { id: UserId }
            }
        })
        res.status(201).json({
            success: true,
            message: "Appointment retrieved succesfully ",
            data: appointment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment can't be recovered ",
            error: error
        })
    }
}
export const GetUserAppointments = async (req: Request, res: Response) => {
    try {
        const UserId = req.tokenData.userId;
        const appointment = await Appointment.find({
            where: {
                user: { id: UserId }
            },
            relations: {
                service: true,
                user: true
            },
            select: {
                service: {
                    serviceName: true
                },
                user: {
                    name: true
                }
            }
        })
        res.status(200).json({
            success: true,
            message: "Appointments retrieved succesfully ",
            data: appointment
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment can't be retrieved ",
            error: error
        })
    }
}
export const AppointmentDelete = async (req: Request, res: Response) => {
    try {
        const appointmentId = parseInt(req.params.id);
        const userId = req.tokenData.userId; // Asegúrate de que 'userId' esté en camelCase si así está definido en tu modelo

        // Encuentra la cita asegurándote de que el usuario asociado coincida con el userId del token
        const appointment = await Appointment.findOne({
            where: { id: appointmentId, user: { id: userId } },
            relations: ['user'] // Esto incluirá la relación con el usuario en la consulta
        });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found or user does not have permission."
            });
        }

        // Si la cita existe y pertenece al usuario, proceder a borrarla
        await Appointment.delete({ id: appointmentId });

        return res.status(200).json({
            success: true,
            message: "Appointment deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the appointment.",
            error: error
        });
    }
};