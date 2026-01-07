import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { createBreadcrumbs } from "@/helpers/breadcrumbs";
import Authenticated from "@/Layouts/AdminLayout";
import { PageProps, PageWithLayout } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

interface Props extends PageProps {
    family: { id: number; name: string };
}

const Edit: PageWithLayout<Props> = ({ family }: Props) => {
    const { data, setData, put, processing, errors } = useForm({
        name: family.name || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("admin.families.update", family.id), {
            onSuccess: () => {
                toast.success("Familia actualizada correctamente");
            },
            onError: () => {
                toast.error("Error al actualizar la familia");
            },
        });
    };
    return (
        <>
            <div className="">
                <Card className="shadow-sm border-slate-200">
                    <CardHeader className="border-b bg-slate-50/50">
                        <CardTitle className="text-xl font-bold text-slate-800">
                            Editar : {family.name}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="name"
                                    className={
                                        errors.name ? "text-destructive" : ""
                                    }
                                >
                                    Nombre de la Familia
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Ingrese el nombre de la familia"
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

                            {/* Botones de Acción */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        router.get(
                                            route("admin.families.index")
                                        )
                                    }
                                    disabled={processing}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Actualizar Familia
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
    const { family } = page.props as Props;
    return (
        <Authenticated
            title="Editar Familia"
            breadcrumbs={createBreadcrumbs()
                .add("Dashboard", route("admin.dashboard"))
                .add("Familias", route("admin.families.index"))
                .add(`${family.name}`)
                .toArray()}
        >
            {page}
        </Authenticated>
    );
};

export default Edit;
