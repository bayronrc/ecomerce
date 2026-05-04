import { ActionsCell } from "@/Components/Table/ActionsCell";
import { SortableHeaderButton } from "@/Components/Table/SortableHeaderButton";
import { createDateColumn } from "@/Components/Table/dateFormatters";
import { Subcategory } from "@/types/index";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Subcategory>();
export const columns: ColumnDef<Subcategory, any>[] = [
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
    columnHelper.accessor((row) => row.category?.name, {
        id: "categoryName", // ID único para esta columna
        header: "Categoría",
        cell: (info) => info.getValue() ?? "Sin categoría",
    }),

    // Columna para Familia (Acceso anidado N+1)
    columnHelper.accessor((row) => row.category?.family?.name, {
        id: "familyName", // ID único para esta columna
        header: "Familia",
        cell: (info) => info.getValue() ?? "Sin familia",
    }),

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
