import { Button } from "@/Components/ui/button";
import { createBreadcrumbs } from "@/helpers/breadcrumbs";
import AuthenticatedLayout from "@/Layouts/AdminLayout";
import { Breadcrumb, Category, PageWithLayout } from "@/types";
import { Link } from "@inertiajs/react";
import { DataTable, DataTableFooter } from "@wandry/inertia-table";
import { columns } from "./partials/columns";

interface Props {
    categories: {
        data: Category[];
        per_page: number;
        current_page: number;
        last_page: number;
        from: number;
        links: [];
        path: string;
        to: number;
        total: number;
        date: string;
    };
}
const Index: PageWithLayout<Props> = ({ categories }) => {
    return (
        <>
            <div className="flex justify-end">
                <Button variant={"default"} asChild>
                    <Link href={route("admin.categories.create")}>
                        Nueva Categoria
                    </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={categories.data} />
            <DataTableFooter pagination={categories} />
        </>
    );
};

Index.layout = (page) => {
    const breadcrumbs: Breadcrumb[] = createBreadcrumbs()
        .add("Dashboard", route("admin.dashboard"))
        .add("Categorias", route("admin.categories.index"))
        .toArray();
    return (
        <AuthenticatedLayout
            children={page}
            title="Categorias"
            breadcrumbs={breadcrumbs}
        />
    );
};

export default Index;
