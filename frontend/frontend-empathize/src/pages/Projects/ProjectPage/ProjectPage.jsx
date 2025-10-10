import { useNavigate, useParams } from "react-router-dom";

export default function ProjectPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <>
            <div>
                <h1>Gerenciando!!!</h1>
            </div>
        </>
    );
}