import { Router } from "express";
import { loginController, registerController } from "../controller/auth.Controller.js";
import { addProduct, getProductById, getProducts, deleteProduct, updateProduct, } from "../controller/product.Controller.js";
import { CategoryUpload, ProductUpload } from "../middleware/fileUpload.js";
import { addCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../controller/category.controller.js";
import { addRole } from "../controller/role.controller.js";
const routes = Router()

// auth
routes.post("/register", registerController)
routes.get("/login", loginController)

// product
routes.post("/addProduct", ProductUpload, addProduct)
routes.get("/products", getProducts)
routes.get("/product:id", getProductById)
routes.put("/product:id", ProductUpload, updateProduct)
routes.delete("/product:id", deleteProduct)

// Category
routes.post("/addCategory", CategoryUpload, addCategory)
routes.get("/categories", getCategory)
routes.get("/category:id", getCategoryById)
routes.put("/category:id", CategoryUpload, updateCategory)
routes.delete("/category:id", deleteCategory)

// Role
routes.post("/addRole", addRole)




export default routes;