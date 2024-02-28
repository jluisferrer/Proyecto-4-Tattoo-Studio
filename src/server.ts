import express, { Application } from "express";
import "dotenv/config";
import { createRole, deleteRole, getRoles, updateRole } from "./controllers/roleController";
import { AppDataSource } from "./database/db";
import { register } from "./controllers/authController";
import { getUsers } from "./controllers/userController";




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
app.post('/roles', createRole)
app.put('/roles', updateRole)
app.delete('/roles', deleteRole)
app.put('/roles/:id', updateRole)
app.delete('/roles/:id', deleteRole)

//Auth routes
app.post('/api/register', register)

//User routes
app.get('/api/users', getUsers)


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




app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})
