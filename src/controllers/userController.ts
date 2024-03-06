import { Request, Response } from "express"
import { User } from "../models/User"
export const getUsers = async (req: Request, res: Response) => {
  try {
    // let limit = Number(req.query.limit) || 10
    // const page = Number(req.query.page) || 2
    // const skip = (page - 1) * limit 

    // if (limit>100){
    //   limit=10
    //   // return res.status(404).json({
    //   // success:false,
    //   // message:"Has superado el limite"
    //   // })
    //  
    // }

    const users = await User.find(
      {
        select: {
          id: true,
          name: true,
          email: true,
        },
        // take: limit,
        // skip: skip

      }

    )
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Users cant be retrieved",
      error: error
    })
  }
}
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.tokenData.userId;
    const user = await User.findOneBy(
      {
        id:userId
      }
    )
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    res.status(200).json({
      success: true,
      message: "User retrieved",
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User cant be retrieved",
      error: error
    })
  }
}
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const name = req.body.first_name;

    const user = await User.findOneBy(
      {
        id: parseInt(userId)
      }
    )
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    const userUpdated = await User.update(
      {
        id: parseInt(userId)
      },
      {
        name: name
      }
    );

    res.status(200).json({
      success: true,
      message: "User updated",
      data: userUpdated
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User cant be updated",
      error: error
    })
  }
}

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const userToRemove: any = await User.findOneBy({
      id: parseInt(userId),
    })

    if (!userToRemove) {
      return res.status(404).json({
        success: false,
        message: "User cant be deleted",
      })
    }

    const userDeleted = await User.delete(userToRemove)

    res.status(200).json({
      success: false,
      message: "User deleted",
      data: userDeleted
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User cant be deleted",
      error: error
    })
  }
}