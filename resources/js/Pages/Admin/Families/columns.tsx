import { Family } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Family>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "created_at",
        header: "Fecha de Creación",
    },
    {
        accessorKey: "updated_at",
        header: "Fecha de Actualizacion",
    },
];
