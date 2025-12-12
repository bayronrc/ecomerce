import type { Breadcrumb as BreadcrumbItemType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export interface Breadcrumb {
    label: string;
    href?: string;
}

type AuthenticatedLayoutProps = PropsWithChildren<{
    breadcrumbs?: BreadcrumbItemType[];
    title?: string;
}>;

export type Pagninated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: [
        {
            url: string | null;
            label: string;
            active: boolean;
        }
    ];
};

export type Family = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}
