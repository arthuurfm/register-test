import express from "express";
import {getAllProducts, getProductsSortedPrice, getProductsInStock, getProductsOutOfStock, getProductsByName, createProduct, deleteProductById, updateProductById} from "../controllers/productsControllers.js";

const productRoutes = express.Router();

// gets
productRoutes.get("/", getAllProducts);
productRoutes.get("/price/:sort", getProductsSortedPrice);
productRoutes.get("/quantity/in-stock", getProductsInStock);
productRoutes.get("/quantity/zero", getProductsOutOfStock);
productRoutes.get("/name/:name", getProductsByName);

// posts
productRoutes.post("/", createProduct);

// deletes
productRoutes.delete("/:id", deleteProductById);

// puts
productRoutes.put("/:id", updateProductById);

export default productRoutes;