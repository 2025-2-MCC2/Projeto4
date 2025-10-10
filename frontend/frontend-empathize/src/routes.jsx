import { createBrowserRouter } from "react-router-dom";
import Projects from "./pages/Projects/Projects.jsx";
import DashboardStudent from "./pages/Dashboards/Dashboard.jsx";
import Form from "./pages/form/initial/Form.jsx";
import ProjectPage from "./pages/Projects/ProjectPage/ProjectPage.jsx";

const router = createBrowserRouter([
    {
        path: "/home",
        element: <DashboardStudent />
    },
    {
        path: "/projects",
        element: <Projects />
    },
    {
        path: "/register",
        element: <Form />
    },
    {
        path: "*",
        element: <DashboardStudent />
    },
    {
        path: "/product/:id",
        element: <ProjectPage />
    }
])

export default router;