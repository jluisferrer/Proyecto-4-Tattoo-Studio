import "reflect-metadata"
import "dotenv/config";
import { DataSource } from "typeorm"
import { Roles1708971393938 } from "./migrations/1708971393938-roles";
import { Users1708971453794 } from "./migrations/1708971453794-users";
import { Appointments1708971478080 } from "./migrations/1708971478080-appointments";
import { Services1708971492544 } from "./migrations/1708971492544-services";
import { Role } from "../models/Role";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { Service } from "../models/Service";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3308,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_DATABASE || "test",
    entities: [Role, User, Appointment, Service],
    migrations: [Roles1708971393938, Users1708971453794, Services1708971492544, Appointments1708971478080],
    synchronize: false,
    logging: false,
})