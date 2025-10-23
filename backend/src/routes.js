import express from "express";
import usersController from "./controllers/usersController.js";
import groupsController from "./controllers/groupsController.js";
import mentorController from "./controllers/mentorController.js";
import { editionsController } from "./controllers/editionsController.js";
import { adminController } from "./controllers/adminController.js";
import { collectionController } from "./controllers/collectionsController.js";

const router = express.Router();

// Rotas GET
router.get("/allUsers", usersController.allUsers);
router.get("/user/:id", usersController.userByID);
router.get("/userRA/:RA", usersController.userByRA);

router.get("/allMentors", mentorController.allMentors);
router.get("/mentorByID/:id", mentorController.mentorByID);

router.get("/allEditions", editionsController.allEditions);
router.get("/editionByID/:id", editionsController.editionByID);

router.get("/allAdmins", adminController.allAdmins);
router.get("/adminByID/:id", adminController.adminByID);

router.get("/group/:id", groupsController.groupByID);
router.get("/groupName", groupsController.groupByName);

router.get("/allCollections", collectionController.allCollections);
router.get("/collectionByGroup", collectionController.collectionByGroup);

// Rotas POST
router.post("/createUser", usersController.createUser);
router.post("/signin", usersController.login);

router.post("/createGroup", groupsController.createGroup);
router.post("/addPontuation", groupsController.addPontuation);

router.post("/createAdmin", adminController.createAdmin);
router.post("/signin/admin", adminController.loginAdmin);

router.post("/createMentor", mentorController.createMentor);
router.post("/loginMentor", mentorController.loginMentor);

router.post("/createEdition", editionsController.createEdition);

router.post("/createCollection", collectionController.createCollection);
router.post("/evaluateCollection", collectionController.evaluateCollection);

// Rotas PUT
router.put("/updateUser/:id", usersController.updateUser);

router.put("updateMentor/:id", mentorController.updateMentor);

router.put("/updateAdmin/:id", adminController.updateAdmin);

router.put("/updateEdition/:id", editionsController.editionByID);

router.put("/updateGroup/:id", groupsController.updateGroup);

// Rotas DELETE
router.delete("/deleteUser/:id", usersController.deleteUser);

router.delete("/deleteMentor/:id", mentorController.deleteMentor);

router.delete("/deleteAdmin/:id", adminController.deleteAdmin);

router.delete("/deleteEdition/:id", editionsController.deleteEdition);

router.delete("/deleteGroup/:id", groupsController.deleteGroup);

router.delete("/deleteCollection/:id", collectionController.deleteCollection);

export default router;