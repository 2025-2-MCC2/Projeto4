import jwt from "jsonwebtoken";
import "dotenv/config";
import { pool } from "../db.js";

export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(409).json({ message: "Você não tem permissão para acessar esse site"});
    }
    
    
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role === "student") {
            const [user] = await pool.query("SELECT id FROM student WHERE id = ?", [decoded.id]);
            if (user.length === 0) {
                return res.status(404).json({ message: "Usuário não encontrado"});
            }

            req.user = decoded;
            next();
        }

        if (decoded.role === "mentor") {
            const [user] = await pool.query("SELECT id FROM mentor WHERE id = ?", [decoded.idMentor]);
            if (user.length === 0) {
                return res.status(404).json({ message: "Usuário não encontrado"});
            }

            req.user = decoded;
            next();
        }

        if (decoded.role === "adm") {
            const [user] = await pool.query("SELECT id FROM adm WHERE id = ?", [decoded.idAdm]);
            if (user.length === 0) {
                return res.status(404).json({ message: "Usuário não encontrado"});
            }

            req.user = decoded;
            next();
        }
    } catch(err) {
        return res.status(401).json({ message: 'Invalid token!' })
    }
}
