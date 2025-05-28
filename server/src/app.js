import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";
import errorHandler from "./errors/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../client/public")));
app.use("/products", productRoutes);
app.use(errorHandler);

export default app;