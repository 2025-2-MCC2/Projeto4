import bcrypt from "bcrypt";
import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const adminController = {
    // POST para criar um admin
    createAdmin: async (req, res) => {
        const { nameAdm, email, password } = req.body;

        try {
            const [adm] = await pool.query("SELECT email FROM adm WHERE email = ?", [email]);

            if (adm.length !== 0) {
                res.status(409).json({ message: "Email já cadastrado!"});
            }

            const hashPassword = bcrypt.hashSync(password, 10);

            await pool.query("INSERT INTO adm(name_adm, email, password) VALUES(?, ?, ?)", [nameAdm, email, hashPassword]);

            res.status(201).json({ message: "Admin criado com sucesso!"});
        } catch(err) {
             console.error(err);
            res.status(500).json({ message: "Database error" });
        }
    },
    // POST para logar um admin
    loginAdmin: async (req, res) => {
        const { email, password } = req.body;

        try {
            const [adm] = await pool.query("SELECT id, name_adm, email, password FROM adm WHERE email = ?", [email]);

            const isValidPassword = bcrypt.compareSync(password, adm[0].password);
            if (adm.length === 0 || !isValidPassword) {
                res.status(401).json({ message: "Credenciais inválidas!"});
            }

            const payload = {idAdm: adm[0].id, nameAdm: adm[0].name_adm, role: "adm"};

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d"})
            res.status(201).json({ token });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // GET para buscar todos os admins
    allAdmins: async (req, res) => {
        try {
            const [admins] = await pool.query("SELECT name_adm FROM adm");

            res.status(200).json({ admins });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // GET para buscar um admin pelo id
    adminByID: async (req, res) => {
        const id = req.user && req.user.idAdm;

        try {
            const [admin] = await pool.query("SELECT id, name_adm FROM adm WHERE id = ?", [id]);

            if (admin.length === 0) {
                res.status(404).json({ message: "Admin não encontrado!"});
            }

            res.status(200).json({ admin });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // PUT para atualizar um admin
    updateAdmin: async (req, res) => {
        const { id } = req.params;
        const { name, email, password } = req.body;

        try {
            const [adm] = await pool.query("SELECT id FROM adm WHERE id = ?", [id]);
            if (adm.length === 0) {
                res.status(404).json({ message: "Admin não encontrado"});
            }
            const fields = [];
            const values = [];

            if (name !== undefined) {
                fields.push("name_adm = ?");
                values.push(name);
            }
            if (email !== undefined) {
                fields.push("email = ?");
                values.push(email);
            }
            if (password !== undefined) {
                fields.push("password = ?");
                const newPassword = bcrypt.hashSync(password, 10);
                values.push(newPassword);
            }

            const sql = `UPDATE adm SET ${fields.join(", ")} WHERE id = ?`;
            values.push(id);

            await pool.query(sql, values);

            res.status(200).json({ message: "Admin atualizado com sucesso"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // DELETE para deletar um admin
    deleteAdmin: async (req, res) => {
        const { id } = req.params;

        try {
            const [adm] = await pool.query("SELECT id FROM adm WHERE id = ?", [id]);
            if (adm.length === 0) {
                res.status(404).json({ message: "Admin não encontrado"});
            }

            await pool.query("DELETE FROM adm WHERE id = ?", [id]);

            res.status(200).json({ message: "Admin deletado com sucesso!"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    }
}