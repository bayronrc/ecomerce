import { createBreadcrumbs } from "@/helpers/breadcrumbs";
import { Breadcrumb, PageWithLayout } from "@/types";
import AuthenticatedLayout from "../../../Layouts/AdminLayout";

const Index: PageWithLayout = () => {
    return (
        <>
            <h1>Aqui van las categories</h1>
        </>
    );
};

Index.layout = (page) => {
    const breadcrumbs: Breadcrumb[] = createBreadcrumbs()
        .add("Dashboard", route("admin.dashboard"))
        .add("Categorias", route("admin.categories.index"))
        .toArray();
    return (
        <AuthenticatedLayout title="Categorias" breadcrumbs={breadcrumbs}>
            {page}
        </AuthenticatedLayout>
    );
};

export default Index;
