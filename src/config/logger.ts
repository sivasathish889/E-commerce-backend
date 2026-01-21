import fs from "fs"
import path from "path"
import type { Request, Response, NextFunction } from "express"
// logger

const Logger = (req: Request, res: Response, next: NextFunction) => {
    try {
        const date = new Date()
        const time = date.toLocaleDateString() + " -- " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        const log = `${time} --  ${req.method} -- ${req.originalUrl}  ${res.statusCode} `
        console.log(log)
        
        const logsDir = path.join(process.cwd(), "src", "logs")
        const logFilePath = path.join(logsDir, "log.txt")
        console.log(logFilePath)
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true })
        }
        
        fs.appendFile(logFilePath, log + "\n", err => {
            if (err) throw new Error(err.message)
        })
    } catch (error) {
        console.log(error)
    }
    next()
}

export default Logger