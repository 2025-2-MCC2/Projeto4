import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "mysql2/promise";

const mentorController = {
    // POST para criar um mentor
    createMentor: async (req, res) => {
        const { name, email, password } = req.body;

        try {
            const [mentor] = await pool.query("SELECT email FROM mentor WHERE email = ?", [email]);
            if (mentor.length !== 0) {
                res.status(409).json({ message: "O mentor já existe"});
            }

            const hashPassword = bcrypt.hashSync(password, 10);

            await pool.query("INSERT INTO mentor(name_mentor, email, password) VALUES (?, ?, ?)", [name, email, hashPassword]);

            res.status(201).json({ message: "Mentor criado com sucesso!"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    loginMentor: async (req, res) => {
        const { email, password } = req.body;

        try {
            const [mentor] = await pool.query("SELECT id, email, password FROM mentor WHERE email = ?", [email]);
            const isValidPassword = bcrypt.compareSync(password, mentor[0].password);
            if (mentor.length === 0 || !isValidPassword) {
                res.status(401).json({ message: "Credenciais erradas!"});
            }

            const [team] = await pool.query("SELECT id, id_mentor FROM team WHERE id_mentor = ?", [mentor[0].id]);
            const payload = {idMentor: mentor[0].id, idGroup: team[0].id, role: "mentor"};

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d"});
            res.status(201).json({ token });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // GET para buscar todos os mentores
    allMentors: async (req, res) => {
        try {
            const [mentors] = await pool.query("SELECT id, name_mentor, email FROM mentor");

            res.status(200).json({ mentors });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // GET para buscar mentor por id
    mentorByID: async (idMentor) => {
        try {
            const [mentor] = await pool.query("SELECT id, name_mentor FROM mentor WHERE id = ?", [idMentor]);

            res.status(200).json({mentor});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // UPDATE para atualizar um mentor
    updateMentor: async (req, res) => {
        const { id } = req.params;
        const { nameMentor, email, password } = req.body;

        try {
            const fields = [];
            const values = [];

            const [mentor] = pool.query("SELECT id FROM mentor WHERE id = ?", [id]);

            if (mentor.length === 0) {
                res.status(404).json({ message: "Mentor não encontrado"});
            }

            if (nameMentor !== undefined) {
                fields.push("name_mentor = ?");
                values.push(nameMentor);
            }
            if (email !== undefined) {
                fields.push("email = ?");
                values.push(email);
            }
            if (password !== undefined) {
                fields.push("password = ?");
                values.push(password);
            }

            const sql = `UPDATE mentor SET ${fields.join(", ")} WHERE id = ?`;
            values.push(id);

            await pool.query(sql, values);

            res.status(200).json({ message: "Mentor atualizado com sucesso"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // DELETE para deletar um mentor
    deleteMentor: async (req, res) => {
        const { id } = req.params;
        
        try {
            const [mentor] = pool.query("SELECT id FROM mentor WHERE id = ?", [id]);

            if (mentor.length === 0) {
                res.status(404).json({ message: "Mentor não encontrado"});
            }

            await pool.query("DELETE FROM mentor WHERE id = ?", [id]);

            res.status(200).json({ message: "Mentor deletado com sucesso!"})
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    }
}

export default mentorController;