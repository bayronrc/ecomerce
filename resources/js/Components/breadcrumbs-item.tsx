import type { Breadcrumb as Breadcrumbs } from "@/types";
import { Link } from "@inertiajs/react";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";

type Props = {
    breadcrumbs: Breadcrumbs[];
    maxItems?: number;
};

export default function BreadCrumbItem({
    breadcrumbs: items,
    maxItems = 5,
}: Props) {
    if (items.length === 0) return null;

    const shouldTruncate = maxItems > 0 && items.length > maxItems;
    const displayedItems = shouldTruncate
        ? [items[0], { label: "...", href: undefined }, ...items.slice(-2)]
        : items;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {displayedItems.map((item, index, array) => {
                    const isLast = index === array.length - 1;
                    const isEllipsis = item.label === "...";

                    return (
                        <div key={index} className="flex items-center">
                            <BreadcrumbItem className="mr-2">
                                {isEllipsis ? (
                                    <BreadcrumbEllipsis />
                                ) : item.href && !isLast ? (
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
                            {!isLast && <BreadcrumbSeparator />}
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
