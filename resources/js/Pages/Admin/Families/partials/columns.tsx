import { ActionsCell } from "@/Components/Table/ActionsCell";
import { SortableHeaderButton } from "@/Components/Table/SortableHeaderButton";
import { createDateColumn } from "@/Components/Table/dateFormatters";
import { Family } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Family>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <SortableHeaderButton label="Id" column={column} />
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <SortableHeaderButton label="Nombre" column={column} />
        ),
    },
    createDateColumn("created_at", "Fecha de Creación"),
    createDateColumn("updated_at", "Fecha de Actualización"),
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const family = row.original;
            return (
                <ActionsCell
                    item={family}
                    editRoute={route("admin.families.edit", family.id)}
                    deleteRoute={route("admin.families.destroy", family.id)}
                    entityName="familia"
                    successMessage="Familia eliminada correctamente"
                    errorMessage="Error al eliminar la familia"
                />
            );
        },
    },
];
