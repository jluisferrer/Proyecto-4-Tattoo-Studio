import 'dotenv/config'
import { app } from "./app";
import { AppDataSource } from './database/db';

const PORT = process.env.PORT || 4001;

const startServer = () => {
    AppDataSource.initialize()
        .then(() => {
            console.log('Database connected');

            app.listen(PORT, () => {     //llamamos al metodo en el puerto 4000 para que escuche, como un boton de encendido para el servidor
                console.log(`Server is running on port: ${PORT}`);
            })
        })

        .catch(error => {
            console.log(error);
        })

}

startServer();



