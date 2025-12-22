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

export const getRoles = asyncHandler(async (req: Request, res: Response) => {
    const roles = await prisma.role.findMany({
        include: {
            user: true,
            rollToPermission: true
        }
    })
    if (!roles) {
        res.status(400).json({ message: "Something went wrong", success: false })
        return
    }
    res.status(200).json({ message: "Roles fetched successfully", success: true, data: roles })
})


export const deleteRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ message: "Please fill all the fields", success: false })
        return
    }
    const role = await prisma.role.delete({
        where: {
            id: Number(id)
        }
    })
    if (!role) {
        res.status(400).json({ message: "Something went wrong", success: false })
        return
    }
    res.status(200).json({ message: "Role deleted successfully", success: true, data: role })
})

export const updateRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const { role } = req.body
    if (!id || !role) {
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
    const updatedRole = await prisma.role.update({
        where: {
            id: Number(id)
        },
        data: {
            name: role
        }
    })
    if (!updatedRole) {
        res.status(400).json({ message: "Something went wrong", success: false })
        return
    }
    res.status(200).json({ message: "Role updated successfully", success: true, data: updatedRole })
})
