import { v4 as uuidv4} from "uuid";
import admins from "../models/admModel.js";

const adminController = {
    // POST para criar um admin
    createAdmin: (req, res) => {
        const { name, email, password } = req.body;
        
        const admin = {
            id: uuidv4(),
            name: name,
            email: email,
            password: password
        }

        admins.push(admin);

        return res.status(201).json(admin);
    }
}