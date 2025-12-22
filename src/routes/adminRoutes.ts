import { Router } from "express";
import { loginController, registerController } from "../controller/auth.Controller.js";
import { addProduct, getProductById, getProducts, deleteProduct, updateProduct, } from "../controller/product.Controller.js";
import { CategoryUpload, ProductUpload } from "../middleware/fileUpload.js";
import { addCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../controller/category.controller.js";
import { addRole, deleteRole, getRoles, updateRole } from "../controller/role.controller.js";
import { addPermission, deletePermission, getPermissions, updatePermission } from "../controller/permission.controller.js";
import { addRolToPermission, deleteRolToPermission, getRolToPermission } from "../controller/roleToPermission.js";
import { getAllUsers, getUserById } from "../controller/user.controller.js";
const routes = Router()

// auth
routes.post("/register", registerController)
routes.get("/login", loginController)

// Users
routes.get("/users", getAllUsers)
routes.get("/user/:id",getUserById)

// product
routes.post("/addProduct", ProductUpload, addProduct)
routes.get("/products", getProducts)
routes.get("/product/:id", getProductById)
routes.put("/product/:id", ProductUpload, updateProduct)
routes.delete("/product/:id", deleteProduct)

// Category
routes.post("/addCategory", CategoryUpload, addCategory)
routes.get("/categories", getCategory)
routes.get("/category/:id", getCategoryById)
routes.put("/category/:id", CategoryUpload, updateCategory)
routes.delete("/category/:id", deleteCategory)

// Role
routes.post("/addRole", addRole)
routes.get("/addRole", getRoles)
routes.delete("/addRole:id", deleteRole)
routes.put("updateRole:id", updateRole)


// Permission
routes.post("/addPermission", addPermission)
routes.get("/addPermission", getPermissions)
routes.delete("/addPermission:id", deletePermission)
routes.put("updatePermission:id", updatePermission)

// role to permission
routes.post("/rolToPermission", addRolToPermission)
routes.get("/rolToPermission", getRolToPermission)
routes.delete("/rolToPermission:id", deleteRolToPermission)

export default routes;