import type { Request, Response } from "express";



export const getUser = (req: Request, res: Response) => {
    const { userId } = req.body
    if (!userId) {
        res.status(400).json({ message: "Please fill all the fields", success: false })
        return
    }
    
}