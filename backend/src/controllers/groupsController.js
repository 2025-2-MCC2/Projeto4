import { v4 as uuidv4} from "uuid";
import groups from "../models/groupsModel.js";

const groupsController = {
    // GET para buscar todos os grupos
    allGroups: (req, res) => {
        return res.status(200).json(groups);
    },
    // GET para buscar um grupo por id
    groupByID: (req, res) => {
        const { id } = req.params;

        const indexGroup = groups.findIndex(group => group.id === id);
        if (indexGroup === -1) return res.status(404).json({ message: "Group not found"});

        return res.status(200).json(groups[indexGroup]);
    },
    // POST para criar um grupo
    createGroup: (req, res) => {
        const { idMentor, edition, pontuation, nameGroup } = req.body;

        const group = {
            id: uuidv4(),
            idMentor: idMentor,
            edition: edition,
            pontuation: pontuation,
            nameGroup: nameGroup
        }

        groups.push(group);

        return res.status(201).json(group);
    },
    // PUT para atualizar um grupo
    updateGroup: (req, res) => {
        const { idGroup } = req.params;
        const { idMentor, edition, pontuation, groupName } = req.body;

        const indexGroup = groups.findIndex(group => group.id === idGroup);
        if (indexGroup === -1) return res.status(404).json({ message: "Group not found"});

        if (idMentor !== null) groups[indexGroup].idMentor = idMentor;
        if (edition !== null) groups[indexGroup].edition = edition;
        if (pontuation !== null) groups[indexGroup].pontuation = pontuation;
        if (groupName !== null) groups[indexGroup].groupName = groupName;
    },
    // DELETE para deletar um grupo
    deleteGroup: (req, res) => {
        const { id } = req.params;

        const indexGroup = groups.findIndex(group => group.id === id);
        if (indexGroup === -1) return res.status(404).json({ message: "Group not found"});

        const deleted = groups.splice(indexGroup, 1);
        return res.status(201).json(deleted);
    }
}

export default groupsController;