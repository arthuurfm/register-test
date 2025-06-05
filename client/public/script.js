import index from "./src/index.js";
import {changeProduct, createProduct, deleteProduct, loadProducts} from "./controllers/productsControllers.js";

index();
loadProducts();
createProduct();
deleteProduct();
changeProduct();