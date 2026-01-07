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
import { Family } from "@/types/index";
import { router } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ActionsCellFamilies({ family }: { family: Family }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route("admin.families.destroy", family.id), {
            onSuccess: () => {
                toast.success("Familia eliminada correctamente");
                setIsOpen(false);
            },
            onError: () => {
                toast.error("Error al eliminar la familia");
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
                    onClick={() =>
                        router.get(route("admin.families.edit", family.id))
                    }
                >
                    <Edit className="w-4 h-4" />
                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsOpen(true)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar familia?</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Estás seguro de que deseas eliminar la familia{" "}
                            <strong>{family.name}</strong>? Esta acción no se
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
