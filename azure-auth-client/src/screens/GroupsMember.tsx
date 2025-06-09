import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { useGroupsStore } from "@/store/group-store";
import { useEffect, useState } from "react";

function GroupsMembers() {
    const isLoading = useGroupsStore((s) => s.isLoading);
    const groupsMembers = useGroupsStore((s) => s.groupMembers);
    const groupId = useGroupsStore((s) => s.groupId);
    const setGroupMembers = useGroupsStore.getState().setGroupMembers;
    const setGroupId = useGroupsStore.getState().setGroupId;
    const [debouncedGroupId, setDebouncedGroupId] = useState(groupId);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedGroupId(groupId);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [groupId]);

    useEffect(() => {
        if (debouncedGroupId.trim()) {
            setGroupMembers(debouncedGroupId);
        }
    }, [debouncedGroupId, setGroupMembers]);



    if (isLoading || groupsMembers.length <= 0) {
        return (
            <div className="max-w-xl space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
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
                            <TableHead className="text-zinc-200 p-5">Name</TableHead>
                            <TableHead className="text-zinc-200 p-5">Surname</TableHead>
                            <TableHead className="text-zinc-200 p-5">UserPrincipalName</TableHead>
                            <TableHead className="text-zinc-200 p-5">Mail</TableHead>
                            <TableHead className="text-zinc-200 p-5">Job Title</TableHead>
                            <TableHead className="text-zinc-200 p-5">Mobile Phone</TableHead>
                            <TableHead className="text-zinc-200 p-5">Office Location</TableHead>
                            <TableHead className="text-zinc-200 p-5">Preferred Language</TableHead>
                            <TableHead className="text-zinc-200 p-5">businessPhones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            groupsMembers.map((group) => (
                                <TableRow key={group.id} className="hover:bg-zinc-800">
                                    <TableCell className="font-medium">{group.id}</TableCell>
                                    <TableCell>{group.displayName}</TableCell>
                                    <TableCell>{group.givenName}</TableCell>
                                    <TableCell>{group.surname}</TableCell>
                                    <TableCell>{group.userPrincipalName}</TableCell>
                                    <TableCell>{group.mail}</TableCell>
                                    <TableCell>{group.jobTitle}</TableCell>
                                    <TableCell>{group.mobilePhone}</TableCell>
                                    <TableCell>{group.officeLocation}</TableCell>
                                    <TableCell>{group.preferredLanguage}</TableCell>
                                    <TableCell>{group.businessPhones.join(", ")}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

                <Separator className="my-6" />
                <div >
                    <h3 className="font-semibold mb-2">Dados completo JSON:</h3>
                    <pre className="p-4 rounded text-sm overflow-x-auto bg-zinc-900 text-white">
                        {JSON.stringify(groupsMembers, null, 2)}
                    </pre>
                </div>
            </>
        )
    }

    const hasGroups = groupsMembers.length > 0 && groupsMembers[0].id !== "";

    return (
        <div className="flex-1">
            <Card className="w-full max-w-4xl bg-transparent border border-zinc-800">
                <CardContent className="text-zinc-200">
                    <Input
                        placeholder="Filter groups member..."
                        value={groupId ?? ""}
                        onChange={(e) => setGroupId(e.target.value)}
                        disabled={isLoading}
                        className="max-w-sm"
                    />
                    {
                        hasGroups ? renderTableBody() : renderEmptyGroup()
                    }
                </CardContent>
            </Card>
        </div>
    );
}

export default GroupsMembers;