import express from "express";
import Product from "../models/Product.js"

const productRoutes = express.Router();

// pega todos os produtos cadastrados.
productRoutes.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length <= 0) res.status(200).json({message: "Nenhum produto cadastrado."});
    else res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

// pesquisa um produto pelo nome.
productRoutes.get("/name/:name", async (req, res) => {
  try {
    const findedByName = await Product.find({name: new RegExp(req.params.name, "i")});
    if (!findedByName) res.status(404).json({message: "Nenhum produto encontrado."}); 
    else res.status(200).json(findedByName);
  } catch (error) {
    res.status(400).json({error: "Erro ao encontrar o produto", message: error.message});
  }
});

// pesquisa produtos acima com quantidade acima de 0.
productRoutes.get("/quantity", async (req, res) => {
  try {
    // $gt - greater than (maior que).
    const greaterThanZero = await Product.find({quantity: {$gt: 0}});

    if (!greaterThanZero || greaterThanZero.length === 0) {
      res.status(404).json({message: "Nenhum produto encontrado."});
    } else {
      res.status(200).json(greaterThanZero);
    } 
  } catch (error) {
    res.status(400).json({error: "Erro ao encontrar o produto", message: error.message});
  }
});

// pesquisa produtos com quantidade 0.
productRoutes.get("/quantity/0", async (req, res) => {
  try {
    // $eq - equal (igual).
    const quantityZero = await Product.find({quantity: {$eq: 0} });

    if (!quantityZero || quantityZero.length === 0) {
      res.status(404).json({message: "Nenhum produto encontrado."});
    } else {
      res.status(200).json(quantityZero);
    } 
  } catch (error) {
    res.status(400).json({error: "Erro ao encontrar o produto", message: error.message});
  }
}); 

// cadastra um produto.
productRoutes.post("/", async (req, res) => {
  try {
    const {name, quantity, price} = req.body;

    if (quantity <= 0) { 
      res.status(400).json({error: "Um produto não pode ser cadastrado com estoque igual o menor que 0"});
    } else {
      	const newProduct = new Product({name, quantity, price});
        const saveProduct = await newProduct.save();
        res.status(201).json({message: "Produto cadastrado com sucesso.", saveProduct});
    }

  } catch (error) {
    res.status(400).json({error: "Erro ao cadastrar o produto", message: error.message});
  }
});

// deleta um produto pelo nome.
productRoutes.delete("/name/:name", async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete(req.params.name);
    if (!deleted) res.status(404).json({message: "Produto não encontrado."});
    else res.status(200).json({message: "Produto removido!", deleted});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// atualiza um produto pelo nome.
productRoutes.put("/name/:name", async (req, res) => {
  try {
    const updatedProduct = req.body;
    const product = await Product.findOneAndUpdate({name: new RegExp(req.params.name, "i")}, updatedProduct);

    if (!updatedProduct) res.status(404).json({message: "Produto não encontrado."});
    else res.status(200).json({message: "Produto atualizado!", product, updatedProduct});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default productRoutes;