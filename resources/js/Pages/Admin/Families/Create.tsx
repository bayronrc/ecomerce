import { createBreadcrumbs } from "@/helpers/breadcrumbs";
import Authenticated from "@/Layouts/AdminLayout"; // Tu layout de Admin
import { Head } from "@inertiajs/react";

export default function Create() {
    return (
        <Authenticated
            title="Crear Nueva Familia"
            breadcrumbs={createBreadcrumbs()
                .add("Dashboard", route("admin.dashboard"))
                .add("Familias", route("admin.families.index"))
                .add("Create")
                .toArray()}
        >
            <Head title="Create Family" />

            <div className="p-6 bg-white shadow rounded-lg">
                <h1 className="text-xl font-bold mb-4">
                    Formulario de Creación
                </h1>
                <p>Aquí irá tu formulario pronto...</p>
            </div>
        </Authenticated>
    );
}
