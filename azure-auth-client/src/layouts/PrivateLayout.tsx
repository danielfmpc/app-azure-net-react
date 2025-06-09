import type { ReactNode } from "react";
import { Home, LogOut, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "@assets/logo.svg";
import { Separator } from "@components/ui/separator";
import { useAuthStore } from "@store/auth-store";
import { Avatar, AvatarImage, AvatarFallback } from "@components/ui/avatar";
import { useLogout } from "@/hooks/useLogout";
import { useIsAuthenticated } from "@azure/msal-react";

interface PrivateLayoutProps {
    children: ReactNode;
}

export function PrivateLayout({ children }: PrivateLayoutProps) {
    const { user } = useAuthStore();
    const logout = useLogout();

    const isAuthenticated = useIsAuthenticated();

    console.log(isAuthenticated);

    return (
        <div className="flex h-screen">
            {/* Sidebar fixa à esquerda */}
            {/* <aside className="w-64 bg-zinc-950 text-zinc-50 flex flex-col p-4"> */}
            <aside className="w-64 bg-zinc-950 text-zinc-50 flex flex-col justify-between p-4">
                {user && (
                    <div className="flex-1 flex">
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
                        <Home size={20} />
                        Início
                    </NavLink>

                    <NavLink
                        to="/profile"
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

                    <div className="space-y-1">
                        <h4 className="leading-none">Gropos</h4>
                        <Separator className="my-4" />
                    </div>

                    <div className="space-y-1">
                        <h4 className="leading-none">Usuários</h4>
                        <Separator className="my-4" />
                    </div>
                </nav>

                {/* Rodapé com logout */}
                <div className="py-4 border-t border-zinc-800 hover:bg-zinc-800 cursor-pointer">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 p-2 rounded cursor-pointer fill"
                    >
                        <LogOut size={20} />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Conteúdo da página */}
            <main className="flex-1 overflow-y-auto p-6 bg-zinc-900 text-zinc-50">
                <div className="p-6 space-y-4">

                    {children}
                </div>
            </main>
        </div>
    );
}
