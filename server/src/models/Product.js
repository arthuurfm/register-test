import mongoose from "mongoose";
import ProductSchema from "./ProductSchema.js";

const Product = mongoose.model("Product", ProductSchema);

export default Product;