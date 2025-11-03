import { pool } from "../db.js";

const groupsController = {
    // POST para criar um grupo
    createGroup: async (req, res) => {
        const { groupName, idMentor, idStudent, idEdition} = req.body;

        try {
            await pool.query("INSERT INTO team(group_name, id_mentor) VALUES(?, ?)", [groupName, idMentor]);
            // buscar o id do grupo criado
            const [group] = await pool.query("SELECT id FROM team WHERE group_name = ?", [groupName]);
            for (let i = 0; i < idStudent.length; i++) {
                await pool.query("INSERT INTO team_student(id_student, id_edition, id_group) VALUES(?, ?, ?)", [idStudent[i], idEdition, group[0].id]);
            }

            res.status(201).json({ message: "Grupo criado com sucesso!"})
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // POST para adicionar pontuação ao grupo
    addPontuation: async (req, res) => {
        const { groupName, pontuation } = req.body;

        try {
            const [group] = await pool.query("SELECT group_name FROM team WHERE group_name = ?", [groupName]);

            if (group.length === 0) {
                res.status(404).json({ message: "Grupo não encontrado"});
            }

            await pool.query("UPDATE team SET pontuation = pontuation + ? WHERE group_name = ?", [pontuation, groupName]);

            res.status(201).json({ message: "Pontuação adicionada com sucesso!"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // GET para buscar um grupo por id
    groupByID: async (groupId) => {

        try {
            const [group] = await pool.query("SELECT ts.id_student, t.pontuation, s.full_name, m.name_mentor, t.group_name FROM team_student ts JOIN student s ON ts.id_student = s.id JOIN team t ON ts.id_group = t.id JOIN mentor m ON m.id = t.id_mentor WHERE t.id = ?", [groupId]);

            if (group.length === 0) {
                res.status(404).json({ message: "Grupo não encontrado"});
            }

            const students = [];
            for (let i = 0; i < group.length; i++) {
                students.push(group[i].full_name);
            }

            const formatGroup = {
                "groupName": group[0].group_name,
                "students": students,
                "mentor": group[0].name_mentor,
                "groupId": groupId,
                "pontuation": group[0].pontuation
            }

            return formatGroup;
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    groupByName: async (req, res) => {
        const { name } = req.body;

        try {
            const [group] = await pool.query("SELECT ts.id_student, s.full_name, m.name_mentor, t.group_name, t.pontuation FROM team_student ts JOIN student s ON ts.id_student = s.id JOIN team t ON ts.id_group = t.id JOIN mentor m ON m.id = t.id_mentor WHERE t.group_name = ?", [name]);

            if (group.length === 0) {
                res.status(404).json({ message: "Grupo não encontrado"});
            }

            const students = [];
            for (let i = 0; i < group.length; i++) {
                students.push(group[i].full_name);
            }

            const formatGroup = {
                "groupName": group[0].group_name,
                "students": students,
                "mentor": group[0].name_mentor,
                "pontuation": group[0].pontuation
            }

            res.status(200).json(formatGroup);
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    allGroups: async (req, res) => {
        try {
            const [groups] = await pool.query("SELECT ts.id_student, s.full_name, m.name_mentor, t.group_name, t.pontuation FROM team_student ts JOIN student s ON ts.id_student = s.id JOIN team t ON ts.id_group = t.id JOIN mentor m ON m.id = t.id_mentor");

            res.status(200).json({ groups })
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    updateGroup: async (req, res) => {
        const { id } = req.params;
        const { groupName, idMentor, pontuation } = req.body;

        try {
            const fields = [];
            const values = [];

            const [group] = await pool.query("SELECT group_name FROM team WHERE id = ?", [id]);

            if (group.length === 0) {
                res.status(404).json({ message: "Grupo não encontrado"});
            }

            if (groupName !== undefined) {
                fields.push("group_name = ?");
                values.push(groupName);
            }
            if (idMentor !== undefined) {
                fields.push("id_mentor = ?");
                values.push(idMentor);
            }
            if (pontuation !== undefined) {
                fields.push("pontuation = ?");
                values.push(pontuation)
            }

            const sql = `UPDATE team SET ${fields.join(", ")} WHERE id = ?`;
            values.push(id);

            await pool.query(sql, values);
            
            res.status(200).json({ message: "Atualizado com sucesso!"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    deleteGroup: async (req, res) => {
        const { id } = req.params;

        try {
            const [group] = await pool.query("SELECT group_name FROM team WHERE id = ?", [id]);

            if (group.length === 0) {
                res.status(404).json({ message: "Grupo não encontrado"});
            }

            await pool.query("DELETE FROM team WHERE id = ?", [id]);

            res.status(200).json({ message: "Deletado com sucesso!"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    }
}

export default groupsController;