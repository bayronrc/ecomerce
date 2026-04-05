import { ActionsCell } from "@/Components/Table/ActionsCell";
import { SortableHeaderButton } from "@/Components/Table/SortableHeaderButton";
import { createDateColumn } from "@/Components/Table/dateFormatters";
import { Subcategory } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Subcategory>[] = [
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
            const subcategory = row.original;
            const hasSubcategories =
                (subcategory as any).subcategories_count > 0;

            return (
                <ActionsCell
                    item={subcategory}
                    editRoute={route("admin.categories.edit", subcategory.id)}
                    deleteRoute={route(
                        "admin.categories.destroy",
                        subcategory.id,
                    )}
                    entityName="categoría"
                    successMessage="Categoría eliminada correctamente"
                    errorMessage="Error al eliminar la categoría"
                    canDelete={!hasSubcategories}
                    deleteDisabledReason={
                        hasSubcategories
                            ? `No se puede eliminar: tiene ${(subcategory as any).subcategories_count} subcategoría(s)`
                            : undefined
                    }
                />
            );
        },
    },
];
