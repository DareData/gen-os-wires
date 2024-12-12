import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
    List,
    usePagination,
    EditButton,
    ShowButton,
    DeleteButton,
    TagField,
} from "@refinedev/chakra-ui";
import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    HStack,
    Button,
    IconButton,
    Box,
} from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { useTranslate, GetManyResponse, useMany } from "@refinedev/core";

export const AutomationListDetail = () => {
    const translate = useTranslate();
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: "id",
                accessorKey: "id",
                header: translate("Automations.fields.id"),
            },
            {
                id: "status",
                accessorKey: "status",
                header: translate("Automations.fields.status"),
            },
            {
                id: "messages",
                header: translate("Automations.fields.messages"),
                accessorKey: "messages",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        messagesData: GetManyResponse;
                    };

                    const messages = getValue<any[]>()?.map((item) => {
                        return meta.messagesData?.data?.find(
                            (resourceItems) => resourceItems.id === item,
                        );
                    });

                    return (
                        <HStack>
                            {messages?.map((item, index) => (
                                <TagField key={index} value={item?.content} />
                            ))}
                        </HStack>
                    );
                },
            },
            {
                id: "issues",
                header: translate("Automations.fields.issues"),
                accessorKey: "issues",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        issuesData: GetManyResponse;
                    };

                    const issues = getValue<any[]>()?.map((item) => {
                        return meta.issuesData?.data?.find(
                            (resourceItems) => resourceItems.id === item,
                        );
                    });

                    return (
                        <HStack>
                            {issues?.map((item, index) => (
                                <TagField key={index} value={item?.name} />
                            ))}
                        </HStack>
                    );
                },
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                cell: function render({ getValue }) {
                    return (
                        <HStack>
                            <ShowButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                            <EditButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                            <DeleteButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                        </HStack>
                    );
                },
            },
        ],
        [translate],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const { data: messagesData } = useMany({
        resource: "messages",
        ids: [].concat(
            ...(tableData?.data?.map((item) => item?.messages) ?? []),
        ),
        queryOptions: {
            enabled: !!tableData?.data,
        },
    });

    const { data: issuesData } = useMany({
        resource: "issues",
        ids: [].concat(...(tableData?.data?.map((item) => item?.issues) ?? [])),
        queryOptions: {
            enabled: !!tableData?.data,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            messagesData,
            issuesData,
        },
    }));

    return (
        <Box margin="30px">
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder &&
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
        </Box >
    );
};

type PaginationProps = {
    current: number;
    pageCount: number;
    setCurrent: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
    current,
    pageCount,
    setCurrent,
}) => {
    const pagination = usePagination({
        current,
        pageCount,
    });

    return (
        <Box display="flex" justifyContent="flex-end">
            <HStack my="3" spacing="1">
                {pagination?.prev && (
                    <IconButton
                        aria-label="previous page"
                        onClick={() => setCurrent(current - 1)}
                        disabled={!pagination?.prev}
                        variant="outline"
                    >
                        <IconChevronLeft size="18" />
                    </IconButton>
                )}

                {pagination?.items.map((page) => {
                    if (typeof page === "string")
                        return <span key={page}>...</span>;

                    return (
                        <Button
                            key={page}
                            onClick={() => setCurrent(page)}
                            variant={page === current ? "solid" : "outline"}
                        >
                            {page}
                        </Button>
                    );
                })}
                {pagination?.next && (
                    <IconButton
                        aria-label="next page"
                        onClick={() => setCurrent(current + 1)}
                        variant="outline"
                    >
                        <IconChevronRight size="18" />
                    </IconButton>
                )}
            </HStack>
        </Box>
    );
};
