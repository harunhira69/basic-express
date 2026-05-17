import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserIntoDB = async(payload:IUser)=>{
    const { name, email, password, age } = payload;
        const result = await pool.query(`INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)
    RETURNING *     
        `, [name, email, password, age]);
        return result;
};

const getAllUsers = async()=>{
     const result = await pool.query(`
        SELECT * FROM users  
            `)
            return result
};

// get single user form db
const getSingleUser = async(id:any)=>{
     const result = await pool.query(`
        SELECT * FROM users WHERE id = $1
        `, [id]);
        return result
};

// update users 
const updateUsersDB = async(payload:IUser,id:string)=>{
    
        const { name, password, age, is_active } = payload;
        // console.log({id,name})
        const result = await pool.query(`
        UPDATE users 
        SET 
        name=COALESCE($1, name),
        password=COALESCE($2, password),
        age=COALESCE($3, age),
        is_active=COALESCE($4, is_active)
        WHERE id=$5
        RETURNING *    
            `,
            [name, password, age, is_active, id]);
            return  result
};

// Delete user from DB 
const deleteUserFromDB = async(id:string)=>{
    const result = await pool.query(`
        DELETE FROM users WHERE id=$1   
            `, [id]);
            return result
}


export const userService = {
    createUserIntoDB,
    getAllUsers,
    getSingleUser,
    updateUsersDB,
    deleteUserFromDB,
}
