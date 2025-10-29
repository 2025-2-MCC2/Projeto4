import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const usersController = {
    // GET para buscar todos os usuários registrados;
     allUsers: async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT RA, full_name, course, password FROM student');
            res.status(200).json({ rows });
        } catch (err) {
            res.status(500).json({ message: "Fail database"});
        }
    },
    // GET para buscar determinado usuário pelo seu ID
    userByID: async (req, res) => {
        const { id } = req.params;

        try {
            const [user] = await pool.query('SELECT RA, course, full_name FROM student WHERE id = ?', [id]);
            res.status(200).json({ user });
        } catch(err) {
            res.status(500).json({ message: "Fail database"});
        }
    },
    // GET para buscar determinado usuário pelo seu RA
    userByRA: async (req, res) => {
        const { RA } = req.params;

        try {
            const [user] = await pool.query("SELECT id, RA, course, full_name FROM student WHERE RA = ?", [RA]);
            res.status(200).json({ user });
        } catch(err) {
            res.status(500).json({ message: "Fail database"});
        }
    },
    // POST para criar os usuários
    createUser: async (req, res) => {
        const { RA, fullName, course, password } = req.body;

        try {
            const [user] = await pool.query("SELECT RA FROM student WHERE RA = ?", [RA]);
            if (user.length !== 0) {
                res.status(409).json({ message: "O usuário já existe"})
            }

            const hashPassword = bcrypt.hashSync(password, 10);

            await pool.query("INSERT INTO student (RA, full_name, course, password) VALUES (?, ?, ?, ?)", [RA, fullName, course, hashPassword]);

            res.status(201).json({ message: "Criado com sucesso!"})
        } catch(err) {
            res.status(500).json({ message: "Erro ao cadastrar usuário", erro: err});
        }
    },
    // POST para logar:
    login: async (req, res) => {
        const { RA, password } = req.body;

        try {
            const [user]  = await pool.query("SELECT id, RA, password FROM student WHERE RA = ?", [RA]);
            const isValidPassword = bcrypt.compareSync(password, user[0].password);
            if (user.length === 0 || !isValidPassword) {
                res.status(401).json({ message: "Credenciais erradas!"});
            }
            
            const[userGroup] = await pool.query("SELECT id_group FROM team_student WHERE id_student = ?", [user[0].id]);
            const payload = { id: user[0].id, ra: user[0].RA, idGroup: userGroup[0].id_group};
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d'});
            
            res.status(200).json({ message: "Login efetuado!"});
        } catch(err) {
            res.status(500).json({ message: "Fail database"});
        }
    },
    // PUT para atualizar um usuário
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { RA, fullName, course, password } = req.body;

        try {
            // Cria arrays dinâmicos para montar o UPDATE
            const fields = [];
            const values = [];

            if (RA != null) {
                fields.push("RA = ?");
                values.push(RA);
            }
            if (fullName != null) {
                fields.push("full_name = ?");
                values.push(fullName);
            }
            if (course != null) {
                fields.push("course = ?");
                values.push(course);
            }
            if (password != null) {
                fields.push("password = ?");
                values.push(password);
            }

            if (fields.length === 0) {
                return res.status(400).json({ message: "No fields provided to update" });
            }

            const sql = `UPDATE student SET ${fields.join(", ")} WHERE id = ?`;
            values.push(id);

            await pool.query(sql, values);

            res.status(200).json({ message: "Usuário atualizado com sucesso" });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Database error" });
        }
    },
    // DELETE para deletar um usuário
    deleteUser: async (req, res) => {
        const { id } = req.params;

        try {
            const [user] = await pool.query("SELECT RA FROM student WHERE id = ?", [id]);
            if (user.length === 0) {
                res.status(404).json({ message: "Usuário não encontrado"});
            }

            await pool.query("DELETE FROM student WHERE id = ?", [id]);

           res.status(200).json({ message: "Usuário deletado com sucesso"})
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database error" });
        }
    }
}

export default usersController;