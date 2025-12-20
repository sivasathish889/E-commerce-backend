import type { Request, Response } from "express";
import { prisma } from "../../prisma/index.js";
import asyncHandler from "express-async-handler";
import { emailValidator, phoneValidator } from "../../config/regex.js";
import { hashPass } from "../../config/bcrypt.js"

const registerConroller = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, phone } = req.body
    if (!name || !email || !password || !phone) {
        res.status(400).json({ message: "Please fill all the fields" })
        return
    }
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (user) {
        res.status(400).json({ message: "User already exists" })
        return
    }
    if (!emailValidator(email)) {
        res.status(400).json({ message: "Invalid email" })
        return
    }
    if (!phoneValidator(String(phone))) {
        res.status(400).json({ message: "Invalid phone number" })
        return
    }
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPass(password),
            phone,
        }
    })
    if (!newUser) {
        res.status(400).json({ message: "Something went wrong" })
        return
    }
    res.status(200).json({ message: "User created successfully", data: newUser })
})

export default registerConroller;