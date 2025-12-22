const emailRegex = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
const phoneRegex = (/^(\+\d{1,3}[- ]?)?\d{10}$/)
export const emailValidator = (email: string) => emailRegex.test(email)
export const phoneValidator = (phone: string) => phoneRegex.test(phone)

