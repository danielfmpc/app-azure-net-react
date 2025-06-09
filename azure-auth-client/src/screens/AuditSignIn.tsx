import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { useAuditLogStore } from "@/store/audit-log-store";
import { useEffect } from "react";

function AuditSignIns() {
    const isLoading = useAuditLogStore((s) => s.isLoading);
    const auditLogSignIns = useAuditLogStore((s) => s.auditLogSignIns);
    const setAuditLoginIns = useAuditLogStore.getState().setAuditLoginIns;

    useEffect(() => {
        setAuditLoginIns();
    }, [setAuditLoginIns]);



    if (isLoading || auditLogSignIns.length <= 0) {
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

    function renderEmptyAuditLogSingIn() {
        return (
            <div className="text-center text-zinc-500 mt-4">
                Nenhum log de SignIn encontrado.
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
                            <TableHead className="text-zinc-200 p-5">User Principal Name</TableHead>
                            <TableHead className="text-zinc-200 p-5">App Display Name</TableHead>
                            <TableHead className="text-zinc-200 p-5">Status Reason</TableHead>
                            <TableHead className="text-zinc-200 p-5">Ip Address</TableHead>
                            <TableHead className="text-zinc-200 p-5">Client App Used</TableHead>
                            <TableHead className="text-zinc-200 p-5">Location City</TableHead>
                            <TableHead className="text-zinc-200 p-5">Location CountryOrRegion</TableHead>
                            <TableHead className="text-zinc-200 p-5">Created DateTime</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            auditLogSignIns.map((log) => (
                                <TableRow key={log.id} className="hover:bg-zinc-800">
                                    <TableCell className="font-medium">{log.id}</TableCell>
                                    <TableCell>{log.userPrincipalName}</TableCell>
                                    <TableCell>{log.appDisplayName}</TableCell>
                                    <TableCell>{log.Status.failureReason}</TableCell>
                                    <TableCell>{log.ipAddress}</TableCell>
                                    <TableCell>{log.clientAppUsed}</TableCell>
                                    <TableCell>{log.Location.city}</TableCell>
                                    <TableCell>{log.Location.countryorRegion}</TableCell>
                                    <TableCell>{log.createdDateTime.toLocaleString()}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

                <Separator className="my-6" />
                <div >
                    <h3 className="font-semibold mb-2">Dados completo JSON:</h3>
                    <pre className="p-4 rounded text-sm overflow-x-auto bg-zinc-900 text-white">
                        {JSON.stringify(auditLogSignIns, null, 2)}
                    </pre>
                </div>
            </>
        )
    }

    const hasGroups = auditLogSignIns.length > 0 && auditLogSignIns[0].id !== "";

    return (
        <div className="flex-1">
            <Card className="w-full max-w-4xl bg-transparent border border-zinc-800">
                <CardContent className="text-zinc-200">
                    {
                        hasGroups ? renderTableBody() : renderEmptyAuditLogSingIn()
                    }
                </CardContent>
            </Card>
        </div>
    );
}

export default AuditSignIns;