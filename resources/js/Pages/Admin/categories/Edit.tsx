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
import { useForm } from "@inertiajs/react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

interface Props {
    families: Family[];
    categories: Category;
}

const Edit: PageWithLayout<Props> = ({ families, categories }) => {
    const { data, setData, patch, processing, errors } = useForm({
        name: categories.name || "",
        family_id: categories.family_id || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route("admin.categories.update", categories.id), {
            onSuccess: () => {
                toast.success("Categoria actualizada correctamente");
            },
            onError: () => {
                toast.error("Error al actualizar la Categoria");
            },
        });
    };

    return (
        <>
            <div className="">
                <Card className="shadow-sm border-slate-200">
                    <CardHeader className="border-b bg-slate-50/50">
                        <CardTitle className="text-xl font-bold text-slate-800">
                            Editar Categoria : {categories.name}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-6">
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

                            <div className="flex justify-end gap-3 pt-4 border-t">
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
        </>
    );
};

Edit.layout = (page) => {
    const { categories } = page.props as Props;
    console.log(categories);
    return (
        <Authenticated
            title="Editar Categoria"
            breadcrumbs={createBreadcrumbs()
                .add("Dashboard", route("admin.dashboard"))
                .add("Categorias", route("admin.categories.index"))
                .add(`${categories.name}`)
                .toArray()}
            children={page}
        />
    );
};

export default Edit;
