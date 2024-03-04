import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { Service } from "../models/Service";

export const PostAppointment = async (req: Request, res: Response) => {
    try {
        const appointment_date = req.body.appointment_date;
        const user_id = req.tokenData.userId;
        const service_id = req.body.service_id;

        const service = await Service.findOneBy({
            id: parseInt(service_id)
        });
        if (!service) {
            return res.status(400).json({
                success: false,
                message: "Service not found"
            });
        }

        const newAppointment = await Appointment.create({
            appointmentDate: appointment_date,
            user: ({ id: user_id }),
            service: { id: parseInt(service_id) }
        }).save();

        return res.status(201).json({
            success: true,
            message: "Appointment posted successfully",
            data: newAppointment
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
        // console.log(UserId)
        // console.log(AppointmentId)
        // console.log(appointment_date)
        // console.log(ServiceId)

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
                    id: 2
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