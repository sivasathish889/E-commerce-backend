import { Router } from "express";
import { loginController, registerController } from "../controller/admin/auth.Controller.js";
import { addProduct, addCategory } from "../controller/admin/product.Controller.js";
import { CategoryUpload, ProductUpload } from "../middlewere/fileUpload.js";
const routes = Router()

routes.post("/register", registerController)
routes.get("/login", loginController)
routes.post("/addProduct", ProductUpload, addProduct)
routes.post("/addCategory", CategoryUpload, addCategory)




export default routes;