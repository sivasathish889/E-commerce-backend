import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/index.js";

export const addRole = asyncHandler(async (req: Request, res: Response) => {
    const { role } = req.body
    if (!role) {
        res.status(400).json({ message: "Please fill all the fields", success: false })
        return
    }
    const isRoleExist = await prisma.role.findFirst({
        where: {
            name: role
        }
    })
    if (isRoleExist) {
        res.status(400).json({ message: "Role already exist", success: false })
        return
    }
    const newRole = await prisma.role.create({
        data: {
            name: role
        }
    })
    res.status(200).json({ message: "Role added successfully", success: true, data: newRole })
})