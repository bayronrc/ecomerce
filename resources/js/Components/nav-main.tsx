import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { Link } from "@inertiajs/react";
import { type LucideIcon } from "lucide-react";

export function NavMain({
    items,
}: {
    items: {
        name: string;
        url: string;
        icon?: LucideIcon;
        active: boolean;
    }[];
}) {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item) => (
                        <Link key={item.name} href={item.url}>
                            <SidebarMenuItem
                                className={
                                    item.active
                                        ? "bg-primary/10 text-primary font-semibold border-1-4 border-primary"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                }
                            >
                                <SidebarMenuButton tooltip={item.name}>
                                    {item.icon && <item.icon />}
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
