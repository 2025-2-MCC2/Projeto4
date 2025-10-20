import express from "express";
import usersController from "./controllers/usersController.js";
import groupsController from "./controllers/groupsController.js";

const router = express.Router();

// Rotas GET
router.get("/allUsers", usersController.allUsers);
router.get("/user/:id", usersController.userByID);
router.get("/allGroups", groupsController.allGroups);
router.get("/group/:id", groupsController.groupByID);

// Rotas POST
router.post("/createUser", usersController.createUser);
router.post("/signin", usersController.login);
router.post("/createGroup", groupsController.createGroup);

// Rotas PUT
router.put("/updateUser", usersController.updateUser);
router.put("/updateGroup/:idGroup", groupsController.updateGroup);

// Rotas DELETE
router.delete("/deleteUser/:id", usersController.deleteUser);
router.delete("/deleteGroup/:id", groupsController.deleteGroup);

export default router;