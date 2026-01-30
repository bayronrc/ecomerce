import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { createBreadcrumbs } from "@/helpers/breadcrumbs";
import Authenticated from "@/Layouts/AdminLayout";
import { Family, PageWithLayout } from "@/types";
import { useForm } from "@inertiajs/react";
import { Loader2, Save } from "lucide-react";
import { Label } from "recharts";
import { toast } from "sonner";

interface Props {
    families: Family[];
}

const Create: PageWithLayout<Props> = ({ families }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.categories.store"), {
            onSuccess: () => {
                toast.success("Categoria creada correctamente");
            },
            onError: () => {
                toast.error("Error al crear la Categoria");
            },
        });
    };
    return (
        <>
            <div className="">
                <Card className="shadow-sm border-slate-200">
                    <CardHeader className="border-b bg-slate-50/50">
                        <CardTitle className="text-xl font-bold text-slate-800">
                            Crear Nueva Categoria
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2 flex flex-col">
                                <Label
                                    className={
                                        errors.name ? "text-destructive" : ""
                                    }
                                >
                                    Nombre de la Familia
                                </Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value="apple">
                                                Apple
                                            </SelectItem>
                                            <SelectItem value="banana">
                                                Banana
                                            </SelectItem>
                                            <SelectItem value="blueberry">
                                                Blueberry
                                            </SelectItem>
                                            <SelectItem value="grapes">
                                                Grapes
                                            </SelectItem>
                                            <SelectItem value="pineapple">
                                                Pineapple
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.name && (
                                    <p className="text-sm font-medium text-destructive">
                                        {errors.name}
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
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Crear Catgoria
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
                .add("Categorias", route("admin.categories.index"))
                .add("Nuevo")
                .toArray()}
            children={page}
        />
    );
};

export default Create;
