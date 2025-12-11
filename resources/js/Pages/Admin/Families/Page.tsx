import Authenticated from "../../../Layouts/AdminLayout";
import { createBreadcrumbs } from "../../../helpers/breadcrumbs";

export default function Page() {
    const breadcrumbs = createBreadcrumbs()
        .add("Dashboard", route("admin.dashboard"))
        .add("Families", route("admin.families.index"))
        .toArray();

    return <Authenticated breadcrumbs={breadcrumbs}></Authenticated>;
}
