import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { useAuditLogStore } from "@/store/audit-log-store";
import { useEffect } from "react";

function AuditProvisioning() {
    const isLoading = useAuditLogStore((s) => s.isLoading);
    const auditProvisioning = useAuditLogStore((s) => s.auditProvisioning);
    const setAuditProvisioning = useAuditLogStore.getState().setAuditProvisioning;

    useEffect(() => {
        setAuditProvisioning();
    }, [setAuditProvisioning]);

    if (isLoading || auditProvisioning.length <= 0) {
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
                Nenhum log de Provisioning encontrado.
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
                            <TableHead className="text-zinc-200 p-5">Id Change</TableHead>
                            <TableHead className="text-zinc-200 p-5">Id Cycle</TableHead>
                            <TableHead className="text-zinc-200 p-5">Action Provisioning</TableHead>
                            <TableHead className="text-zinc-200 p-5">Status</TableHead>
                            <TableHead className="text-zinc-200 p-5">Id App</TableHead>
                            <TableHead className="text-zinc-200 p-5">App Display Name</TableHead>
                            <TableHead className="text-zinc-200 p-5">Activity DateTime</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            auditProvisioning.map((log) => (
                                <TableRow key={log.id} className="hover:bg-zinc-800">
                                    <TableCell className="font-medium">{log.id}</TableCell>
                                    <TableCell>{log.changeId}</TableCell>
                                    <TableCell>{log.cycleId}</TableCell>
                                    <TableCell>{log.provisioningAction}</TableCell>
                                    <TableCell>{log.status.status}</TableCell>
                                    <TableCell>{log.initiatedBy.app.appId}</TableCell>
                                    <TableCell>{log.initiatedBy.app.displayName}</TableCell>
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
                        {JSON.stringify(auditProvisioning, null, 2)}
                    </pre>
                </div>
            </>
        )
    }

    const hasGroups = auditProvisioning.length > 0 && auditProvisioning[0].id !== "";

    return (
        <div className="flex-1">
            <Card className="w-full max-w-4xl bg-transparent border border-zinc-800">
                <CardContent className="text-zinc-200">
                    {
                        hasGroups ? renderTableBody() : renderEmptyAuditLogProvising()
                    }
                </CardContent>
            </Card>
        </div>
    );
}

export default AuditProvisioning;