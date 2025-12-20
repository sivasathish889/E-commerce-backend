// import User from "../models/authModels"
import jwt from "jsonwebtoken"
import type { Request,Response,NextFunction } from "express"
const isAuth = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        if(!req.headers.cookie){
            return res.status(401).send({
                message:"Please Login.",
                success : false,
            })
        }
        let token = req.headers.cookie?.split("=")[0]
        if(!token){
            return res.status(401).send({
                message:"Please Login.",
                success : false,
            })
            }
        else{
            if(!process.env.JWT_STRING){
                return res.status(500).send({
                    message:"Server configuration error",
                    success : false,
                })
            }
            let id = jwt.verify(token, process.env.JWT_STRING)
            // req.user = await User.findById({_id : id})
            next()
        }

    } catch (error) {
        res.status(500).send({
            message : "Please Login",
            success : false,
            Error : true
        })
    }
}


module.exports ={
    isAuth 
}