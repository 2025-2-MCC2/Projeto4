import { pool } from "./db.js";

export async function validateToken(req, res) {
    const token = req.user;

    if (token.role === "student") {
        try {
            const [userStudent] = await pool.query("SELECT id FROM student WHERE id = ?", [token.id]);

            if (userStudent.length === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.json({
                valid: true,
                role: "student"
            })
        } catch(err) {
            console.error("O erro: ", err);
            res.status(500).json({ message: "Fail database"});
        }
    }

    if (token.role === "mentor") {
        try {
            const [mentor] = await pool.query("SELECT id FROM mentor WHERE id = ?", [token.idMentor]);

            if (mentor.length === 0) return res.status(404).json({ message: "Mentor não encontrado"});

            res.json({ valid: true, role: "mentor" });
        } catch(err) {
            console.error("O erro: ", err);
            res.status(500).json({ message: "Fail database"});
        }
    }

    if (token.role === "adm") {
        try {
            const [adm] = await pool.query("SELECT id FROM adm WHERE id = ?", [token.idAdm]);

            if (adm.length === 0) return res.status(404).json({ message: "Admin não encontrado"});

            res.json({ valid: true, role: "adm" });
        } catch(err) {
            console.error("O erro: ", err);
            res.status(500).json({ message: "Fail database"});
        }
    }
}