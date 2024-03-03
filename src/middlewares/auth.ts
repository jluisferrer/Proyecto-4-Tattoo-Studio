import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenData } from "../types";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Soy el auth middleware');

        const token = req.headers.authorization?.split("")[1];

        if (!token) {
            return res.status(401).json(
                {
                    success: false,
                    message: "UNATHORIZED"

                })
        }
        //SI FUNCIONA RECUPERA LOS DATOS ENCRYPTADOS
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        console.log(decoded);
        // ESOS DATOS LOS PASA COMO TOKENdATA COMO NUEVOS CAMPOS DE LA INTERFACE REQUEST

        req.tokenData = decoded as TokenData

        next();
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "JWT not valid or malformed",
            error: error
        })

    }

  

}

