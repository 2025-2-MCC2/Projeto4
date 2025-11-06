import mentorController from "./mentorController.js";
import groupsController from "./groupsController.js";
import collectionController from "./collectionsController.js";
import projectsController from "./projectController.js";

export async function getDashboardMentorData(req, res) {
    try {
        // O middleware define o usuário decodificado em `req.user`
        const groupId = req.user && req.user.idGroup;
        const idMentor = req.user && req.user.idMentor;

        if (!groupId) {
            return res.status(400).json({ message: 'Grupo não encontrado no token' });
        }

        // preciso buscar as seguintes informações: informações do grupo; informações das arrecadações; informações dos projetos criados
        const informationsGroup = await groupsController.groupByID(groupId);
        const informationsCollections = await collectionController.collectionByGroup(groupId);
        const informationsProjects = await projectsController.projectByGroupID(groupId);
        const informationsMentor = await mentorController.mentorByID(idMentor);
        res.json({
            informationsGroup,
            informationsCollections,
            informationsProjects,
            informationsMentor
        })
    } catch(err) {
        res.status(500).json({ message: "DashboardMentor error"});
    }
}