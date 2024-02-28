import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const register = (req: Request, res: Response) => {
    try {
        res.status(201).json({
            success: true,
            message: "User registered successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cannot be registered",
            error: error
        })

    }

}