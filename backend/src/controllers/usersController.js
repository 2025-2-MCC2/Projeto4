import { v4 as uuidv4} from "uuid";
import users from "../models/userModel.js"
import { pool } from "../db.js";
const usersController = {
    // GET para buscar todos os usuários registrados;
     allUsers: async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM Alunos');
            res.status(200).json({ rows });
        } catch (err) {
            res.status(500).json({ message: "Fail database"});
        }
    },
    // GET para buscar determinado usuário pelo seu ID
    userByID: async (req, res) => {
        const { id } = req.params;

        try {
            const [rows] = await pool.query('SELECT Curso, nome, id_grupo, id_mentores FROM Alunos WHERE id_alunos = ?', [id]);
            res.status(200).json({ rows });
        } catch(err) {
            res.status(500).json({ message: "Fail"});
        }
    },
    // GET para buscar determinado usuário pelo seu RA
    userByRA: (req, res) => {
        const { RA } = req.params;

        const indexUser = users.findIndex(user => user.RA === RA);
        if (indexUser === -1) return res.status(404).json({ message: "User not found"});

        return res.status(200).json(users[indexUser]);
    },
    // POST para criar os usuários
    createUser: async (req, res) => {
        const { course, name, idGroup, idMentor } = req.body;

        try {
            const [ins] = await pool.query("INSERT INTO Alunos (Curso, nome, id_grupo, id_mentores) VALUES (?, ?, ?, ?)", [course, name, idGroup, idMentor]);

            const [rows] = await pool.query('SELECT * FROM Alunos WHERE id_alunos = ?', [ins.insertId]);
            res.status(201).json(rows[0]);
        } catch (err) {
            res.status(500).json({ message: "Erro ao cadastrar usuário"});
        }
    },
    // PUT para atualizar um usuário
    updateUser: async (req, res) => {
        const { id, name, idGroup, idMentor } = req.body;

        try {
            const [rows] = pool.query('UPDATE Alunos SET nome, id_grupo, id_mentores = ?, ?, ? WHERE id = ?', [name, idGroup, idMentor, id]);
            res.status(201).json({ rows });
        } catch(err) {
            res.status(500).json({ message: "Fail database"});
        }
    },
    // DELETE para deletar um usuário
    deleteUser: (req, res) => {
        const { id } = req.params;

        const indexUser = users.findIndex(user => user.id === id);
        if (indexUser === -1) return res.status(404).json({ message: "User not found"});

        const result = users.splice(indexUser, 1);
        return res.status(201).json(result);
    }
}

export default usersController;