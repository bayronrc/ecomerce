import { usePage } from "@inertiajs/react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import Authenticated from "../../Layouts/AdminLayout";
import { User } from "../../types";

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
    return (
        <Authenticated>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-4 w-full">
                    <div className="flex items-center">
                        <Avatar>
                            <AvatarFallback className="bg-black size-10 text-white flex items-center justify-center text-xl font-bold rounded-full">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 flex-1">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Bienvenido, {user.name.split(" ")[0]}
                            </h2>
                            <button className="text-sm hover:text-blue-500">
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
