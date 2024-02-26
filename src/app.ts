import express from "express"; //Importamos libreria express



export const app = express();  //Creamos constante con el metodo express

app.use(express.json());


app.get('/healthy', (req, res) => {            /// Get recibe la url /healthy, esta funcion no la llevamos a un controlador y la exportamos debajo   
    res.status(200).json({
        succes: true,
        message: "Server is healthy"

    })
})