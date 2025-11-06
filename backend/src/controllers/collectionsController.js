import { pool } from "../db.js";

const collectionController = {
    //POST para criar uma arrecadação
    createCollection: async (req, res) => {
        const { food, quantityKG, proof, status, idGroup } = req.body;

        try {
            const [group] = await pool.query("SELECT * FROM team WHERE id = ?", [idGroup]);

            if (group.length === 0) {
                res.status(404).json({ message: "Grupo não encontrado"});
            }

            await pool.query("INSERT INTO collection(food, quantity_kg, proof, status, id_group) VALUES(?, ?, ?, ?, ?)", [food, quantityKG, proof, status, idGroup]);

            res.status(201).json({ message: "Arrecadação concluída com sucesso!"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // POST para o mentor avaliar uma arrecadação
    evaluateCollection: async (req, res) => {
        const { id } = req.params;
        const { option, justify } = req.body;

        try {
            const [collection] = await pool.query("SELECT * FROM collection WHERE id = ?", [id]);

            if (collection.length === 0) {
                res.status(404).json({ message: "Arrecadação não encontrada"});
            }

            const options = ["Aprovado", "Reprovado"];

            if (option === 0) {
                await pool.query("UPDATE collection SET status = ? WHERE id = ?", [options[option], id]);
                res.status(201).json({ message: "Arrecadação avalida com sucesso!"});
            }
            if (option === 1) {
                await pool.query("UPDATE collection SET status = ?, jus_reject = ? WHERE id = ?", [options[option], justify, id]);
                res.status(201).json({ message: "Arrecadação avalida com sucesso!"});
            }
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // GET para buscar todas as arrecadações feitas
    allCollections: async (req, res) => {
        try {
            const [collections] = await pool.query("SELECT * FROM collection");

            res.status(200).json({ collections });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // GET para buscar arrecadações por grupo
    collectionByGroup: async (groupId) => {

        try {

            const [collection] = await pool.query("SELECT * FROM collection WHERE id_group = ?", [groupId]);

            return collection;
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    },
    // DELETE para deleter uma arrecadação
    deleteCollection: async (req, res) => {
        const { id } = req.params;

        try {
            const [collection] = await pool.query("SELECT * FROM collection WHERE id = ?", [id]);

            if (collection.length === 0) {
                res.status(404).json({ message: "Arrecadação não encontrada"});
            }

            await pool.query("DELETE FROM collection WHERE id = ?", [id]);

            res.status(200).json({ message: "Deletado com sucesso!"});
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Database Error"});
        }
    }
}

export default collectionController;