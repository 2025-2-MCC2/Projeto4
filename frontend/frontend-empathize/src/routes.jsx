import { createBrowserRouter } from "react-router-dom";
import Projects from "./pages/Dashboards/Projects/Projects";
import DashboardStudent from "./pages/Dashboards/Dashboard";
import Form from "./pages/form/initial/Form";

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
    }
])

export default router;