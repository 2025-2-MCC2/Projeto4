import { pool } from "../db.js";

export const editionsController = {
    // POST para criar edição
    createEdition: async (req, res) => {
        const { startDate, endDate } = req.body;

        try {
            await pool.query("INSERT INTO edition(start_date, end_date) VALUES (?, ?)", [startDate, endDate]);

            res.status(201).json({ message: "Edição criada com sucesso!"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // GET para buscar todas as edições
    allEditions: async (req, res) => {
        try {
            const [editions] = await pool.query("SELECT * FROM edition");

            res.status(200).json({ editions });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // GET para buscar edição por id
    editionByID: async (req, res) => {
        const { id } = req.params;

        try {
            const [edition] = await pool.query("SELECT * FROM edition WHERE id = ?", [id]);
            if (edition.length === 0) {
                res.status(404).json({ message: "Edição não encontrada"});
            }

            res.status(200).json({ edition });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // PUT para atualizar uma edição
    updateEdition: async (req, res) => {
        const { id } = req.params;
        const { startDate, endDate } = req.body;

        try {
            const [edition] = await pool.query("SELECT * FROM edition WHERE id = ?", [id]);
            if (edition.length === 0) {
                res.status(404).json({ message: "Edição não encontrada"});
            }

            const fields = [];
            const values = [];

            if (startDate !== undefined) {
                fields.push("start_date = ?");
                values.push(startDate);
            }
            if (endDate !== undefined) {
                fields.push("end_date = ?");
                values.push(endDate);
            }

            const sql = `UPDATE edition SET ${fields.join(", ")} WHERE id = ?`;
            values.push(id);

            await pool.query(sql, values);

            res.status(200).json({ message: "Atualizado com sucesso!"})
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // DELETE para deletar uma edição
    deleteEdition: async (req, res) => {
        const { id } = req.params;

        try {
            const [edition] = await pool.query("SELECT * FROM edition WHERE id = ?", [id]);
            if (edition.length === 0) {
                res.status(404).json({ message: "Edição não encontrada"});
            }

            await pool.query("DELETE FROM edition WHERE id = ?", [id]);
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    }
}