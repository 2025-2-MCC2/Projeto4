import express from "express";
import usersController from "./controllers/usersController.js";
import groupsController from "./controllers/groupsController.js";
import mentorController from "./controllers/mentorController.js";

const router = express.Router();

// Rotas GET
router.get("/allUsers", usersController.allUsers);
router.get("/user/:id", usersController.userByID);
router.get("/userRA/:RA", usersController.userByRA);

router.get("/allGroups", groupsController.allGroups);
router.get("/group/:id", groupsController.groupByID);

// Rotas POST
router.post("/createUser", usersController.createUser);
router.post("/signin", usersController.login);

router.post("/createGroup", groupsController.createGroup);

router.post("/createMentor", mentorController.createMentor);
router.post("/loginMentor", mentorController.loginMentor);

// Rotas PUT
router.put("/updateUser/:id", usersController.updateUser);

router.put("updateMentor/:id", mentorController.updateMentor);

router.put("/updateGroup/:idGroup", groupsController.updateGroup);

// Rotas DELETE
router.delete("/deleteUser/:id", usersController.deleteUser);

router.delete("/deleteMentor/:id", mentorController.deleteMentor);

router.delete("/deleteGroup/:id", groupsController.deleteGroup);

export default router;