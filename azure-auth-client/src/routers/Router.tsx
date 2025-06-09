import Login from "@/screens/Login";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import User from "@screens/User";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path="/home" element={<User />} />
            </Route>

            <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
    )
}