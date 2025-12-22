import jwt from "jsonwebtoken"

export const jwtSign = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
    })
}

export const jwtVerify = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string)
}