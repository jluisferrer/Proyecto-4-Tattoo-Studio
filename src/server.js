"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const roleController_1 = require("./controllers/roleController");
const db_1 = require("./database/db");
const authController_1 = require("./controllers/authController");
const userController_1 = require("./controllers/userController");
const auth_1 = require("./middlewares/auth");
const isSuperAdmin_1 = require("./middlewares/isSuperAdmin");
const servicesController_1 = require("./controllers/servicesController");
const appointmentController_1 = require("./controllers/appointmentController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 4001;
app.get('/healthy', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    });
});
// roles routes
app.get('/roles', roleController_1.getRoles);
app.post('/roles', auth_1.auth, isSuperAdmin_1.isSuperAdmin, roleController_1.createRole);
app.put('/roles', auth_1.auth, isSuperAdmin_1.isSuperAdmin, roleController_1.updateRole);
app.delete('/roles', auth_1.auth, isSuperAdmin_1.isSuperAdmin, roleController_1.deleteRole);
app.put('/roles/:id', roleController_1.updateRole);
app.delete('/roles/:id', roleController_1.deleteRole);
//Auth routes
app.post('/api/auth/register', authController_1.register);
app.post('/api/auth/login', authController_1.login);
//User routes
app.get('/api/users', auth_1.auth, isSuperAdmin_1.isSuperAdmin, userController_1.getUsers);
app.get('/api/users/:id', userController_1.getUserById);
app.put('/api/users/:id', userController_1.updateUserById);
app.delete('/api/users/:id', userController_1.deleteUserById);
//Apointment routes
app.post('/api/appointments', auth_1.auth, appointmentController_1.PostAppointment);
app.put('/api/appointments', auth_1.auth, appointmentController_1.UpdateAppointment);
app.get('/api/appointments/:id', auth_1.auth, appointmentController_1.RecoverAppointments);
app.get('/api/appointments', auth_1.auth, appointmentController_1.GetUserAppointments);
//Services routes
app.get('/api/services', servicesController_1.getServices);
db_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database conected');
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
})
    .catch(error => {
    console.log(error);
});
