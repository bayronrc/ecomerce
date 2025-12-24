import DataTableFamilies from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import Authenticated from "@/Layouts/AdminLayout";
import { createBreadcrumbs } from "@/helpers/breadcrumbs";
import { Breadcrumb, Family, PageWithLayout } from "@/types";
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

const Index: PageWithLayout<Props> = ({ families }) => {
    return (
        <>
            <div className="flex justify-end mb-4">
                <Button variant={"default"} asChild>
                    <Link href={route("admin.families.create")}>
                        Nueva Familia
                    </Link>
                </Button>
            </div>

            <DataTableFamilies
                columns={columns}
                data={families}
                routeName="admin.families.index"
            />
        </>
    );
};

Index.layout = (page) => {
    const breadcrumbs: Breadcrumb[] = createBreadcrumbs()
        .add("Dashboard", route("admin.dashboard"))
        .add("Familias", route("admin.families.index"))
        .toArray();
    return (
        <Authenticated
            children={page}
            title="Familias"
            breadcrumbs={breadcrumbs}
        />
    );
};

export default Index;
