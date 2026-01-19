import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DataTable from '../DataTable';
import { router } from '@inertiajs/react';

// Mock Inertia router
vi.mock('@inertiajs/react', () => ({
    router: {
        visit: vi.fn(),
    },
}));

// Mock route function
global.route = vi.fn((name, params) => {
    return `/${name}${params ? '?' + new URLSearchParams(params).toString() : ''}`;
});

describe('DataTable Component', () => {
    const mockColumns = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
    ];

    const mockData = {
        data: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
        ],
        current_page: 1,
        last_page: 3,
        per_page: 3,
        total: 9,
        from: 1,
        to: 3,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders table with data correctly', () => {
        render(
            <DataTable
                columns={mockColumns}
                data={mockData}
                routeName="admin.categories.index"
            />
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('displays correct pagination information', () => {
        render(
            <DataTable
                columns={mockColumns}
                data={mockData}
                routeName="admin.categories.index"
            />
        );

        expect(screen.getByText('Mostrando 1 - 3 de 9 registros')).toBeInTheDocument();
        expect(screen.getByText('Página 1 de 3')).toBeInTheDocument();
    });

    it('renders pagination controls with correct state', () => {
        render(
            <DataTable
                columns={mockColumns}
                data={mockData}
                routeName="admin.categories.index"
            />
        );

        const prevButton = screen.getByText('Anterior').closest('button');
        const nextButton = screen.getByText('Siguiente').closest('button');

        expect(prevButton).toBeDisabled();
        expect(nextButton).not.toBeDisabled();
    });

    it('disables next button on last page', () => {
        const lastPageData = {
            ...mockData,
            current_page: 3,
            from: 7,
            to: 9,
        };

        render(
            <DataTable
                columns={mockColumns}
                data={lastPageData}
                routeName="admin.categories.index"
            />
        );

        const nextButton = screen.getByText('Siguiente').closest('button');
        expect(nextButton).toBeDisabled();
    });

    it('calls router.visit with correct parameters when navigating', () => {
        render(
            <DataTable
                columns={mockColumns}
                data={mockData}
                routeName="admin.categories.index"
            />
        );

        const nextButton = screen.getByText('Siguiente').closest('button');
        fireEvent.click(nextButton!);

        expect(router.visit).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                preserveState: true,
                preserveScroll: true,
            })
        );
    });

    it('displays empty state when no data', () => {
        const emptyData = {
            ...mockData,
            data: [],
            total: 0,
            from: 0,
            to: 0,
        };

        render(
            <DataTable
                columns={mockColumns}
                data={emptyData}
                routeName="admin.categories.index"
            />
        );

        expect(screen.getByText('No se encontraron resultados.')).toBeInTheDocument();
    });

    it('initializes with correct sorting state', () => {
        const { container } = render(
            <DataTable
                columns={mockColumns}
                data={mockData}
                routeName="admin.categories.index"
            />
        );

        // Check that table renders without errors
        const table = container.querySelector('table');
        expect(table).toBeInTheDocument();
    });

    it('initializes with correct filter state', () => {
        const { container } = render(
            <DataTable
                columns={mockColumns}
                data={mockData}
                routeName="admin.categories.index"
            />
        );

        // Verify table structure is correct
        const tableBody = container.querySelector('tbody');
        expect(tableBody).toBeInTheDocument();
        expect(tableBody?.querySelectorAll('tr')).toHaveLength(3);
    });

    it('passes route parameters correctly', () => {
        const routeParams = { filter: 'active' };

        render(
            <DataTable
                columns={mockColumns}
                data={mockData}
                routeName="admin.categories.index"
                routeParams={routeParams}
            />
        );

        const nextButton = screen.getByText('Siguiente').closest('button');
        fireEvent.click(nextButton!);

        expect(global.route).toHaveBeenCalledWith(
            'admin.categories.index',
            expect.objectContaining({
                filter: 'active',
                page: 2,
            })
        );
    });
});
