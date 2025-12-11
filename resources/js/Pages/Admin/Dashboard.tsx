import { usePage } from "@inertiajs/react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { createBreadcrumbs } from "../../helpers/breadcrumbs";
import Authenticated from "../../Layouts/AdminLayout";
import { Breadcrumb, User } from "../../types";

const getInitials = (name: string): string => {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
};

export default function Dashboard() {
    const user: User = usePage().props.auth.user;
    const initials = getInitials(user.name);

    const breadcrumbs: Breadcrumb[] = createBreadcrumbs()
        .add("Dashboard", route("admin.dashboard"))
        .toArray();

    return (
        <Authenticated breadcrumbs={breadcrumbs}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-4 w-full">
                    <div className="flex items-center">
                        <Avatar>
                            <AvatarFallback className="bg-black size-10 text-white flex items-center justify-center text-xl font-bold rounded-full">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 flex flex-auto justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Bienvenido, {user.name.split(" ")[0]}
                            </h2>
                            <button className="text-sm p-4 shadow-md rounded-lg hover:bg-zinc-500 hover:text-white">
                                Cerrrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6"></div>
            </div>
        </Authenticated>
    );
}
