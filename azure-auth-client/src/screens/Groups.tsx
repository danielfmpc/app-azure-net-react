import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { useGroupsStore } from "@/store/group-store";
import { useEffect } from "react";

function Groups() {
    const isLoading = useGroupsStore((s) => s.isLoading);
    const groups = useGroupsStore((s) => s.groups);
    const setGroups = useGroupsStore.getState().setGroups;

    useEffect(() => {
        setGroups();
    }, [setGroups]);



    if (isLoading || groups.length <= 0) {
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

    function renderEmptyGroup() {
        return (
            <div className="text-center text-zinc-500 mt-4">
                Nenhum groupo encontrado.
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
                            <TableHead className="text-zinc-200 p-5">Description</TableHead>
                            <TableHead className="text-zinc-200 p-5">Mail</TableHead>
                            <TableHead className="text-zinc-200 p-5">Created DateTime</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            groups.map((group) => (
                                <TableRow key={group.id} className="hover:bg-zinc-800">
                                    <TableCell className="font-medium">{group.id}</TableCell>
                                    <TableCell>{group.displayName}</TableCell>
                                    <TableCell>{group.description}</TableCell>
                                    <TableCell>{group.mail}</TableCell>
                                    <TableCell>{group.createdDateTime.toLocaleString()}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

                <Separator className="my-6" />
                <div >
                    <h3 className="font-semibold mb-2">Dados completo JSON:</h3>
                    <pre className="p-4 rounded text-sm overflow-x-auto bg-zinc-900 text-white">
                        {JSON.stringify(groups, null, 2)}
                    </pre>
                </div>
            </>
        )
    }

    const hasGroups = groups.length > 0 && groups[0].id !== "";

    return (
        <div className="flex-1">
            <Card className="w-full max-w-4xl bg-transparent border border-zinc-800">
                <CardContent className="text-zinc-200">
                    {
                        hasGroups ? renderTableBody() : renderEmptyGroup()
                    }
                </CardContent>
            </Card>
        </div>
    );
}

export default Groups;