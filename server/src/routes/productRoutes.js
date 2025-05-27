import express from "express";
import Product from "../models/Product.js"

const productRoutes = express.Router();

productRoutes.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length <= 0) res.status(200).json("Nenhum produto cadastrado.");
    else res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

productRoutes.post("/products", async (req, res) => {
  try {
    const {name, quantity, price} = req.body;

    const newProduct = new Product({name, quantity, price});
    const saveProduct = await newProduct.save();

    res.status(201).json(saveProduct);
  } catch (error) {
    res.status(400).json({error: "Erro ao cadastrar o produto", message: error.message});
  }
});

productRoutes.delete("/products/:name", async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete(req.params.name);
    if (!deleted) res.status(404).json({message: "Produto não encontrado."});
    res.status(200).json({message: "Produto removido!", deleted});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default productRoutes;