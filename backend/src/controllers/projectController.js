import { pool } from "../db.js";

const projectsController = {
    // POST para criar um projeto
    createProject: async (req, res) => {
        const { name, description, idGroup } = req.body;

        try {
            const [group] = await pool.query("SELECT id FROM team WHERE id = ?", [idGroup]);

            if (group.length === 0) {
                res.status(404).json({ message: "Grupo não encontrado"});
            }

            await pool.query("INSERT INTO project(name_project, description_project, id_group) VALUES(?, ?, ?)", [name, description, idGroup]);

            res.status(201).json({ message: "Projeto criado com sucesso!"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // GET para buscar todos os projetos criados
    allProjects: async (req, res) => {
        try {
            const [projects] = await pool.query("SELECT * FROM project");

            res.status(200).json({ projects });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // GET para buscar um projeto pelo grupo
    projectByGroupID: async (groupId) => {

        try {

            const [project] = await pool.query("SELECT * FROM project WHERE id_group = ?", [groupId]);

            return project;
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // PUT para atulizar o projeto
    updateProject: async (req, res) => {
        const { id } = req.params;
        const { name, description, idGroup } = req.body;

        try {
            const [group] = await pool.query("SELECT * FROM team WHERE id = ?", [id]);

            if (group.length === 0) {
                res.status(404).json({ message: "Grupo não encontrado"});
            }

            const fields = [];
            const values = [];

            if (name !== undefined) {
                fields.push("name_project = ?");
                values.push(name);
            }
            if (description !== undefined) {
                fields.push("description_project = ?");
                values.push(description);
            }
            if (idGroup !== undefined) {
                fields.push("id_group = ?");
                values.push(idGroup);
            }

            const sql = `UPDATE project SET ${fields.join(", ")} WHERE id_group = ?`;
            values.push(id);

            await pool.query(sql, values);

            res.status(200).json({ message: "Atualizado com sucesso!"});
        } catch(err) {
            
        }
    },
    // DELETE para deletar um projeto
    deleteProject: async (req, res) => {
        const { id } = req.params;

        try {
            await pool.query("DELETE FROM project WHERE id = ?", [id]);

            res.status(200).json({ message: "Projeto deletado!"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    }
}

export default projectsController;