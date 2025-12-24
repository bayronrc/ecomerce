import { Card, CardHeader, CardTitle } from "@/Components/ui/card";
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
                .add("Nuevo")
                .toArray()}
        >
            <Head title="Create Family" />

            <Card className="p-6 bg-white shadow rounded-lg">
                <CardHeader>
                    <CardTitle>Crear Nueva Familia</CardTitle>
                </CardHeader>
            </Card>
        </Authenticated>
    );
}
