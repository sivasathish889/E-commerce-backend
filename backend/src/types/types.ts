
export type UserType = {
    id: string
    name: string
    email: string
    password: string
    type: UserType
    createdAt: Date
    updatedAt: Date
}

export type ProductType = {
    id: string
    name: string
    price: string
    offer: string
    description: string
    categoryId: string
    supplierId: string
    createdAt?: Date
    updatedAt?: Date
}