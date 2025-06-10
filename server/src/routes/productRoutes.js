import express from "express";
import {getAllProducts, createProduct, deleteProductById, updateProductById} from "../controllers/productsControllers.js";

const productRoutes = express.Router();

// gets
productRoutes.get("/", getAllProducts);

// posts
productRoutes.post("/", createProduct);

// deletes
productRoutes.delete("/:id", deleteProductById);

// puts
productRoutes.put("/:id", updateProductById);

export default productRoutes;