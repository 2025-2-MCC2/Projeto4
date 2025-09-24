import express from "express";
import groupsController from "./controllers/groupsController.js";
import usersController from "./controllers/usersController.js";
import "dotenv/config";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

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