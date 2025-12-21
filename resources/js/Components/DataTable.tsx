// resources/js/Components/DataTable.tsx
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { router } from "@inertiajs/react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: PaginatedResponse<TData>;
    routeName: string; // ej: "admin.families.index"
    routeParams?: Record<string, any>; // parámetros adicionales para la ruta
}

export default function DataTable<TData, TValue>({
    columns,
    data,
    routeName,
    routeParams = {},
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: data.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        manualPagination: true, // Importante: paginación del servidor
        pageCount: data.last_page,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: {
                pageIndex: data.current_page - 1, // TanStack usa índice 0
                pageSize: data.per_page,
            },
        },
    });

    const goToPage = (page: number) => {
        router.visit(route(routeName, { ...routeParams, page }), {
            preserveState: true,
            preserveScroll: true,
            only: ["families"], // opcional: solo recarga los datos necesarios
        });
    };

    const from = data.from ?? 1;
    const to = data.to ?? data.data.length;
    const total = data.total;

    return (
        <div className="space-y-6">
            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="bg-muted/50"
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="whitespace-nowrap"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                        className="hover:bg-muted/50 transition-colors"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-32 text-center text-muted-foreground"
                                    >
                                        No se encontraron resultados.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Información y paginación */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
                <div className="text-sm text-muted-foreground">
                    Mostrando {from} - {to} de {total} registros
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(data.current_page - 1)}
                        disabled={data.current_page === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                    </Button>

                    <span className="text-sm font-medium px-4">
                        Página {data.current_page} de {data.last_page}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(data.current_page + 1)}
                        disabled={data.current_page === data.last_page}
                    >
                        Siguiente
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
