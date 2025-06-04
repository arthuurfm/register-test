import express from "express";
import {getAllProducts, getProductsSortedPrice, getProductsInStock, getProductsOutOfStock, getProductsByName, createProduct, deleteProductById, updateProductByName} from "../controllers/productsControllers.js";

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
productRoutes.delete("/:customId", deleteProductById);

// puts
productRoutes.put("/name/:name", updateProductByName);

export default productRoutes;