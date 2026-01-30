// Componentes Reutilizables Propuestos para el Futuro

/**
 * 1. StatusBadgeColumn
 * Para mostrar estados/badges con colores consistentes
 */
interface StatusConfig {
    [key: string]: {
        label: string;
        color: "blue" | "green" | "red" | "yellow";
    };
}

// Uso:
// createStatusColumn("status", "Estado", { active: { label: "Activo", color: "green" } })

/**
 * 2. ImageColumn
 * Para mostrar imágenes en tabla
 */
// Uso:
// createImageColumn("image_url", "Imagen", { width: 60, height: 60 })

/**
 * 3. PriceColumn
 * Para formatear precios con símbolo de moneda
 */
// Uso:
// createPriceColumn("price", "Precio", "USD")

/**
 * 4. PercentageColumn
 * Para mostrar porcentajes
 */
// Uso:
// createPercentageColumn("discount", "Descuento")

/**
 * 5. BooleanColumn
 * Para mostrar valores booleanos como toggle o checkbox
 */
// Uso:
// createBooleanColumn("is_active", "Activo")

/**
 * 6. CustomActionsCell
 * Para acciones más complejas (Archive, Duplicate, etc)
 */
// Uso:
// <CustomActionsCell
//     item={item}
//     actions={[
//         { label: "Editar", route: ..., icon: Edit },
//         { label: "Duplicar", onClick: handleDuplicate, icon: Copy },
//         { label: "Archivar", route: ..., icon: Archive }
//     ]}
// />

/**
 * 7. ExpandableRowColumn
 * Para filas expandibles con más detalles
 */
// Uso:
// enableRowExpansion()
// setExpandedContent(row => <DetailComponent item={row.original} />)

/**
 * 8. SelectableRowsHeader
 * Para filas seleccionables con acciones bulk
 */
// Uso:
// <SelectableRowsHeader
//     selectedCount={selectedRows.length}
//     onBulkDelete={handleBulkDelete}
//     onBulkUpdate={handleBulkUpdate}
// />

/**
 * 9. FilterableHeaderButton
 * Para encabezados con filtros dropdown
 */
// Uso:
// <FilterableHeaderButton
//     label="Estado"
//     column={column}
//     filterOptions={[{ label: "Activo", value: "active" }]}
// />

/**
 * 10. ExportTableButton
 * Para exportar datos de tabla a CSV/Excel
 */
// Uso:
// <ExportTableButton
//     data={tableData}
//     format="csv"
//     filename="categorias"
// />

/**
 * PATRÓN DE IMPLEMENTACIÓN
 * =======================
 *
 * Todos los componentes deben:
 * 1. Ser genéricos (reutilizables en múltiples tablas)
 * 2. Tener props bien tipadas con TypeScript
 * 3. Ser pequeños y enfocados en una sola responsabilidad
 * 4. Incluir ejemplos de uso
 * 5. Ser testables de forma aislada
 */

export {};
