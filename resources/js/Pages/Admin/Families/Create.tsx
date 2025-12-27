import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { createBreadcrumbs } from "@/helpers/breadcrumbs";
import Authenticated from "@/Layouts/AdminLayout";
import { PageWithLayout } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { Loader2, Save, X } from "lucide-react";

const Create: PageWithLayout = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Laravel 12 / Inertia post
        post(route("admin.families.store"));
    };
    return (
        <>
            <div className="">
                <Card className="shadow-sm border-slate-200">
                    <CardHeader className="border-b bg-slate-50/50">
                        <CardTitle className="text-xl font-bold text-slate-800">
                            Información de la Familia
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Campo: Nombre */}
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
                                    placeholder="Ej: Familia García Pérez"
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
                            <div className="flex items-center justify-end gap-3 pt-4 border-t">
                                <Button
                                    variant="ghost"
                                    asChild
                                    disabled={processing}
                                >
                                    <Link href={route("admin.families.index")}>
                                        <X className="w-4 h-4 mr-2" />
                                        Cancelar
                                    </Link>
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
                                            Crear Familia
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

Create.layout = (page) => {
    return (
        <Authenticated
            title="Crear Nueva Familia"
            breadcrumbs={createBreadcrumbs()
                .add("Dashboard", route("admin.dashboard"))
                .add("Familias", route("admin.families.index"))
                .add("Nuevo")
                .toArray()}
            children={page}
        />
    );
};

export default Create;
