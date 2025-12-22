import type { Request, Response } from "express";
import { prisma } from "../prisma/index.js";
import asyncHandler from "express-async-handler";
import { emailValidator, phoneValidator } from "../config/regex.js";
import { comparePass, hashPass } from "../config/bcrypt.js"
import jwt from "jsonwebtoken"
export const registerController = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, phone } = req.body
    if (!name || !email || !password || !phone) {
        res.status(400).json({ message: "Please fill all the fields", success: false })
        return
    }
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (user) {
        res.status(400).json({ message: "User already exists", success: false })
        return
    }
    if (!emailValidator(email)) {
        res.status(400).json({ message: "Invalid email", success: false })
        return
    }
    if (!phoneValidator(String(phone))) {
        res.status(400).json({ message: "Invalid phone number", success: false })
        return
    }
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPass(password),
            phone: phone,
            role: "ADMIN"
        }
    })
    if (!newUser) {
        res.status(400).json({ message: "Something went wrong", success: false })
        return
    }
    res.status(200).json({ message: "User created successfully", success: true, data: newUser })
})

export const loginController = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ message: "Please fill all the fields", success: false })
        return
    }
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (!user) {
        res.status(400).json({ message: "User does not exist", success: false })
        return
    }
    if (!comparePass(password, user.password)) {
        res.status(400).json({ message: "Invalid password", success: false })
        return
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
    res.status(200).json({ message: "User logged in successfully", success: true, data: JSON.stringify(user) })
    return
});