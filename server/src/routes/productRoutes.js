import express from "express";
import Product from "../models/Product.js"
import AppError from "../errors/AppError.js";

const productRoutes = express.Router();

// pega todos os produtos cadastrados.
productRoutes.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products.length <= 0) res.status(200).json({message: "Nenhum produto cadastrado."});
    else res.status(200).json(products);
  } catch (error) {
    next(error); // envia pro handler.
  }
});

// filtra os produtos e coloca em ordem de preço.
productRoutes.get("/price/:sort", async (req, res, next) => {
  try {
    let order;
    let isAscending = req.params.sort;

    if (isAscending == "ascending") order = 1;
    else if (isAscending == "descending") order = -1;

    const sortByPrice = await Product.find().sort({price: order});

    if (!sortByPrice) throw new AppError("Produto não encontrado.", 404);
    else res.status(200).json(sortByPrice);
  } catch (error) {
    next(error);
  }
});

// filtra produtos com quantidade acima de 0.
productRoutes.get("/quantity/in-stock", async (req, res, next) => {
  try {
    // $gt - greater than (maior que).
    const greaterThanZero = await Product.find({quantity: {$gt: 0}});

    if (!greaterThanZero || greaterThanZero.length === 0) {
      throw new AppError("Produto não encontrado.", 404);
    } else {
      res.status(200).json(greaterThanZero);
    } 
  } catch (error) {
    res.status(500).json({error: "Erro ao encontrar o produto", message: error.message});
  }
});

// filtra produtos com quantidade igual à 0.
productRoutes.get("/quantity/zero", async (req, res, next) => {
  try {
    // $eq - equal (igual).
    const quantityZero = await Product.find({quantity: {$eq: 0} });

    if (!quantityZero || quantityZero.length === 0) {
      throw new AppError("Produto não encontrado.", 404);
    } else {
      res.status(200).json(quantityZero);
    } 
  } catch (error) {
      next(error);
  }
});

// filtra produtos pelo nome.
productRoutes.get("/name/:name", async (req, res, next) => {
  try {
    const findedByName = await Product.find({name: new RegExp(req.params.name, "i")});
    if (!findedByName) throw new AppError("Produto não encontrado.", 404); 
    else res.status(200).json(findedByName);
  } catch (error) {
    next(error);
  }
});

// cadastra um produto.
productRoutes.post("/", async (req, res, next) => {
  try {
    const {name, quantity, price} = req.body;

    if (quantity <= 0) { 
      throw new AppError("Um produto não pode ser cadastrado com estoque menor ou igual à 0", 400);
    } else {
      	const newProduct = new Product({name, quantity, price});
        const saveProduct = await newProduct.save();
        res.status(201).json({message: "Produto cadastrado com sucesso.", saveProduct});
    }

  } catch (error) {
    next(error)
  }
});

// deleta um produto pelo nome.
productRoutes.delete("/name/:name", async (req, res, next) => {
  try {
    const deleted = await Product.findOneAndDelete(req.params.name);
    if (!deleted) throw new AppError("Produto não encontrado.", 404);
    else res.status(200).json({message: "Produto removido!", deleted});
  } catch (error) {
    next(error)
  }
});

// atualiza um produto pelo nome.
productRoutes.put("/name/:name", async (req, res, next) => {
  try {
    const updatedProduct = req.body;
    const product = await Product.findOneAndUpdate({name: new RegExp(req.params.name, "i")}, updatedProduct);

    if (!updatedProduct) throw new AppError("Produto não encontrado.", 404);
    else res.status(200).json({message: "Produto atualizado!", product, updatedProduct});
  } catch (error) {
    next(error);
  }
});

export default productRoutes;