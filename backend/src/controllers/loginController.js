import users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const loginController = {
    // POST para logar
    login: (req, res) => {
        const { RA, password } = req.body;

        const student = users.find(user => user.RA === parseInt(RA));
        if (!student || student.password !== password) return res.status(401).json({ message: "Credentials invalid"});

        const payload = { RA };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h"})

        res.json(token);
    }
}