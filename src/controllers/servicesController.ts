import { Request, Response } from "express";
import { Service } from "../models/Service";

export const getServices = async (req: Request, res: Response) =>{
    try{
        const services = await Service.find()
        res.status(200).json({
            succes: true,
            message: "Services retrieved succesfully",
            data: services
        
        })
    }
    catch (error){
    res.status(500).json({
        succes: false,
        message:"Service cant be retrieved",
        error:error
    
    })
    }
}

