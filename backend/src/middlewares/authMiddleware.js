import jwt from "jsonwebtoken";
import "dotenv/config";
import { pool } from "../db.js";

export default async function authMiddlare(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(409).json({ message: "Você não tem permissão para acessar esse site"});
    }
    
    
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const [user] = await pool.query("SELECT id FROM student WHERE id = ?", [decoded.id]);
        if (user.length === 0) {
            res.status(404).json({ message: "Usuário não encontrado"});
        }

        req.authenticatedUser = decoded;
        next();
    } catch(err) {
        return res.status(401).json({ message: 'Invalid token!' })
    }
}
