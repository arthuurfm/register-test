import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";
import errorHandler from "./errors/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// conexão com o banco mongodb.
connectDB();

app.use(express.json());

// conectando com o front-end.
app.use(express.static(path.join(__dirname, "../../client/public")));

// páginas.
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../../client/views/index.html")));
app.get("/store", (req, res) => res.sendFile(path.join(__dirname, "../../client/views/Loja.html")));

// rota produtos.
app.use("/products", productRoutes);

// gerenciador de erros.
app.use(errorHandler);

export default app;