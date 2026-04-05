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
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { createBreadcrumbs } from "@/helpers/breadcrumbs";
import Authenticated from "@/Layouts/AdminLayout";
import { Category, Family, PageWithLayout } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { AlertCircle, Loader2, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    families: Family[];
    category: Category;
    subcategoriesCount: number;
}

const Edit: PageWithLayout<Props> = ({
    families,
    category,
    subcategoriesCount,
}) => {
    const { data, setData, patch, processing, errors } = useForm({
        name: category.name || "",
        family_id: category.family_id || "",
    });

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route("admin.categories.update", category.id), {
            onSuccess: () => {
                toast.success("Categoria actualizada correctamente");
            },
            onError: () => {
                toast.error("Error al actualizar la Categoria");
            },
        });
    };

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route("admin.categories.destroy", category.id), {
            onSuccess: () => {
                toast.success("Categoría eliminada correctamente");
                setDeleteDialogOpen(false);
            },
            onError: () => {
                toast.error(
                    "No se puede eliminar esta categoría porque tiene subcategorías asociadas",
                );
                setIsDeleting(false);
                setDeleteDialogOpen(false);
            },
        });
    };

    const canDelete = subcategoriesCount === 0;

    return (
        <>
            <div className="">
                <Card className="shadow-sm border-slate-200">
                    <CardHeader className="border-b bg-slate-50/50">
                        <CardTitle className="text-xl font-bold text-slate-800">
                            Editar Categoria : {category.name}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-6">
                        {!canDelete && (
                            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
                                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-yellow-800">
                                        No se puede eliminar esta categoría
                                    </p>
                                    <p className="text-sm text-yellow-700">
                                        Tiene {subcategoriesCount}{" "}
                                        subcategoría(s) asociada(s). Debe
                                        eliminar todas las subcategorías
                                        primero.
                                    </p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2 flex flex-col">
                                <Label
                                    className={
                                        errors.family_id
                                            ? "text-destructive"
                                            : ""
                                    }
                                >
                                    Nombre de la Familia
                                </Label>
                                <Select
                                    value={data.family_id.toString()}
                                    onValueChange={(value) =>
                                        setData("family_id", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Seleccione la Familia de la categoria que quiere editar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {families.map((family) => (
                                                <SelectItem
                                                    key={family.id}
                                                    value={family.id.toString()}
                                                >
                                                    {family.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                {errors.family_id && (
                                    <p className="text-sm font-medium text-destructive">
                                        {errors.family_id}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label
                                    className={
                                        errors.name ? "text-destructive" : ""
                                    }
                                >
                                    Nombre de la Categoria
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Ingrese el nombre de la Categoria"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className={
                                        errors.name
                                            ? "border-destructive focus-visible:ring-destructive"
                                            : ""
                                    }
                                    autoFocus
                                />
                                {errors.name && (
                                    <p className="text-sm font-medium text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-between gap-3 pt-4 border-t">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    disabled={!canDelete || isDeleting}
                                    onClick={() => setDeleteDialogOpen(true)}
                                    title={
                                        !canDelete
                                            ? "No se puede eliminar categorías con subcategorías"
                                            : "Eliminar esta categoría"
                                    }
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Eliminar
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Actualizando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Actualizar Categoria
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            ¿Eliminar categoría?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Estás seguro de que deseas eliminar{" "}
                            <strong>{category.name}</strong>? Esta acción no se
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
};

Edit.layout = (page) => {
    const { category } = page.props as Props;
    return (
        <Authenticated
            title="Editar Categoria"
            breadcrumbs={createBreadcrumbs()
                .add("Dashboard", route("admin.dashboard"))
                .add("Categorias", route("admin.categories.index"))
                .add(`${category.name}`)
                .toArray()}
            children={page}
        />
    );
};

export default Edit;
