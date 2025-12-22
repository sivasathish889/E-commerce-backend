import { Router } from "express";
import { loginController, registerController } from "../controller/auth.Controller.js";
import { addProduct, getProductById, getProducts, deleteProduct, updateProduct, } from "../controller/product.Controller.js";
import { CategoryUpload, ProductUpload } from "../middleware/fileUpload.js";
import { addCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../controller/category.controller.js";
import { addRole, deleteRole, getRoleById, getRoles, updateRole } from "../controller/role.controller.js";
import { addPermission, deletePermission, getAllPermissions, getPermissionById, updatePermission } from "../controller/permission.controller.js";
import { addRolToPermission, deleteRolToPermission, getRolToPermission } from "../controller/roleToPermission.js";
import { getAllUsers, getUserById } from "../controller/user.controller.js";
const routes = Router()

// auth
routes.post("/register", registerController)
routes.get("/login", loginController)

// Users
routes.get("/users", getAllUsers)
routes.get("/user/:id", getUserById)

// product
routes.post("/product", ProductUpload, addProduct)
routes.get("/products", getProducts)
routes.put("/product/:id", ProductUpload, updateProduct)
routes.route("/product/:id")
    .get(getProductById)
    .delete(deleteProduct)

// Category
routes.post("/category", CategoryUpload, addCategory)
routes.get("/categories", getCategory)
routes.put("/category/:id", CategoryUpload, updateCategory)
routes.route("/category/:id")
    .get(getCategoryById)
    .delete(deleteCategory)

// Role
routes.post("/role", addRole)
routes.get("/role/:id", getRoleById)
routes.get("/roles", getRoles)
routes.route("/role/:id")
    .put(updateRole)
    .delete(deleteRole)


// Permission
routes.get("/permissions", getAllPermissions)
routes.get("/permission/:id",getPermissionById)
routes.post("/permission", addPermission)
routes.route("/permission/:id")
    .put(updatePermission)
    .delete(deletePermission)

// role to permission
routes.route("/roleToPermission")
    .post(addRolToPermission)
    .get(getRolToPermission)
    .delete(deleteRolToPermission)

export default routes;