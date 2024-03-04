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
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getUsers = void 0;
const User_1 = require("../models/User");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 2;
        const skip = (page - 1) * limit;
        if (limit > 100) {
            limit = 10;
            // return res.status(404).json({
            // success:false,
            // message:"Has superado el limite"
            // })
            // console.log()
        }
        const users = yield User_1.User.find({
            select: {
                id: true,
                name: true,
                email: true,
            },
            take: limit,
            skip: skip
        });
        res.status(200).json({
            success: true,
            message: "users retrieved successfully",
            data: users
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "users cant be retrieved",
            error: error
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield User_1.User.findOneBy({
            id: parseInt(userId)
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "user retrieved",
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "user cant be retrieved",
            error: error
        });
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const name = req.body.first_name;
        // validar datos
        const user = yield User_1.User.findOneBy({
            id: parseInt(userId)
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        // tratar datos
        // actualizar en BD
        const userUpdated = yield User_1.User.update({
            id: parseInt(userId)
        }, {
            name: name
        });
        //responder
        res.status(200).json({
            success: true,
            message: "user updated",
            data: userUpdated
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "user cant be updated",
            error: error
        });
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const userToRemove = yield User_1.User.findOneBy({
            id: parseInt(userId),
        });
        if (!userToRemove) {
            return res.status(404).json({
                success: false,
                message: "user cant be deleted",
            });
        }
        const userDeleted = yield User_1.User.delete(userToRemove);
        res.status(200).json({
            success: false,
            message: "user deleted",
            data: userDeleted
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "user cant be deleted",
            error: error
        });
    }
});
exports.deleteUserById = deleteUserById;
