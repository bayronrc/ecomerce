import DataTableFamilies from "@/Components/DataTable";
import Authenticated from "@/Layouts/AdminLayout";
import { createBreadcrumbs } from "@/helpers/breadcrumbs";
import { Family } from "@/types";
import { columns } from "./columns";

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
            <DataTableFamilies
                columns={columns}
                data={families}
                routeName="admin.families.index"
            />
        </Authenticated>
    );
}
