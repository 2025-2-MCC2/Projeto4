import { pool } from "./db.js";

export async function validateToken(req, res) {
    const token = req.user;

    try {
        const [userStudent] = await pool.query("SELECT id FROM student WHERE id = ?", [token.id]);

        if (userStudent.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({
            valid: true
        })
    } catch(err) {
        console.error("O erro: ", err);
        res.status(500).json({ message: "Fail database"});
    }
}