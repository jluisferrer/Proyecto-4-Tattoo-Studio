// import express from "express"; //Importamos libreria express
// import { register } from "./controllers/authController";
// import { getRoles } from "./controllers/roleController";

// import 'dotenv/config'


// export const app = express();  //Creamos constante con el metodo express

// app.use(express.json());


// app.get('/healthy', (req, res) => {            /// Get recibe la url /healthy, esta funcion no la llevamos a un controlador y la exportamos debajo   
//     res.status(200).json({
//         succes: true,
//         message: "Server is healthy"

//     })
// })


//roles routes
// app.get('/roles', getRoles)
// app.post('/roles' createRoles)



//AUTH roles
// app.post('/api/register', register)




// export const RecoverAppointments = async (req: Request, res: Response) => {
//     try {
//         const AppointmentId = req.params.id;
//         const UserId = req.tokenData.userId;

//         const appointment = await Appointment.findOneBy({
//             id: parseInt(AppointmentId)
//         })

//         if (!appointment) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Appointment not found "
//             })
//         }
//         const users = await Appointment.find({
//             where: {
//                 id: parseInt(AppointmentId),
//                 user:{id:UserId} 
//             }
//         })
//         res.status(201).json({
//             success: true,
//             message: "Appointment retrieved succesfully ",
//             data: users

//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Appointment can't be recovered ",
//             error: error
//         })
//     }
// }
// export const GetUserAppointments = async (req: Request, res: Response) => {
//     try {
//         const UserId = req.tokenData.userId;
//         const appointment = await Appointment.find({
//             where: {
//                 user:{id: UserId}
//             }
//         })
//         res.status(200).json({
//             success: true,
//             message: "Services retrieved succesfully ",
//             data: appointment

//         })
//     }
//     catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Service can't be retrieved ",
//             error: error
//         })
//     }
// }