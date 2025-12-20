import type { Request, Response } from "express";

export const addProduct = (req: Request, res: Response) => {
    const { } = req.body
}

export const addCategory = (req: Request, res: Response) => {
    const { name } = req.body
    const image = req.file
    console.log(name, image)
    res.send("ok")
}

