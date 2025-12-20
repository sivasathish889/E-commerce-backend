import fs from "fs"
import path from "path"
import type { Request, Response, NextFunction } from "express"
// logger

const Logger = (req: Request, res: Response, next: NextFunction) => {
    const date = new Date()
    const time = date.toLocaleDateString() + " -- " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    const log = `${time} --  ${req.method} -- ${req.originalUrl}  ${res.statusCode} `
    console.log(log)
    fs.appendFile(path.join(__dirname, "../", "logs", "log.txt"), log + "\n", err => {
        if (err) {
            console.log(err)
        }
    })
    next()
}

module.exports = Logger