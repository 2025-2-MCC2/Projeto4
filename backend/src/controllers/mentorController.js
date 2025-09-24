import { v4 as uuidv4} from "uuid";
import mentors from "../models/mentorModel.js"

const mentorController = {
    // GET para buscar todos os mentores
    allMentors: (req, res) => {
        return res.status(200).json(mentors);
    },
    // GET para buscar um mentor por ID
    mentorByID: (req, res) => {
        const { id } = req.params;

        const indexMentor = mentors.findIndex(mentor => mentor.id === id);
        if (indexMentor === -1) return res.status(404).json({ message: "Mentor not found"});

        return res.status(200).json(mentors[indexMentor]);
    },
    // POST para criar um mentor
    createMentor: (req, res) => {
        const { nameMentor, email, password } = req.body;

        const mentor = {
            id: uuidv4(),
            nameMentor: nameMentor,
            email: email,
            password: password
        }

        mentors.push(mentor)

        return res.status(201).json(mentor);
    },
    // PUT para atualizar o mentor
    updateMentor: (req, res) => {
        const { id } = req.params;
        const { nameMentor, email, password } = req.body;

        const indexMentor = mentors.findIndex(mentor => mentor.id === id);
        if (indexMentor === -1) return res.status(404).json({ message: "Mentor not found"});

        if (nameMentor !== null) mentors[indexMentor].mentorName = nameMentor;
        if (email !== null) mentors[indexMentor].email = email;
        if (password !== null) mentors[indexMentor].password = password;

        return res.status(201).json(mentors[indexMentor]);
    },
    deleteMentor: (req, res) => {
        const { id } = req.params;

        const indexMentor = mentors.findIndex(mentor => mentor.id === id);
        if (indexMentor === -1) return res.status(404).json({ message: "Mentor not found"});

        const deleted = mentors.splice(indexMentor, 1);

        return res.status(201).json(deleted);
    }
}

export default mentorController;