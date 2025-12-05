import { ArrowUpCircleIcon, PieChart, User2 } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/Components/nav-main";
import { NavUser } from "@/Components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { User } from "@/types";
import { usePage } from "@inertiajs/react";

const data = [
    {
        name: "Dashboard",
        url: route("admin.dashboard"),
        icon: PieChart,
        active: route().current("admin.dashboard"),
    },
    {
        name: "Perfil",
        url: route("profile.edit"),
        icon: User2,
        active: route().current("profile.edit"),
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user: User = usePage().props.auth.user;
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href={route("admin.dashboard")}>
                                <ArrowUpCircleIcon className="h-5 w-5" />
                                <span className="text-base font-semibold">
                                    Ecomerce
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
