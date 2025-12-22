import bcrypt from "bcryptjs"

const hashPass = (pas: any) => {
    return bcrypt.hashSync(pas, 10)
}
const comparePass = (pas: any, hash: any) => {
    return bcrypt.compareSync(pas, hash)
}

export { hashPass, comparePass }