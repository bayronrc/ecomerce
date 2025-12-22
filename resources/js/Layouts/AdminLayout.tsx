// resources/js/Layouts/AuthenticatedLayout.tsx
import { AppSidebar } from "@/Components/app-sidebar";
import { Separator } from "@/Components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import { Head } from "@inertiajs/react";
import BreadCrumbItem from "../Components/breadcrumbs-item";
import { AuthenticatedLayoutProps } from "../types";

export default function AuthenticatedLayout({
    children,
    breadcrumbs = [],
    title,
}: AuthenticatedLayoutProps) {
    return (
        <SidebarProvider>
            <Head title={title} />

            <AppSidebar />

            <SidebarInset>
                <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="flex items-center gap-2 px-4 w-full">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <BreadCrumbItem breadcrumbs={breadcrumbs} />
                    </div>
                </header>

                <main className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
