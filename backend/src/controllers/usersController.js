const uuid = require("uuid");
const users = require("../models/userModel");

const usersController = {
    // GET para buscar todos os usuários registrados;
    allUsers: (req, res) => {
        return res.status(200).json(users);
    },
    // GET para buscar determinado usuário pelo seu ID
    userByID: (req, res) => {
        const { id } = req.params;

        const indexUser = users.findIndex(user => user.id === id);
        if (indexUser === -1) return res.status(404).json({ message: "User not found"});

        return res.status(200).json(users[indexUser]);
    },
    // GET para buscar determinado usuário pelo seu RA
    userByRA: (req, res) => {
        const { RA } = req.params;

        const indexUser = users.findIndex(user => user.RA === RA);
        if (indexUser === -1) return res.status(404).json({ message: "User not found"});

        return res.status(200).json(users[indexUser]);
    },
    // POST para criar os usuários
    createUser: (req, res) => {
        const { RA, name, email, password, idGroup } = req.body;

        const user = {
            id: uuid.v4(),
            RA: RA,
            name: name,
            email: email,
            password: password,
            idGroup: idGroup
        }

        users.push(user);
        return res.status(201).json(user);
    },
    // PUT para atualizar um usuário
    updateUser: (req, res) => {
        const { id } = req.params;
        const { RA, name, email, password, idGroup } = req.body;

        const indexUser = users.findIndex(user => user.id === id);
        if (indexUser === -1) return res.status(404).json({ message: "User not found"});
        if (RA !== null) users[indexUser].RA = RA;
        if (name !== null) users[indexUser].name = name;
        if (email !== null) users[indexUser].email = email;
        if (password !== null) users[indexUser].password = password;
        if (idGroup !== null) users[indexUser].idGroup = idGroup;

        return res.status(201).json(users[indexUser]);
    },
    // DELETE para deletar um usuário
    deleteUser: (req, res) => {
        const { id } = req.params;

        const indexUser = users.findIndex(user => user.id === id);
        if (indexUser === -1) return res.status(404).json({ message: "User not found"});

        const result = users.splice(indexUser, 1);
        return res.status(201).json(result);
    }
}

module.exports = usersController;