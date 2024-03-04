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


const app: Application = express();

app.use(express.json())

const PORT = process.env.PORT || 4001;
app.get('/healthy', (req, res) => {
  res.status(200).json(
    {
      success: true,
      message: "Server is healthy"
    }
  );
})

// roles routes
app.get('/roles', getRoles)
app.post('/roles',auth, isSuperAdmin, createRole)
app.put('/roles', auth, isSuperAdmin, updateRole)
app.delete('/roles', auth, isSuperAdmin, deleteRole)
app.put('/roles/:id',auth, isSuperAdmin, updateRole)
app.delete('/roles/:id',auth, isSuperAdmin, deleteRole)

//Auth routes
app.post('/api/auth/register', register) //ok
app.post('/api/auth/login', login)  //ok

//User routes
app.get('/api/users', auth, isSuperAdmin, getUsers) //ok
app.get('/api/users/profile/:id', getUserById)      //ok
app.put('/api/users/profile/:id', updateUserById)  //ok
app.delete('/api/users/:id', deleteUserById)

//Apointment routes
app.post('/api/appointments',auth, PostAppointment) //ok
app.put('/api/appointments',auth,UpdateAppointment) //ok
app.get('/api/appointments/:id',auth,RecoverAppointments) //ok?
app.get('/api/appointments',auth,GetUserAppointments)  //ok


//Services routes
app.get('/api/services',getServices) //ok


AppDataSource.initialize()
.then(()=>{
    console.log('Database conected');
    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })
})
.catch(error =>{
    console.log(error);
})





