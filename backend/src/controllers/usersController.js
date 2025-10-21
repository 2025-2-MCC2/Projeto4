import users from "../models/userModel.js"
import { pool } from "../db.js";

const usersController = {
    // GET para buscar todos os usuários registrados;
     allUsers: async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT RA, full_name, course FROM student');
            res.status(200).json({ rows });
        } catch (err) {
            res.status(500).json({ message: "Fail database"});
        }
    },
    // GET para buscar determinado usuário pelo seu ID
    userByID: async (req, res) => {
        const { id } = req.params;

        try {
            const [rows] = await pool.query('SELECT RA, course, full_name FROM student WHERE id = ?', [id]);
            res.status(200).json({ rows });
        } catch(err) {
            res.status(500).json({ message: "Fail database"});
        }
    },
    // GET para buscar determinado usuário pelo seu RA
    userByRA: async (req, res) => {
        const { RA } = req.params;

        try {
            const [rows] = await pool.query("SELECT id, RA, course, full_name FROM student WHERE RA = ?", [RA]);
            res.status(200).json({ rows });
        } catch(err) {
            res.status(500).json({ message: "Fail database"});
        }
    },
    // POST para criar os usuários
    createUser: async (req, res) => {
        const { RA, fullName, course, password } = req.body;

        try {
            await pool.query("INSERT INTO student (RA, full_name, course, password) VALUES (?, ?, ?, ?)", [RA, fullName, course, password]);

            res.status(201).json({ message: "Criado com sucesso!"})
        } catch(err) {
            res.status(500).json({ message: "Erro ao cadastrar usuário"});
        }
    },
    // POST para logar:
    login: async (req, res) => {
        const { RA, password } = req.body;

        try {
            const [rows]  = await pool.query("SELECT RA, password FROM student WHERE RA = ?", [RA]);

            if (password !== rows[0].password) {
                res.json({ message: "Credentials Error"});
            }
            
            res.status(201).json({ message: "Login efetuado!"});
        } catch(err) {
            res.status(500).json({ message: "Fail database"});
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