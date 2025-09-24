import editions from "../models/editionsModel.js";

const editionsController = {
    // GET para buscar todas as edições
    allEditions: (req, res) => {
        return res.status(200).json(editions);
    },
    // GET para buscar por número de edição
    editionByNumber: (req, res) => {
        const { numberEdition } = req.params;

        const indexEdition = editions.findIndex(edition => edition.editionNumber === parseInt(numberEdition));
        if (indexEdition === -1) return res.status(404).json({ message: "Edition not found"});

        return res.status(200).json(editions[indexEdition]);
    },
    // POST para criar uma edição
    createEdition: (req, res) => {
        const { numberEdition, startDate, endDate } = req.body;

        const edition = {
            editionNumber: numberEdition,
            startDate: startDate,
            endDate: endDate
        }

        editions.push(edition);

        return res.status(201).json(edition);
    },
    // PUT para atualizar uma edição
    updateEdition: (req, res) => {
        const { edition } = req.params;
        const { numberEdition, startDate, endDate } = req.body;

        const indexEdition = editions.findIndex(editionIndex => editionIndex.editionNumber === parseInt(edition));
        if (indexEdition === -1) return res.status(404).json({ message: "Edition not found"});

        if (numberEdition !== null) editions[indexEdition].editionNumber = numberEdition;
        if (startDate !== null) editions[indexEdition].startDate = startDate;
        if (endDate !== null) editions[indexEdition].endDate = endDate;

        return res.status(201).json(editions[indexEdition]);
    },
    // DELETE para deletar uma edição
    deleteEdition: (req, res) => {
        const { numberEdition } = req.params;

        const indexEdition = editions.findIndex(edition => edition.editionNumber === parseInt(numberEdition));
        if (indexEdition === -1) return res.status(404).json({ message: "Edition not found"});

        const deleted = editions.splice(indexEdition, 1);

        return res.status(201).json(deleted);
    }
}