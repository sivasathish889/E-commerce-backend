import { Router } from "express";
import {loginController, registerController} from "../controller/adminController.js";
const routes = Router()

routes.post("/register", registerController)
routes.get("/login",loginController)



export default routes;