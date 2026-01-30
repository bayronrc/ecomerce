import { ActionsCell } from "@/Components/Table/ActionsCell";
import { SortableHeaderButton } from "@/Components/Table/SortableHeaderButton";
import { createDateColumn } from "@/Components/Table/dateFormatters";
import { ColumnDef } from "@tanstack/react-table";

/**
 * Ejemplo de cómo crear columnas reutilizables para una nueva tabla
 *
 * Este archivo muestra el patrón a seguir para nuevas tablas.
 * Solo necesitas:
 * 1. Importar los componentes reutilizables
 * 2. Crear tu array de columnas
 * 3. Usar ActionsCell para las acciones
 */

// Ejemplo 1: Tabla simple con ordenamiento y acciones
interface Example1 {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export const exampleColumns1: ColumnDef<Example1>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <SortableHeaderButton label="ID" column={column} />
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <SortableHeaderButton label="Nombre" column={column} />
        ),
    },
    createDateColumn("created_at", "Creado"),
    createDateColumn("updated_at", "Actualizado"),
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
            <ActionsCell
                item={row.original}
                editRoute={route("admin.example1.edit", row.original.id)}
                deleteRoute={route("admin.example1.destroy", row.original.id)}
                entityName="elemento"
            />
        ),
    },
];

// Ejemplo 2: Tabla con más columnas personalizadas
interface Example2 {
    id: number;
    title: string;
    description: string;
    status: string;
    created_at: string;
}

export const exampleColumns2: ColumnDef<Example2>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <SortableHeaderButton label="ID" column={column} />
        ),
        size: 80,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <SortableHeaderButton label="Título" column={column} />
        ),
    },
    {
        accessorKey: "description",
        header: "Descripción",
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {row.getValue("status")}
            </span>
        ),
    },
    createDateColumn("created_at", "Fecha"),
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
            <ActionsCell
                item={row.original}
                editRoute={route("admin.example2.edit", row.original.id)}
                deleteRoute={route("admin.example2.destroy", row.original.id)}
                entityName="elemento"
                successMessage="Elemento eliminado con éxito"
                errorMessage="No se pudo eliminar el elemento"
            />
        ),
    },
];

/**
 * Patrones de uso comunes:
 *
 * 1. Para ordenamiento simple:
 *    Use SortableHeaderButton en el header
 *
 * 2. Para fechas:
 *    Use createDateColumn() helper
 *
 * 3. Para acciones estándar (Edit/Delete):
 *    Use ActionsCell con las routes correspondientes
 *
 * 4. Para columnas personalizadas:
 *    Defina el objeto de columna directamente con su cell renderer
 */
