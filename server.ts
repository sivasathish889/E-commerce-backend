import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./src/routes/adminRoutes.js";
import Logger from "./src/config/logger.js";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,  

}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Logger)

// for testing api
app.get("/", (req, res) => {
  res.send("E-commerce Backend is running");
});

app.post("/api/test", (req, res) => {
  console.log(req.body,req.file);
  res.json({ message: "Data received successfully", data: req.body });
})
// routes
app.use("/api/admin",adminRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})