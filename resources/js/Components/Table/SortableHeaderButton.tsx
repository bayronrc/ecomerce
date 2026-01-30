import { Button } from "@/Components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

interface SortableHeaderButtonProps {
    label: string;
    column: Column<any, any>;
}

export function SortableHeaderButton({
    label,
    column,
}: SortableHeaderButtonProps) {
    return (
        <Button
            variant="ghost"
            onClick={() =>
                column.toggleSorting(column.getIsSorted() === "desc")
            }
            className="hover:bg-transparent"
        >
            {label}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );
}
