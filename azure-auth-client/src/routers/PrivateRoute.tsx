import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@store/auth-store";
import { PrivateLayout } from "@/layouts/PrivateLayout";

export function PrivateRoute() {
    const { isAuthenticated } = useAuthStore();
    if (isAuthenticated === undefined)
        return <div>Carregando...</div>;

    if (!isAuthenticated) return <Navigate to="/" replace />;

    return (
        <PrivateLayout>
            <Outlet />
        </PrivateLayout>
    );
}
