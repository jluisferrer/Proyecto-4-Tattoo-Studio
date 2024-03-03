import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { TokenData } from "../types";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {

        
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json(
                {
                    success: false,
                    message: "UNAUTHORIZED"
                })
        }

        jwt.verify(
            token,
            process.env.JWT_SECRET as string);
        // next();
        const decoder = jwt.decode(token);
       
        req.tokenData = decoder as TokenData;
        next();
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Something went wrong",
                error: error
            })
    }

}

