import Login from "@/screens/Login";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import User from "@screens/User";
import Users from "@screens/Users";
import SearchUser from "@screens/SearchUser";
import Groups from "@/screens/Groups";
import GroupsMembers from "@/screens/GroupsMember";
import AuditSignIns from "@/screens/AuditSignIn";
import DirectoryAudits from "@/screens/DirectoryAudits";
import AuditProvisioning from "@/screens/AuditProvisioning";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path="/home" element={<User />} />
                <Route path="/users" element={<Users />} />
                <Route path="/searchusers" element={<SearchUser />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/groupmembers" element={<GroupsMembers />} />
                <Route path="/signins" element={<AuditSignIns />} />
                <Route path="/directoryaudits" element={<DirectoryAudits />} />
                <Route path="/provisioning" element={<AuditProvisioning />} />
            </Route>

            <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
    )
}