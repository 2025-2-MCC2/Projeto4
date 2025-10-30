import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validateToken } from "../login/auth.js";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            try {
                const valid = await validateToken();

                if (!valid) {
                    router.push("/login");
                } else {
                    setIsAuthenticated(true);
                }
            } catch (err) {
                // Em caso de erro, redireciona para login
                router.push("/login");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div>
                <p>Carregando...</p>
            </div>
        );
    }

    return isAuthenticated ? children : null;
}