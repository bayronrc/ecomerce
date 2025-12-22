import DataTableFamilies from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import Authenticated from "@/Layouts/AdminLayout";
import { createBreadcrumbs } from "@/helpers/breadcrumbs";
import { Family } from "@/types";
import { Link } from "@inertiajs/react";
import { columns } from "./partials/columns";

interface Props {
    families: {
        data: Family[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
}

export default function Index({ families }: Props) {
    const breadcrumbs = createBreadcrumbs()
        .add("Dashboard", route("admin.dashboard"))
        .add("Familias", route("admin.families.index"))
        .toArray();

    return (
        <Authenticated title={"Familias"} breadcrumbs={breadcrumbs}>
            <div className="flex justify-end mb-4">
                <Button variant={"default"} asChild>
                    <Link href={route("admin.families.create")}>
                        Crear Familia
                    </Link>
                </Button>
            </div>

            <DataTableFamilies
                columns={columns}
                data={families}
                routeName="admin.families.index"
            />
        </Authenticated>
    );
}
