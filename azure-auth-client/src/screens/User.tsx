import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/store/user-store";
import { Avatar, AvatarImage, AvatarFallback } from "@components/ui/avatar";
import { useEffect } from "react";

function User() {
    const isLoading = useUserStore((s) => s.isLoading);
    const user = useUserStore((s) => s.user);
    const setUser = useUserStore.getState().setUser;

    useEffect(() => {
        setUser();
    }, [setUser]);



    if (isLoading || !user) {
        return (
            <div className="max-w-xl space-y-4">
                <Skeleton className="w-24 h-24 rounded-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="w-full h-24" />

            </div>
        )
    }

    if (!user) return <div>Não foi possível carregar os dados do usuário.</div>;

    return (
        <div className="flex-1">
            <Card className="w-full max-w-4xl mx-auto bg-transparent border border-zinc-800">
                <CardHeader className="flex flex-col md:flex-row items-center md:items-center gap-4">
                    <Avatar className="w-20 h-20 text-zinc-50">
                        <AvatarImage src={user?.photo?.photo} />
                        <AvatarFallback className="bg-zinc-950">
                            {user.displayName?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-center md:text-left">
                        <CardTitle className="text-zinc-200">{user.displayName}</CardTitle>
                        <p className="text-sm text-zinc-500 break-words max-w-full">
                            {user.userPrincipalName}
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-6 text-zinc-200">
                    {[
                        { label: "Nome", value: user.givenName },
                        { label: "Sobrenome", value: user.surname },
                        { label: "Email", value: user.mail },
                        { label: "Cargo", value: user.jobTitle },
                    ].map(({ label, value }, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                            <Label>{label}:</Label>
                            <Input value={value} disabled className="w-full" />
                        </div>
                    ))}

                    <Separator />
                    <div>
                        <h3 className="font-semibold mb-2">Dados completo JSON teste:</h3>
                        <pre className="p-4 rounded text-sm overflow-x-auto bg-zinc-900 text-white">
                            {JSON.stringify(user, null, 2)}
                        </pre>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default User;