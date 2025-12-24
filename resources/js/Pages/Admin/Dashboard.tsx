import { Button } from "@/Components/ui/button";
import Authenticated from "@/Layouts/AdminLayout";
import { Breadcrumb, PageWithLayout, User } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { createBreadcrumbs } from "../../helpers/breadcrumbs";

const getInitials = (name: string): string => {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
};

const Dashboard: PageWithLayout = () => {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const user = auth.user;

    const initials = getInitials(user.name);

    const handleLogout = () => {
        router.post(route("logout"));
    };

    return (
        <>
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card de Bienvenida */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarFallback className="bg-black size-10 text-white flex items-center justify-center text-xl font-bold rounded-full">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Bienvenido, {user.name.split(" ")[0]}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Qué bueno verte de nuevo.
                                </p>
                            </div>
                        </div>

                        <Button onClick={handleLogout} variant={"outline"}>
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

Dashboard.layout = (page) => {
    const breadcrumbs: Breadcrumb[] = createBreadcrumbs()
        .add("Dashboard", route("admin.dashboard"))
        .toArray();
    return (
        <Authenticated
            children={page}
            title="Dashboard"
            breadcrumbs={breadcrumbs}
        />
    );
};

export default Dashboard;
