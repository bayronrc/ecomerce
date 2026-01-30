import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ActionsCellProps {
    item: { id: number; name: string };
    editRoute: string;
    deleteRoute: string;
    successMessage?: string;
    errorMessage?: string;
    entityName?: string;
}

export function ActionsCell({
    item,
    editRoute,
    deleteRoute,
    successMessage = "Elemento eliminado correctamente",
    errorMessage = "Error al eliminar el elemento",
    entityName = "elemento",
}: ActionsCellProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(deleteRoute, {
            onSuccess: () => {
                toast.success(successMessage);
                setIsOpen(false);
            },
            onError: () => {
                toast.error(errorMessage);
                setIsDeleting(false);
            },
        });
    };

    return (
        <>
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.get(editRoute)}
                    title="Editar"
                >
                    <Edit className="w-4 h-4" />
                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsOpen(true)}
                    title="Eliminar"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            ¿Eliminar {entityName}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Estás seguro de que deseas eliminar{" "}
                            <strong>{item.name}</strong>? Esta acción no se
                            puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex gap-2 justify-end">
                        <AlertDialogCancel disabled={isDeleting}>
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? "Eliminando..." : "Eliminar"}
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
