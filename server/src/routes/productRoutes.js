import express from "express";
import Product from "../models/Product.js"

const productRoutes = express.Router();

productRoutes.route("/product")
  .get(async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    try {
      const {name, quantity, price} = req.body;

      const newProduct = new Product({name, quantity, price});
      const saveProduct = await newProduct.save();

      res.status(201).json(saveProduct);
    } catch (error) {
      res.status(400).json({error: "Erro ao cadastrar o produto", message: error.message});
    }
  });

export default productRoutes;