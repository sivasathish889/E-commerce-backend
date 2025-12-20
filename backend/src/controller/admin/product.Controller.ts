import type { Request, Response } from "express";
import { prisma } from "../../prisma/index.js";
import asyncHandler from "express-async-handler";
import type { ProductType } from "../../types/types.js";

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
    const { name, price, offer, description, categoryId, supplierId, } = req.body as ProductType
    const images = req.files as Express.Multer.File[]
    if (!name || !price || !offer || !description || !categoryId || !supplierId) {
        res.status(400).json({ message: "Please fill all the fields", success: false })
        return
    }
    if (images.length > 7) {
        res.status(400).json({ message: "Please upload at least one image", success: false })
        return
    }
    const isNameExist = await prisma.product.findFirst({
        where: {
            name: name
        }
    })
    if (isNameExist) {
        res.status(400).json({ message: "Product name already exist", success: false })
        return
    }
    const product = prisma.product.create({
        data: {
            name,
            price: parseFloat(price),
            offer: parseFloat(offer),
            description,
            categoryId: Number(categoryId),
            supplierId: Number(supplierId),
            images: {
                create: images.map((item) => {
                    return {
                        url: item.path,
                    }
                })
            }
        },
        include: {
            category: true,
            supplier: true,
            images: true,
        }
    })
    product.then((result) => {
        res.status(200).json({ message: "Product added successfully", success: true, product: result })
        return
    })
})

export const addCategory = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body
    const image = req.file?.path
    if (!name || !image) {
        res.status(400).json({ message: "Please fill all the fields", success: false })
        return
    }
    const category = await prisma.category.create({
        data: {
            name,
            picture: image
        }
    })
    res.status(200).json({ message: "Category added successfully", success: true, category })
    return
})

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany()
    res.status(200).json({ message: "Categories fetched successfully", success: true, data: categories })
    return
})