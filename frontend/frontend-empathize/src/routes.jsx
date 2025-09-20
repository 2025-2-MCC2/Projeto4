import { createBrowserRouter } from "react-router-dom";
import Projects from "./pages/Dashboards/Projects/Projects";
import DashboardStudent from "./pages/Dashboards/Dashboard";
import FormInitial from "./pages/form/initial";

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
        path: "/form",
        element: <FormInitial />
    }
])

export default router;