import express, { Application } from "express";
import "dotenv/config";
import { createRole, deleteRole, getRoles, updateRole } from "./controllers/roleController";
import { AppDataSource } from "./database/db";
import { login, register } from "./controllers/authController";
import { deleteUserById, getUserById, getUsers, updateUserById } from "./controllers/userController";
import { auth } from "./middlewares/auth";
import { isSuperAdmin } from "./middlewares/isSuperAdmin";
import { getServices } from "./controllers/servicesController";
import { GetUserAppointments, PostAppointment, RecoverAppointments, UpdateAppointment, AppointmentDelete } from "./controllers/appointmentController";
import cors from "cors";


export const app: Application = express();

app.use(express.json())
app.use(cors())

app.get('/healthy', (req, res) => {
  res.status(200).json(
    {
      success: true,
      message: "Server is healthy"
    }
  );
})


// roles routes
// app.get('/roles', getRoles)
app.post('/roles', auth, isSuperAdmin, createRole)
app.put('/roles', auth, isSuperAdmin, updateRole)
app.delete('/roles', auth, isSuperAdmin, deleteRole)
app.put('/roles/:id', auth, isSuperAdmin, updateRole)
app.delete('/roles/:id', auth, isSuperAdmin, deleteRole)

//Auth routes
app.post('/api/auth/register', register) //ok
app.post('/api/auth/login', login)  //ok

//User routes
app.get('/api/users', auth, isSuperAdmin, getUsers) //ok
app.get('/api/users/profile/', auth, getUserById)      //ok
app.put('/api/users/profile/', auth, updateUserById)  //ok
app.delete('/api/users/:id', auth, isSuperAdmin, deleteUserById)    //ok

//Apointment routes
app.post('/api/appointments', auth, PostAppointment) //ok
app.put('/api/appointments', auth, UpdateAppointment) //ok
app.get('/api/appointments/:id', auth, RecoverAppointments) //ok?
app.get('/api/appointments', auth, GetUserAppointments)  //ok
app.delete('/api/appointments/:id',auth, AppointmentDelete)


//Services routes
app.get('/api/services', getServices) //ok