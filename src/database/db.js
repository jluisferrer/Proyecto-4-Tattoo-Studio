"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const _1708971393938_roles_1 = require("./migrations/1708971393938-roles");
const _1708971453794_users_1 = require("./migrations/1708971453794-users");
const _1708971478080_appointments_1 = require("./migrations/1708971478080-appointments");
const _1708971492544_services_1 = require("./migrations/1708971492544-services");
const Role_1 = require("../models/Role");
const User_1 = require("../models/User");
const Appointment_1 = require("../models/Appointment");
const Service_1 = require("../models/Service");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3308,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "test",
    entities: [Role_1.Role, User_1.User, Appointment_1.Appointment, Service_1.Service],
    migrations: [_1708971393938_roles_1.Roles1708971393938, _1708971453794_users_1.Users1708971453794, _1708971492544_services_1.Services1708971492544, _1708971478080_appointments_1.Appointments1708971478080],
    synchronize: false,
    logging: false,
});
