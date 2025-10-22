import { pool } from "../db.js";

const mentorController = {
    // POST para criar um mentor
    createMentor: async (req, res) => {
        const { name, email, password } = req.body;

        try {
            const [mentor] = await pool.query("SELECT email FROM mentor WHERE email = ?", [email]);
            if (mentor.length !== 0) {
                res.status(409).json({ message: "O mentor já existe"});
            }

            await pool.query("INSERT INTO mentor(name_mentor, email, password) VALUES (?, ?, ?)", [name, email, password]);

            res.status(201).json({ message: "Mentor criado com sucesso!"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    loginMentor: async (req, res) => {
        const { email, password } = req.body;

        try {
            const [user] = await pool.query("SELECT email, password FROM mentor WHERE email = ?", [email]);

            if (password !== user[0].password) {
                res.json({ message: "Credentials Error"});
            }

            res.status(201).json({ message: "Login efetuado!"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // GET para buscar todos os mentores
    allMentors: async (req, res) => {
        try {
            const [mentors] = await pool.query("SELECT name_mentor, email FROM mentor");

            res.status(200).json({ mentors });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // GET para buscar mentor por id
    mentorByID: async (req, res) => {
        const { id } = req.params;

        try {
            const [mentor] = await pool.query("SELECT name_mentor, email FROM mentor WHERE id = ?", [id]);

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