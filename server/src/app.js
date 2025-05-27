import express from "express";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";
import errorHandler from "./errors/errorHandler.js";

const app = express();

connectDB();
app.use(express.json());
app.use("/products", productRoutes);
app.use(errorHandler);

export default app;