const express = require("expressjs");
const groupsController = require("./controllers/groupsController");
const usersController = require("./controllers/usersController");
require("dotenv").config();

const app = express();

// Rotas GET
app.get("/allUsers", usersController.allUsers);
app.get("/user/:id", usersController.userByID);
app.get("/allGroups", groupsController.allGroups);
app.get("/group/:id", groupsController.groupByID);

// Rotas POST
app.post("/createUser", usersController.createUser);
app.post("/createGroup", groupsController.createGroup);

// Rotas PUT
app.put("/updateUser/:id", usersController.updateUser);
app.put("/updateGroup/:idGroup", groupsController.updateGroup);

// Rotas DELETE
app.delete("/deleteUser/:id", usersController.deleteUser);
app.delete("/deleteGroup/:id", groupsController.deleteGroup);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta http://localhost:${PORT}`));