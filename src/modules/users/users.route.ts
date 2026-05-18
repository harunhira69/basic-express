import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const route = Router()

// create/add users
route.get('/',auth(), userController.getUsers)
route.post('/',userController.createUser) 
route.get('/:id',userController.getSingleUser)
route.put('/:id',userController.updateUsers)
route.delete('/:id',userController.deleteUser)
export const userRouter = route;