import Authenticated from "@/Layouts/AdminLayout";
import { createBreadcrumbs } from "@/helpers/breadcrumbs";
import { columns } from "./columns";
import DataTableFamilies from "./data-table";

export default function Index() {
    const breadcrumbs = createBreadcrumbs()
        .add("Dashboard", route("admin.dashboard"))
        .add("Familias", route("admin.families.index"))
        .toArray();

    return (
        <Authenticated breadcrumbs={breadcrumbs}>
            <DataTableFamilies columns={columns} />
        </Authenticated>
    );
}
