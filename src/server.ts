import express, { Application } from "express";
import "dotenv/config";
import { createRole, deleteRole, getRoles, updateRole } from "./controllers/roleController";
import { AppDataSource } from "./database/db";
import { login, register } from "./controllers/authController";
import { deleteUserById, getUserById, getUsers, updateUserById } from "./controllers/userController";
import { auth } from "./middlewares/auth";
import { isSuperAdmin } from "./middlewares/isSuperAdmin";
import { getServices } from "./controllers/servicesController";
import { GetUserAppointments, PostAppointment, RecoverAppointments, UpdateAppointment } from "./controllers/appointmentController";
import { app } from "./app";





const PORT = process.env.PORT || 4001;





AppDataSource.initialize()
  .then(() => {
    console.log('Database conected');
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    })
  })
  .catch(error => {
    console.log(error);
  })





