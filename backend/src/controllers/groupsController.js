import { v4 as uuidv4} from "uuid";
import groups from "../models/groupsModel.js";
import { pool } from "../db.js";

const groupsController = {
    // GET para buscar todos os grupos
    allGroups: async (req, res) => {
        try {
            const [rows] = await pool.query("SELECT * FROM Grupo");
            return res.status(200).json({ rows });
        } catch(err) {
            return res.status(500).json({ message: "Fail database"});
        }
    },
    // GET para buscar um grupo por id
    groupByID: (req, res) => {
        const { id } = req.params;

        const indexGroup = groups.findIndex(group => group.id === id);
        if (indexGroup === -1) return res.status(404).json({ message: "Group not found"});

        return res.status(200).json(groups[indexGroup]);
    },
    // POST para criar um grupo
    createGroup: async (req, res) => {
        const { password, edition, pontuation, nameGroup } = req.body;

        try {
            await pool.query("INSERT INTO Grupo (Pontuacao, Nome_grupo, Senha_grupo, id_edicoes) VALUES(?, ?, ?, ?)", [pontuation, nameGroup, password, edition]);

            const [rows] = await pool.query("SELECT * FROM Grupo WHERE Nome_grupo = ?", [nameGroup]);
            return res.status(201).json(rows[0]);
        } catch(err) {
            return res.status(500).json({ message: "Fail database"});
        }
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