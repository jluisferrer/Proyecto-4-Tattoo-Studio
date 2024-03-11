import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";


export const register = async (req: Request, res: Response) => {
  try {
    console.log('------------------------------------------');
    
console.log(req.body);
console.log('------------------------------------------');

    const email = req.body.email;
    const inputPassword = req.body.password_hash;
    const name = req.body.first_name;
    const lastName = req.body.last_name




    if (inputPassword.length < 6 || inputPassword.length > 10) {
      return res.status(400).json({
        success: false,
        message: "The password must be between 6 and 10 characters"

      })
    }


    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmail.test(email)) {
      return res.status(400).json(
        {
          success: false,
          message: "Invalid format mail"
        }
      )
    }



    const passwordEncrypted = bcrypt.hashSync(inputPassword, 8);




    const newUser = await User.create({
      name: name,
      lastName: lastName,
      email: email,
      password: passwordEncrypted,
      role: {
        id: 1
      }
    }).save()
   const { password,...printUser}=newUser
    //todo enviar email

    res.status(201).json(
      {
        success: true,
        message: 'User registered successfully',
        data: printUser
      }
    )
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User cant be registered",
      error: error.message
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    //recuperar info
    const email = req.body.email;
    const password = req.body.password_hash;
    //validación email
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are needed"
      })
    }
    // buscar user en DB
    const user = await User.findOne({
      where: {
        email: email
      },
      relations: {
        role: true
      },
      select: {
        id: true,
        password: true,
        email: true,
        role: {
          name: true
        }
      }
    })
    // dar error si no existe
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }
    // devolver user

    // comparar passwords

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        succes: false,
        message: "Email o password invalid"
      })
    }

    //crear token
    const token = jwt.sign(
      {
        userId: user.id,
        roleName: user.role.name
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2h"
      }
    )


    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User cannot be logged in",
      error: error
    })
  }
}