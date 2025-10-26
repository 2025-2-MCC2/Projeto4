import express from "express";
import "dotenv/config";
import routes from "./routes.js";
import cors from "cors";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(routes);
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta http://localhost:${PORT}`));