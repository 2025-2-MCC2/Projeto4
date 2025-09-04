const express = require("expressjs");
require("dotenv").config();

const app = express();

// Aqui virão rotas básicas, depois será utilizado o gerenciador de rotas do express

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta http://localhost:${PORT}`));