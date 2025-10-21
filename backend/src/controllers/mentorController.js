import { pool } from "../db.js";

const mentorController = {
    // POST para criar um mentor
    createMentor: async (req, res) => {
        const { name, email, password } = req.body;

        try {
            const [ins] = await pool.query("INSERT INTO mentor(name_mentor, email, password) VALUES (?, ?, ?)", [name, email, password]);

            console.log(ins);
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    }
}

export default mentorController;