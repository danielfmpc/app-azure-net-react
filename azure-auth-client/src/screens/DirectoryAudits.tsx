import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { useAuditLogStore } from "@/store/audit-log-store";
import { useEffect } from "react";

function DirectoryAudits() {
    const isLoading = useAuditLogStore((s) => s.isLoading);
    const directoryAudits = useAuditLogStore((s) => s.directoryAudits);
    const setAuditProvisioning = useAuditLogStore.getState().setAuditProvisioning;

    useEffect(() => {
        setAuditProvisioning();
    }, [setAuditProvisioning]);

    if (isLoading || directoryAudits.length <= 0) {
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

    function renderEmptyAuditLogProvising() {
        return (
            <div className="text-center text-zinc-500 mt-4">
                Nenhum log de DirectoryAudits encontrado.
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
                            <TableHead className="text-zinc-200 p-5">Category</TableHead>
                            <TableHead className="text-zinc-200 p-5">Id Correlation</TableHead>
                            <TableHead className="text-zinc-200 p-5">Result</TableHead>
                            <TableHead className="text-zinc-200 p-5">Activity DisplayName</TableHead>
                            <TableHead className="text-zinc-200 p-5">LoggedBy Service</TableHead>
                            <TableHead className="text-zinc-200 p-5">Type Operation</TableHead>
                            <TableHead className="text-zinc-200 p-5">Initiated Id User</TableHead>
                            <TableHead className="text-zinc-200 p-5">Initiated User</TableHead>
                            <TableHead className="text-zinc-200 p-5">Initiated User PrincipalName</TableHead>
                            <TableHead className="text-zinc-200 p-5">Activity DateTime</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            directoryAudits.map((log) => (
                                <TableRow key={log.id} className="hover:bg-zinc-800">
                                    <TableCell className="font-medium">{log.id}</TableCell>
                                    <TableCell>{log.category}</TableCell>
                                    <TableCell>{log.correlationId}</TableCell>
                                    <TableCell>{log.result}</TableCell>
                                    <TableCell>{log.activityDisplayName}</TableCell>
                                    <TableCell>{log.loggedByService}</TableCell>
                                    <TableCell>{log.operationType}</TableCell>
                                    <TableCell>{log.initiatedBy.user.id}</TableCell>
                                    <TableCell>{log.initiatedBy.user.displayName}</TableCell>
                                    <TableCell>{log.initiatedBy.user.userPrincipalName}</TableCell>
                                    <TableCell>{log.activityDateTime.toLocaleString()}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

                <Separator className="my-6" />
                <div >
                    <h3 className="font-semibold mb-2">Dados completo JSON:</h3>
                    <pre className="p-4 rounded text-sm overflow-x-auto bg-zinc-900 text-white">
                        {JSON.stringify(directoryAudits, null, 2)}
                    </pre>
                </div>
            </>
        )
    }

    const hasGroups = directoryAudits.length > 0 && directoryAudits[0].id !== "";

    return (
        <div className="flex-1">
            <Card className="w-full max-w-4xl mx-auto bg-transparent border border-zinc-800">
                <CardContent className="text-zinc-200">
                    {
                        hasGroups ? renderTableBody() : renderEmptyAuditLogProvising()
                    }
                </CardContent>
            </Card>
        </div>
    );
}

export default DirectoryAudits;