import type { Request, Response } from "express"
import { profileSevice } from "./profile.service"

const createProfile = async(req:Request,res:Response)=>{
      try {
        const result = await profileSevice.createProfileIntoDB(req.body);
        res.status(201).json({
            success:true,
            message:"User Created successfully",
            data:result
        })
      } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,
            data:error
            
        })
        
      }
}

export const profileController = {
    createProfile,
}