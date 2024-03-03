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
            return res.status(500).json({
                success: false,
                message: "Service not found"
            });
        }

        const newAppointment = await Appointment.create({
            appointmentDate: appointment_date,
            user: [{ id: user_id }],
            service: [{ id: parseInt(service_id) }]
        }).save();

        return res.status(201).json({
            success: true,
            message: "Appointment posted successfully",
            data: newAppointment
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Appointment can't be posted",
            error: error
        });
    }
};

export const UpdateAppointment = async (req: Request, res: Response) => {
    try {
        const AppointmentId = req.body.id;
        const UserId = req.tokenData.userId;
        const appointment_date = req.body.appointment_date;
        const ServiceId = req.body.service_id


        const appointment = await Appointment.findOneBy({
            id: parseInt(AppointmentId)
        })

        if (!appointment) {
            return res.status(500).json({
                success: false,
                message: "Appointment not found ",

            })
        }
        const appointmentUpdated = await Appointment.update(
            {
                id: parseInt(AppointmentId),

                user:{
                id:UserId
            } 
            },
            {
                appointmentDate: appointment_date,
                service:[{id: parseInt(ServiceId)}],
            },

        )

        return res.status(200).json({
            success: true,
            message: "Appointment updated succesfully ",
            data: appointmentUpdated
        })

    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment can't be updated ",
            error: error
        })
    }
}