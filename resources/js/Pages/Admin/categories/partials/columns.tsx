import { Button } from "@/Components/ui/button";
import { Category } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const opciones: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Para usar formato 24h
};
export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Nombre
                    <ArrowUpDown />
                </Button>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: "Fecha de Creación",
        cell: ({ row }) =>
            new Intl.DateTimeFormat("es-Es", opciones).format(
                new Date(row.getValue("created_at"))
            ),
    },
    {
        accessorKey: "updated_at",
        header: "Fecha de Actualizacion",
        cell: ({ row }) =>
            new Intl.DateTimeFormat("es-Es", opciones).format(
                new Date(row.getValue("created_at"))
            ),
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const family = row.original;
        },
    },
];
