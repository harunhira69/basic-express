import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    // console.log(req.body)


    try {
        const result = await userService.createUserIntoDB(req.body)
        // console.log(result)

        res.status(201).json({
            success: true,
            message: "Create user successfully",
            data: result.rows[0],

        });
    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message,
            data: error

        });
    }



};

// get all users 
const getUsers = async(req:Request,res:Response)=>{
      try {
           const result = await userService.getAllUsers()
            res.status(200).json({
                success: true,
                message: "Get all user",
                data: result.rows,
            })
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
                error: error
            })
    
        }

};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
       const result = await userService.getSingleUser(id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: {}

            });
            return

        }
        res.status(200).json({
            success: true,
            message: "Get single user",
            data: result.rows[0]
        });


    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
};


// update users
const updateUsers = async (req: Request, res: Response) => {
    const {id} = req.params;
//    const { name, password, age, is_active } = req.body;

    try {
        const result = await userService.updateUsersDB(req.body,id as string)
        // console.log(result.rows)
        if (result.rows.length === 0) {
            res.status(404).json({
                sucess: false,
                message: "User not found",
            })
            return
        }
        res.status(200).json({
            success: true,
            message: "Used update successfully",
            data: { result }
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
};


// delete user
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteUserFromDB(id as string)
        if (result.rowCount === 0) {
            res.status(404).json({
                sucess: false,
                message: "User not found",
            });
            return

        }
        res.status(200).json({
            success: true,
            message: "User Deleted successfully",
            data: { result }
        })


    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }


};


export const userController = {
    createUser,
    getUsers,
    getSingleUser,
    updateUsers,
    deleteUser
}