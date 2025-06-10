import index from "./src/index.js";
import {changeProduct, createProduct, deleteProduct, filterListeners, loadProducts} from "./src/controllers/productsControllers.js";

index();
loadProducts();
filterListeners();
createProduct();
deleteProduct();
changeProduct();