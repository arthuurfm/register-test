import index from "./src/index.js";
import {createProduct, deleteProduct, loadProducts} from "./controllers/productsControllers.js";

index();
loadProducts();
createProduct();
deleteProduct();