const uuid = require("uuid");
const admins = require("../models/admModel");

const adminController = {
    // POST para criar um admin
    createAdmin: (req, res) => {
        const { name, email, password } = req.body;

        const admin = {
            id: uuid.v4(),
            name: name,
            email: email,
            password: password
        }

        admins.push(admin);

        return res.status(201).json(admin);
    }
}