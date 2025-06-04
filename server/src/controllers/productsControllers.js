import AppError from "../errors/AppError.js";;
import Product from "../models/Product.js";

// pega todos os produtos cadastrados.
export async function getAllProducts(_req, res, next) {
  try {
    const products = await Product.find();
    if (products.length <= 0) res.status(200).json({message: "Nenhum produto cadastrado."});
    else res.status(200).json(products);
  } catch (error) {
    next(error); // envia pro handler.
  }
}

// filtra os produtos e coloca em ordem de preço.
export async function getProductsSortedPrice(req, res, next) {
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
}

// filtra produtos com quantidade acima de 0.
export async function getProductsInStock(_req, res, next) {
  try {
    // $gt - greater than (maior que).
    const inStock = await Product.find({quantity: {$gt: 0}});

    if (!inStock || inStock.length === 0) {
      throw new AppError("Produto não encontrado.", 404);
    } else {
      res.status(200).json(inStock);
    } 
  } catch (error) {
    next(error);
  }
}

// filtra produtos com quantidade igual à 0.
export async function getProductsOutOfStock(_req, res, next) {
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
}

// pega todas as ocasiões do nome do produto pesquisado.
export async function getProductsByName(req, res, next) {
  try {
    const findedByName = await Product.find({name: new RegExp(req.params.name, "i")});

    if (!findedByName) throw new AppError("Produto não encontrado.", 404); 
    else res.status(200).json(findedByName);

  } catch (error) {
    next(error);
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
    console.error(error.message);
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
    console.error(error.message);
    next(error);
  }
}

// atualiza um produto filtrado pelo nome.
export async function updateProductByName(req, res, next) {
  try {
    const updatedProduct = req.body;
    const product = await Product.findOneAndUpdate({name: new RegExp(req.params.name, "i")}, updatedProduct);

    if (!updatedProduct) throw new AppError("Produto não encontrado.", 404);
    else res.status(200).json({message: "Produto atualizado!", product, updatedProduct});

  } catch (error) {
    next(error);
  }
}