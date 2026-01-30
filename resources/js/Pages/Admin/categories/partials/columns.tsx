import { ActionsCell } from "@/Components/Table/ActionsCell";
import { SortableHeaderButton } from "@/Components/Table/SortableHeaderButton";
import { createDateColumn } from "@/Components/Table/dateFormatters";
import { Category } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Category>[] = [
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
    {
        header: "Familia",
        accessorKey: "family.name",
    },
    createDateColumn("created_at", "Fecha de Creación"),
    createDateColumn("updated_at", "Fecha de Actualización"),
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const category = row.original;
            return (
                <ActionsCell
                    item={category}
                    editRoute={route("admin.categories.edit", category.id)}
                    deleteRoute={route("admin.categories.destroy", category.id)}
                    entityName="categoría"
                    successMessage="Categoría eliminada correctamente"
                    errorMessage="Error al eliminar la categoría"
                />
            );
        },
    },
];
