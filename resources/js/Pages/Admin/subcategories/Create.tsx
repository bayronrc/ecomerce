import { createBreadcrumbs } from "@/helpers/breadcrumbs";
import Authenticated from "@/Layouts/AdminLayout";
import { PageWithLayout } from "@/types";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

const Create: PageWithLayout = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.families.store"), {
            onSuccess: () => {
                toast.success("Familia creada correctamente");
            },
            onError: () => {
                toast.error("Error al crear la familia");
            },
        });
    };

    return <>Aqui va el form del Subcategoria</>;
};

Create.layout = (page) => {
    return (
        <Authenticated
            header="Crear Nueva Subcategoria"
            breadcrumbs={createBreadcrumbs()
                .add("Dashboard", route("admin.dashboard"))
                .add("Subcategorias", route("admin.subcategories.index"))
                .add("Nuevo")
                .toArray()}
            children={page}
        />
    );
};

export default Create;
