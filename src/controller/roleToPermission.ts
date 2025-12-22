import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/index.js";


export const addRolToPermission = asyncHandler(async (req: Request, res: Response) => {
    const { roleId, permissionId } = req.body
    if (!roleId || !permissionId) {
        res.status(400).json({ message: "Please fill all the fields", success: false })
        return
    }
    const role = await prisma.role.findFirst({
        where: {
            id: Number(roleId)
        }
    })
    if (!role) {
        res.status(400).json({ message: "Role does not exist", success: false })
        return
    }
    const permission = await prisma.permission.findFirst({
        where: {
            id: Number(permissionId)
        }
    })
    if (!permission) {
        res.status(400).json({ message: "Permission does not exist", success: false })
        return
    }
    const rolePermission = await prisma.rolToPermission.create({
        data: {
            roleId: Number(roleId),
            permissionId: Number(permissionId)
        }
    })
    if (!rolePermission) {
        res.status(400).json({ message: "Something went wrong", success: false })
        return
    }
    res.status(200).json({ message: "Role permission added successfully", success: true, data: rolePermission })
})

export const getRolToPermission = asyncHandler(async (req: Request, res: Response) => {
    const rolePermission = await prisma.rolToPermission.findMany({
        include: {
            role: true,
            permission: true
        }
    })
    if (!rolePermission) {
        res.status(400).json({ message: "Something went wrong", success: false })
        return
    }
    res.status(200).json({ message: "Role permission fetched successfully", success: true, data: rolePermission })
})

export const deleteRolToPermission = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ message: "Please fill all the fields", success: false })
        return
    }
    const rolePermission = await prisma.rolToPermission.delete({
        where: {
            id: Number(id)
        }
    })
    if (!rolePermission) {
        res.status(400).json({ message: "Something went wrong", success: false })
        return
    }
    res.status(200).json({ message: "Role permission deleted successfully", success: true, data: rolePermission })
})

