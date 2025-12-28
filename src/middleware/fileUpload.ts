import multer from "multer"
import path from "path"
import fs from "fs"
import { v4 as uuidV4 } from "uuid"


const createDynamicStorage = (folderName: string) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            const dynamicFolder = req.body.name || folderName
            const uploadPath = path.join(process.cwd(), "public", dynamicFolder)
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true })
            }
            cb(null, uploadPath)
        },
        filename: (req, file, cb) => {
            let uuid = uuidV4()
            let filname = file.originalname.split(".").pop()
            cb(null, uuid + "." + filname)
        }
    })
}

const ProductUpload = multer({
    storage: createDynamicStorage("products")
}).array("productImage", 7)

const CategoryUpload = multer({
    storage: createDynamicStorage("categories")
    // storage : multer.memoryStorage(),
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype.startsWith("image/")) {
    //         cb(null, true)
    //     } else {
    //         cb(new Error("Only images are allowed"))
    //     }
    // }
}).single("categoryImage")

export { ProductUpload, CategoryUpload } 
