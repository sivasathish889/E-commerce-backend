import { Router } from "express";
import loginController from "../middlewere/admin/login.controller.js";
const routes = Router()

routes.post("/login",loginController)



export default routes;