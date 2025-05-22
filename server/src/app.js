import express from "express";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";

const app = express();

connectDB();
app.use(express.json());
app.use("/", productRoutes);

export default app;