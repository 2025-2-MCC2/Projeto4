import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validateToken } from "../login/auth.js";
import styles from "./ProtectedRoute.module.css";

export default function ProtectedRoute({ children, role }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [theReturn, setTheReturn] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            try {
                const data = await validateToken();

                if (!data.valid || role !== data.role) {
                    router.push("/login");
                } 
                if (role === data.role) {
                    setTheReturn(children);
                    setIsAuthenticated(true);
                }
            } catch (err) {
                router.push("/login");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingContent}>
                    <div className={styles.spinnerWrapper}>
                        <div className={styles.spinner}></div>
                        <div className={styles.spinnerGlow}></div>
                    </div>
                    <h2 className={styles.loadingTitle}>Empathize</h2>
                    <p className={styles.loadingText}>Validando suas credenciais...</p>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill}></div>
                    </div>
                </div>
            </div>
        );
    }

    return isAuthenticated ? theReturn : null;
}