import Authenticated from "@/Layouts/AdminLayout";
import { createBreadcrumbs } from "@/helpers/breadcrumbs";
import { Family, PageProps, Pagninated } from "@/types";
import { usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

export default function Index() {
    const breadcrumbs = createBreadcrumbs()
        .add("Dashboard", route("admin.dashboard"))
        .add("Familias", route("admin.families.index"))
        .toArray();

    const { families } =
        usePage<PageProps<{ families: Pagninated<Family> }>>().props;

    console.log(families);
    return <Authenticated breadcrumbs={breadcrumbs}></Authenticated>;
}
