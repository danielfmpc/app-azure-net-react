import type { ReactNode } from "react";
import { LogOut, User, UserSearch, Users, ClipboardListIcon } from "lucide-react";
import { UsersFour, } from "phosphor-react";
import { NavLink } from "react-router-dom";
import logo from "@assets/logo.svg";
import { Separator } from "@components/ui/separator";
import { useAuthStore } from "@store/auth-store";
import { Avatar, AvatarImage, AvatarFallback } from "@components/ui/avatar";
import { useLogout } from "@/hooks/useLogout";

interface PrivateLayoutProps {
    children: ReactNode;
}

export function PrivateLayout({ children }: PrivateLayoutProps) {
    const { user } = useAuthStore();
    const logout = useLogout();


    return (
        <div className="flex h-screen">
            <aside className="sidebar w-64 bg-zinc-950 text-zinc-50 flex flex-col p-4 h-screen overflow-y-auto">

                {user && (
                    <div className="flex-1 flex my-4">
                        <div className="flex text-sm text-gray-300 items-center gap-2">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center">
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-xs text-zinc-400">{user.email}</p>
                            </div>
                        </div>
                    </div>
                )}

                <Separator className="mb-4" />

                <img
                    src={logo}
                    alt="Logo"
                    className="w-32 h-auto mb-6 mx-auto"
                />

                <h1 className="text-2xl font-bold mb-8">Azure Cloud App</h1>

                <nav className="flex flex-col gap-4">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded hover:bg-zinc-800 ${isActive ? "bg-zinc-800" : ""
                            }`
                        }
                    >
                        <User size={20} />
                        Perfil
                    </NavLink>

                    <div className="space-y-1">
                        <h4 className="leading-none">Auditoria</h4>
                        <Separator className="my-4" />
                    </div>

                    <NavLink
                        to="/signins"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded hover:bg-zinc-800 ${isActive ? "bg-zinc-800" : ""
                            }`
                        }
                    >
                        <ClipboardListIcon size={20} />
                        SignIns
                    </NavLink>

                    <NavLink
                        to="/directoryaudits"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded hover:bg-zinc-800 ${isActive ? "bg-zinc-800" : ""
                            }`
                        }
                    >
                        <ClipboardListIcon size={20} />
                        Directory Audits
                    </NavLink>

                    <NavLink
                        to="/provisioning"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded hover:bg-zinc-800 ${isActive ? "bg-zinc-800" : ""
                            }`
                        }
                    >
                        <ClipboardListIcon size={20} />
                        Provisioning
                    </NavLink>

                    <div className="space-y-1">
                        <h4 className="leading-none">Grupos</h4>
                        <Separator className="my-4" />
                    </div>

                    <NavLink
                        to="/groups"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded hover:bg-zinc-800 ${isActive ? "bg-zinc-800" : ""
                            }`
                        }
                    >
                        <UsersFour size={20} />
                        Groups
                    </NavLink>

                    <NavLink
                        to="/groupmembers"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded hover:bg-zinc-800 ${isActive ? "bg-zinc-800" : ""
                            }`
                        }
                    >
                        <UserSearch size={20} />
                        Groups Members
                    </NavLink>

                    <div className="space-y-1">
                        <h4 className="leading-none">Usuários</h4>
                        <Separator className="my-4" />
                    </div>

                    <NavLink
                        to="/users"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded hover:bg-zinc-800 ${isActive ? "bg-zinc-800" : ""
                            }`
                        }
                    >
                        <Users size={20} />
                        Users
                    </NavLink>

                    <NavLink
                        to="/searchusers"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded hover:bg-zinc-800 ${isActive ? "bg-zinc-800" : ""
                            }`
                        }
                    >
                        <UserSearch size={20} />
                        Search Users
                    </NavLink>
                </nav>

                <div className="py-4 border-t mt-8 border-zinc-800 hover:bg-zinc-800 cursor-pointer">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 p-2 rounded cursor-pointer fill"
                    >
                        <LogOut size={20} />
                        Sair
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto p-6 bg-zinc-900 text-zinc-50">
                <div className="space-y-4">
                    {children}
                </div>
            </main>
        </div>
    );
}
