import { Head, Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { AppSidebar } from "../Components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../Components/ui/breadcrumb";
import { Separator } from "../Components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "../Components/ui/sidebar";

interface AuthenticatedLayoutProps extends PropsWithChildren {
    breadcrumbs?: { label: string; href?: string }[];
}

export default function Authenticated({
    children,
    breadcrumbs,
}: AuthenticatedLayoutProps) {
    return (
        <SidebarProvider>
            <Head title="Admin Dashboard" />
            <AppSidebar />

            <SidebarInset>
                <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="flex items-center gap-2 px-4 w-full">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />

                        {breadcrumbs && breadcrumbs.length > 0 && (
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbs.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center"
                                        >
                                            <BreadcrumbItem>
                                                {item.href &&
                                                index !==
                                                    breadcrumbs.length - 1 ? (
                                                    <BreadcrumbLink asChild>
                                                        <Link href={item.href}>
                                                            {item.label}
                                                        </Link>
                                                    </BreadcrumbLink>
                                                ) : (
                                                    <BreadcrumbPage>
                                                        {item.label}
                                                    </BreadcrumbPage>
                                                )}
                                            </BreadcrumbItem>
                                            {index < breadcrumbs.length - 1 && (
                                                <BreadcrumbSeparator />
                                            )}
                                        </div>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        )}
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
