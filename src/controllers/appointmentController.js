"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserAppointments = exports.RecoverAppointments = exports.UpdateAppointment = exports.PostAppointment = void 0;
const Appointment_1 = require("../models/Appointment");
const Service_1 = require("../models/Service");
const PostAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment_date = req.body.appointment_date;
        const user_id = req.tokenData.userId;
        const service_id = req.body.service_id;
        const service = yield Service_1.Service.findOneBy({
            id: parseInt(service_id)
        });
        if (!service) {
            return res.status(400).json({
                success: false,
                message: "Service not found"
            });
        }
        const newAppointment = yield Appointment_1.Appointment.create({
            appointmentDate: appointment_date,
            user: ({ id: user_id }),
            service: ({ id: parseInt(service_id) })
        }).save();
        return res.status(201).json({
            success: true,
            message: "Appointment posted successfully",
            data: newAppointment
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Appointment can't be posted",
            error: error
        });
    }
});
exports.PostAppointment = PostAppointment;
const UpdateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AppointmentId = req.body.appointment_id;
        const UserId = req.tokenData.userId;
        const appointment_date = req.body.appointment_date;
        const ServiceId = req.body.service_id;
        // console.log(UserId)
        // console.log(AppointmentId)
        // console.log(appointment_date)
        // console.log(ServiceId)
        const appointment = yield Appointment_1.Appointment.findOneBy({
            id: parseInt(AppointmentId)
        });
        if (!appointment) {
            return res.status(400).json({
                success: false,
                message: "Appointment not found ",
            });
        }
        const appointmentUpdated = yield Appointment_1.Appointment.update({
            id: parseInt(AppointmentId),
            user: {
                id: UserId
            }
        }, {
            appointmentDate: appointment_date,
            service: {
                id: 2
            },
        });
        return res.status(200).json({
            success: true,
            message: "Appointment updated succesfully ",
            data: appointmentUpdated
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Appointment can't be updated ",
            error: error
        });
    }
});
exports.UpdateAppointment = UpdateAppointment;
const RecoverAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AppointmentId = req.params.id;
        const UserId = req.tokenData.userId;
        const appointment = yield Appointment_1.Appointment.findOneBy({
            id: parseInt(AppointmentId)
        });
        if (!appointment) {
            return res.status(400).json({
                success: false,
                message: "Appointment not found "
            });
        }
        const users = yield Appointment_1.Appointment.find({
            where: {
                id: parseInt(AppointmentId),
                user: { id: UserId }
            }
        });
        res.status(201).json({
            success: true,
            message: "Appointment retrieved succesfully ",
            data: users
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment can't be recovered ",
            error: error
        });
    }
});
exports.RecoverAppointments = RecoverAppointments;
const GetUserAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.tokenData.userId;
        const appointment = yield Appointment_1.Appointment.find({
            where: {
                user: { id: UserId }
            }
        });
        res.status(200).json({
            success: true,
            message: "Services retrieved succesfully ",
            data: appointment
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Service can't be retrieved ",
            error: error
        });
    }
});
exports.GetUserAppointments = GetUserAppointments;
