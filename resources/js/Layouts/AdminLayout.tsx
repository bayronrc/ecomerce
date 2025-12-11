// resources/js/Layouts/AuthenticatedLayout.tsx
import { AppSidebar } from "@/Components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Separator } from "@/Components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import { Head, Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

// Importamos el tipo correctamente (sin colisionar con el componente)
import type { Breadcrumb as BreadcrumbItemType } from "@/types";

type AuthenticatedLayoutProps = PropsWithChildren<{
    breadcrumbs?: BreadcrumbItemType[];
    title?: string;
}>;

export default function AuthenticatedLayout({
    children,
    breadcrumbs = [],
    title = "Dashboard",
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

                        {/* Breadcrumbs */}
                        {breadcrumbs.length > 0 && (
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbs.map((item, index) => {
                                        const isLast =
                                            index === breadcrumbs.length - 1;

                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center"
                                            >
                                                <BreadcrumbItem>
                                                    {item.href && !isLast ? (
                                                        <BreadcrumbLink asChild>
                                                            <Link
                                                                href={item.href}
                                                                className="transition-colors hover:text-foreground"
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        </BreadcrumbLink>
                                                    ) : (
                                                        <BreadcrumbPage>
                                                            {item.label}
                                                        </BreadcrumbPage>
                                                    )}
                                                </BreadcrumbItem>
                                                {!isLast && (
                                                    <BreadcrumbSeparator />
                                                )}
                                            </div>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        )}
                    </div>
                </header>

                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
