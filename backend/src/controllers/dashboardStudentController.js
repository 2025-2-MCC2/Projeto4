import collectionController from "./collectionsController.js"
import groupsController from "./groupsController.js";
import projectsController from "./projectController.js";

export async function getDashboardData(req, res) {
    try {
        // O middleware define o usuário decodificado em `req.user`
        const groupId = req.user && req.user.idGroup;

        if (!groupId) {
            return res.status(400).json({ message: 'Grupo não encontrado no token' });
        }

        // preciso buscar as seguintes informações: informações do grupo; informações das arrecadações; informações dos projetos criados
        const informationsGroup = await groupsController.groupByID(groupId);
        const informationsCollections = await collectionController.collectionByGroup(groupId);
        const informationsProjects = await projectsController.projectByGroupID(groupId);
        res.json({
            informationsGroup,
            informationsCollections,
            informationsProjects
        })
    } catch(err) {
        console.error("Deu erro no DashboardController: ", err);
        res.status(500).json({ message: "DashboardStudent error"});
    }
}