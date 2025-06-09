import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TableRow, TableHead, TableBody, Table, TableHeader, TableCell } from "@/components/ui/table";
import { useUsersStore } from "@/store/users-store";
import { useEffect, useState } from "react";

function SearchUser() {
    const isLoading = useUsersStore((s) => s.isLoading);
    const user = useUsersStore((s) => s.filteredUsers);
    const userId = useUsersStore((s) => s.userId);
    const setUsers = useUsersStore.getState().setSearchUsers;
    const setUserId = useUsersStore.getState().setUserId;

    const [debouncedUserId, setDebouncedUserId] = useState(userId);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedUserId(userId);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [userId]);

    useEffect(() => {
        if (debouncedUserId.trim()) {
            setUsers(debouncedUserId);
        }
    }, [debouncedUserId, setUsers]);

    if (isLoading) {
        return (
            <div className="max-w-xl space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="w-full h-24" />

            </div>
        )
    }

    // if (users.length <= 0 || !users[0]?.id) return <div>Não foi possível carregar os dados do usuário.</div>;

    function renderEmptyUser() {
        return (
            <div className="text-center text-zinc-500 mt-4">
                Nenhum usuário encontrado.
            </div>
        )
    }

    function renderTableBody() {
        return (
            <>
                <Table className="w-full gap-10">
                    <TableHeader className="gap-10">
                        <TableRow >
                            <TableHead className="text-zinc-200 p-5">Id</TableHead>
                            <TableHead className="text-zinc-200 p-5">Display Name</TableHead>
                            <TableHead className="text-zinc-200 p-5">Name</TableHead>
                            <TableHead className="text-zinc-200 p-5">Surname</TableHead>
                            <TableHead className="text-zinc-200 p-5">UserPrincipalName</TableHead>
                            <TableHead className="text-zinc-200 p-5">Mail</TableHead>
                            <TableHead className="text-zinc-200 p-5">Job Title</TableHead>
                            <TableHead className="text-zinc-200 p-5">Mobile Phone</TableHead>
                            <TableHead className="text-zinc-200 p-5">Preferred Language</TableHead>
                            <TableHead className="text-zinc-200 p-5">Surname</TableHead>
                            <TableHead className="text-zinc-200 p-5">businessPhones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            <TableRow key={user.id} className="hover:bg-zinc-800">
                                <TableCell className="font-medium">{user.id}</TableCell>
                                <TableCell>{user.displayName}</TableCell>
                                <TableCell>{user.givenName}</TableCell>
                                <TableCell>{user.surname}</TableCell>
                                <TableCell>{user.userPrincipalName}</TableCell>
                                <TableCell>{user.mail}</TableCell>
                                <TableCell>{user.jobTitle}</TableCell>
                                <TableCell>{user.mobilePhone}</TableCell>
                                <TableCell>{user.preferredLanguage}</TableCell>
                                <TableCell>{user.surname}</TableCell>
                                <TableCell>{user.businessPhones.join(", ")}</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>

                <Separator className="my-6" />
                <div >
                    <h3 className="font-semibold mb-2">Dados completo JSON:</h3>
                    <pre className="p-4 rounded text-sm overflow-x-auto bg-zinc-900 text-white">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </div>
            </>
        )
    }

    return (
        <div className="flex-1">
            <Card className="w-full max-w-4xl bg-transparent border border-zinc-800">
                <CardContent className="text-zinc-200">
                    <Input
                        placeholder="Filter emails..."
                        value={userId ?? ""}
                        onChange={(e) => setUserId(e.target.value)}
                        disabled={isLoading}
                        className="max-w-sm"
                    />
                    {
                        user.id ? renderTableBody() : renderEmptyUser()
                    }


                </CardContent>
            </Card>
        </div>
    );
}

export default SearchUser;