import type { Request, Response } from "express";
import { prisma } from "../prisma/index.js";
import asyncHandler from "express-async-handler";



export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id || isNaN(Number(id))) {
        res.status(400).json({ message: "Invalid or missing user ID", success: false })
        return
    }
    const user = await prisma.user.findFirst({
        where: {
            id: Number(id)
        },
        include : {
            role : true
        }
    })
    if (!user) {
        res.status(404).json({ message: "User does not exist", success: false })
        return
    }
    res.status(200).json({ message: "User fetched successfully", success: true, data: user })
}
)

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                password: false
            }
        })
        res.status(200).json({ message: "Users fetched successfully", success: true, data: users })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false })
    }
})