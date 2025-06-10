import AppError from "../errors/AppError.js";;
import Product from "../models/Product.js";

// pega todos os produtos cadastrados.
export async function getAllProducts(_req, res, next) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error); // envia pro handler.
  }
}

// cadastra um novo produto.
export async function createProduct(req, res, next) {
  try {
    const {name, quantity, price} = req.body;
    console.log(req.body);

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
}

// deleta um produto filtrado pelo id.
export async function deleteProductById(req, res, next) {
  try {
    const deleted = await Product.findByIdAndDelete({_id: req.params.id});
    console.log(deleted);

    if (!deleted) throw new AppError("Produto não encontrado.", 404);
    else res.status(200).json({message: "Produto removido!", deleted});

  } catch (error) {
    next(error);
  }
}

// atualiza um produto filtrado pelo id.
export async function updateProductById(req, res, next) {
  try {
    const updatedProduct = req.body;
    const product = await Product.findOneAndUpdate({_id: req.params.id}, updatedProduct);

    if (!updatedProduct) throw new AppError("Produto não encontrado.", 404);
    else res.status(200).json({message: "Produto atualizado!", product, updatedProduct});

  } catch (error) {
    next(error);
  }
}