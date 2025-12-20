import { Router } from "express";
import registerController from "../controller/admin/register.controller.js";
const routes = Router()

routes.post("/register",registerController)



export default routes;