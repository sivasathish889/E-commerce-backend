import multer from "multer"
import { v4 } from "uuid"


const postStorage = multer.diskStorage({
        destination : (req,file,cb)=>{
            cb(null, "./public/media/post")
        },
        filename : (req,file,cb)=>{
            let uuid  = v4()
            let filname = file.originalname.split(".").pop()
            cb(null, uuid+"."+filname)
        },
        
    })

const profileStrorage = multer.diskStorage({
        destination : (req,file,cb)=>{
            cb(null, "./public/media/profile")
        },
        filename : (req,file,cb)=>{
            let uuid  = v4()
            let filname = file.originalname.split(".").pop()
            cb(null, uuid+"."+filname)
        },
        
    })

const postFileUpload = multer({
    storage:postStorage,    
}).single("image")

const profileUpload = multer({
    storage: profileStrorage
}).single("profilePic")

module.exports = {postFileUpload, profileUpload}