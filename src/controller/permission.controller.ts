import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/index.js";

export const addPermission = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body
    if (!name) {
        res.status(400).json({ message: "Please fill all the fields", success: false })
        return
    }
    const isExist = await prisma.permission.findFirst({
        where: {
            action: name
        }
    })
    if (isExist) {
        res.status(400).json({ message: "Permission already exists", success: false })
        return
    }
    const permission = await prisma.permission.create({
        data: {
            action: name,
        }
    })
    if (!permission) {
        res.status(400).json({ message: "Something went wrong", success: false })
        return
    }
    res.status(200).json({ message: "Permission added successfully", success: true, data: permission })
})

export const getAllPermissions = asyncHandler(async (req: Request, res: Response) => {
    const permissions = await prisma.permission.findMany()
    if (!permissions) {
        res.status(400).json({ message: "Something went wrong", success: false })
        return
    }
    res.status(200).json({ message: "Permissions fetched successfully", success: true, data: permissions })
})

export const getPermissionById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ message: "Please fill all the fields", success: false })
        return
    }
    const isExist = await prisma.permission.findFirst({
        where: {
            id: Number(id)
        }
    })
    if (!isExist) {
        res.status(400).json({ message: "Permission does not exists", success: false })
        return
    }
    const permission = await prisma.permission.findFirst({
        where: {
            id: Number(id)
        }
    })
    res.status(200).json({ message: "Permission fetched successfully", success: true, data: permission })
    return
})

export const deletePermission = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ message: "Please fill all the fields", success: false })
        return
    }
    const permission = await prisma.permission.delete({
        where: {
            id: Number(id)
        }
    })
    if (!permission) {
        res.status(400).json({ message: "Something went wrong", success: false })
        return
    }
    res.status(200).json({ message: "Permission deleted successfully", success: true, data: permission })
})

export const updatePermission = (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    if (!name) {
        res.status(400).json({ message: "Please fill all the fields", success: false })
    }
    const permission = prisma.permission.update({
        where: {
            id: Number(id)
        },
        data: {
            action: name
        }
    })
    if (!permission) {
        res.status(400).json({ message: "Something went wrong", success: false })
        return
    }
    res.status(200).json({ message: "Permission updated successfully", success: true, data: permission })
}
