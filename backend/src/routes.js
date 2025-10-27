import express from "express";
import usersController from "./controllers/usersController.js";
import groupsController from "./controllers/groupsController.js";
import mentorController from "./controllers/mentorController.js";
import { editionsController } from "./controllers/editionsController.js";
import { adminController } from "./controllers/adminController.js";
import { collectionController } from "./controllers/collectionsController.js";
import projectsController from "./controllers/projectController.js";
import authMiddlare from "./middlewares/authMiddleware.js";

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

router.get("/group/:id", authMiddlare, groupsController.groupByID);
router.get("/groupName", authMiddlare, groupsController.groupByName);

router.get("/allCollections", authMiddlare, collectionController.allCollections);
router.get("/collectionByGroup", authMiddlare, collectionController.collectionByGroup);

router.get("/allProjects", projectsController.allProjects);
router.get("/projectByGroupID/:id", authMiddlare, projectsController.projectByGroupID);

// Rotas POST
router.post("/createUser", usersController.createUser);
router.post("/signin", authMiddlare ,usersController.login);

router.post("/createGroup", groupsController.createGroup);
router.post("/addPontuation", groupsController.addPontuation);

router.post("/createAdmin", adminController.createAdmin);
router.post("/signin/admin", adminController.loginAdmin);

router.post("/createMentor", mentorController.createMentor);
router.post("/loginMentor", mentorController.loginMentor);

router.post("/createEdition", editionsController.createEdition);

router.post("/createCollection", collectionController.createCollection);
router.post("/evaluateCollection", collectionController.evaluateCollection);

router.post("/createProject", projectsController.crateProject);

// Rotas PUT
router.put("/updateUser/:id", usersController.updateUser);

router.put("updateMentor/:id", mentorController.updateMentor);

router.put("/updateAdmin/:id", adminController.updateAdmin);

router.put("/updateEdition/:id", editionsController.editionByID);

router.put("/updateGroup/:id", groupsController.updateGroup);

router.put("/updateProject/:id", projectsController.updateProject);
// Rotas DELETE
router.delete("/deleteUser/:id", usersController.deleteUser);

router.delete("/deleteMentor/:id", mentorController.deleteMentor);

router.delete("/deleteAdmin/:id", adminController.deleteAdmin);

router.delete("/deleteEdition/:id", editionsController.deleteEdition);

router.delete("/deleteGroup/:id", groupsController.deleteGroup);

router.delete("/deleteCollection/:id", collectionController.deleteCollection);

router.delete("/deleteProject/:id", projectsController.deleteProject);

export default router;