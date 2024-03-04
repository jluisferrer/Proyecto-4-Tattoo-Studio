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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const email = req.body.email;
        const password = req.body.password_hash;
        const name = req.body.first_name;
        const lastName = req.body.last_name;
        // Validacion password
        if (password.length < 6 || password.length > 10) {
            return res.status(400).json({
                success: false,
                message: "La contraseña tiene que estar entre 6 y 10 caracateres"
            });
        }
        // Validacion email
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json({
                success: false,
                message: "format email invalid"
            });
        }
        // tratamos la data si fuera necesario
        const passwordEncrypted = bcrypt_1.default.hashSync(password, 8);
        // comprobamos que se genara la contraseña encriptada
        console.log(passwordEncrypted);
        const newUser = yield User_1.User.create({
            name: name,
            lastName: lastName,
            email: email,
            password: passwordEncrypted,
            role: {
                id: 1
            }
        }).save();
        //todo enviar email
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: newUser
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "user cant be registered",
            error: error
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //recuperar info
        const email = req.body.email;
        const password = req.body.password_hash;
        //validación email
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are needed"
            });
        }
        // buscar user en DB
        const user = yield User_1.User.findOne({
            where: {
                email: email
            },
            relations: {
                role: true
            },
            select: {
                id: true,
                password: true,
                email: true,
                role: {
                    name: true
                }
            }
        });
        // dar error si no existe
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        // devolver user
        // console.log(user);
        // comparar passwords
        const isValidPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                succes: false,
                message: "Email o password invalid"
            });
        }
        //crear token
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            roleName: user.role.name
        }, process.env.JWT_SECRET, {
            expiresIn: "2h"
        });
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User cannot be logged in",
            error: error
        });
    }
});
exports.login = login;
