import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validateToken } from "../login/auth.js";
import styles from "./ProtectedRoute.module.css";

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

    return isAuthenticated ? children : null;
}