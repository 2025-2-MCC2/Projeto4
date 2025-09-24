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
            res.status(500).json({ message: "Alguma coisa aconteceu"});
        }
    },
    // GET para buscar determinado usuário pelo seu ID
    userByID: (req, res) => {
        const { id } = req.params;

        const indexUser = users.findIndex(user => user.id === id);
        if (indexUser === -1) return res.status(404).json({ message: "User not found"});

        return res.status(200).json(users[indexUser]);
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
    updateUser: (req, res) => {
        const { id } = req.params;
        const { RA, name, email, password, idGroup } = req.body;

        const indexUser = users.findIndex(user => user.id === id);
        if (indexUser === -1) return res.status(404).json({ message: "User not found"});
        if (RA !== null) users[indexUser].RA = RA;
        if (name !== null) users[indexUser].name = name;
        if (email !== null) users[indexUser].email = email;
        if (password !== null) users[indexUser].password = password;
        if (idGroup !== null) users[indexUser].idGroup = idGroup;

        return res.status(201).json(users[indexUser]);
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