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
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoles = void 0;
const Role_1 = require("../models/Role");
const getRoles = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Roles retrieved successfuly"
    });
};
exports.getRoles = getRoles;
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // recuperar la info a traves del body
        console.log(req.body);
        const name = req.body.name;
        if (name.length > 50) {
            return res.status(400).json({
                success: false,
                message: "Role name must be under 50 characters"
            });
        }
        const newRole = yield Role_1.Role.create({
            name: name
        }).save();
        res.status(201).json({
            success: true,
            message: "Role created",
            data: newRole
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "role cant be created",
            error: error
        });
    }
});
exports.createRole = createRole;
const updateRole = (req, res) => {
    //recuperar parametros de la ruta
    console.log(req.params.id);
    res.status(200).json({
        success: true,
        message: "Role updated"
    });
};
exports.updateRole = updateRole;
const deleteRole = (req, res) => {
    //recuperar parametros de la ruta
    console.log(req.params.id);
    res.status(200).json({
        success: true,
        message: "Role deleted"
    });
};
exports.deleteRole = deleteRole;
