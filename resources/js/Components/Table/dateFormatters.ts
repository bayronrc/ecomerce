export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
};

export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat("es-Es", DATE_FORMAT_OPTIONS).format(
        new Date(date),
    );
}

export function createDateColumn(accessorKey: string, headerLabel: string) {
    return {
        accessorKey,
        header: headerLabel,
        cell: ({ row }: { row: any }) => formatDate(row.getValue(accessorKey)),
    };
}
