const uuid = require("uuid");
const projects = require("../models/projectModel");

const projectsController = {
    // GET para buscar todos os projetos
    allProjects: (req, res) => {
        return res.status(200).json(projects);
    },
    // GET para buscar um projeto por ID
    projectByID: (req, res) => {
        const { idProject } = req.params;

        const indexProject = projects.findIndex(project => project.idProject === idProject);
        if (indexProject === -1) return res.status(404).json({ message: "Project not found"});

        return res.status(200).json(projects[indexProject]);
    },
    // POST para criar um projeto novo
    createProject: (req, res) => {
        const { idGroup, descriptionProject, projectType } = req.body;

        const project = {
            idProject: uuid.v4(),
            idGroup: idGroup,
            descriptionProject: descriptionProject,
            projectType: projectType
        }

        projects.push(project);

        return res.status(201).json(project);
    },
    // PUT para atualizar um projeto
    updateProject: (req, res) => {
        const { id } = req.params;
        const { idGroup, descriptionProject, projectType } = req.body;

        const indexProject = projects.findIndex(project => project.idProject === id);
        if (indexProject === -1) return res.status(404).json({ message: "Project not found"});

        if (idGroup !== null) projects[indexProject].idGroup === idGroup;
        if (descriptionProject !== null) projects[indexProject].descriptionProject === descriptionProject;
        if (projectType !== null) projects[indexProject].projectType === projectType;

        return res.status(201).json(projects[indexProject]);
    },
    // DELETE para deletar um projeto
    deleteProject: (req, res) => {
        const { idProject } = req.params;

        const indexProject = projects.findIndex(project => project.idProject === idProject);
        if (indexProject === -1) return res.status(404).json({ message: "Project not found"});

        const deleted = projects.splice(indexProject, 1);
        return res.status(201).json(deleted);
    }
}

module.exports = projectsController;