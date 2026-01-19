import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Index from '../Index';

// Mock dependencies
vi.mock('@inertiajs/react', () => ({
    Link: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock('@wandry/inertia-table', () => ({
    DataTable: ({ columns, data }: any) => (
        <div data-testid="data-table">
            <table>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ),
    DataTableFooter: ({ pagination }: any) => (
        <div data-testid="data-table-footer">
            <span>Page {pagination.current_page} of {pagination.last_page}</span>
            <span>Total: {pagination.total}</span>
        </div>
    ),
}));

vi.mock('../partials/columns', () => ({
    columns: [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'name', header: 'Name' },
    ],
}));

global.route = vi.fn((name: string) => `/${name.replace('.', '/')}`);

describe('Categories Index Page', () => {
    const mockCategories = {
        data: [
            { id: 1, name: 'Category 1', created_at: '2024-01-01', updated_at: '2024-01-01' },
            { id: 2, name: 'Category 2', created_at: '2024-01-02', updated_at: '2024-01-02' },
            { id: 3, name: 'Category 3', created_at: '2024-01-03', updated_at: '2024-01-03' },
        ],
        per_page: 15,
        current_page: 1,
        last_page: 1,
        from: 1,
        to: 3,
        total: 3,
        links: [],
        path: '/admin/categories',
        date: '2024-01-01',
    };

    it('renders DataTable with categories data', () => {
        render(<Index categories={mockCategories} />);

        const dataTable = screen.getByTestId('data-table');
        expect(dataTable).toBeInTheDocument();

        // Check that categories are rendered
        expect(screen.getByText('Category 1')).toBeInTheDocument();
        expect(screen.getByText('Category 2')).toBeInTheDocument();
        expect(screen.getByText('Category 3')).toBeInTheDocument();
    });

    it('renders pagination footer with correct data', () => {
        render(<Index categories={mockCategories} />);

        const footer = screen.getByTestId('data-table-footer');
        expect(footer).toBeInTheDocument();

        expect(screen.getByText(/Page 1 of 1/)).toBeInTheDocument();
        expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
    });

    it('renders create category button', () => {
        render(<Index categories={mockCategories} />);

        const createButton = screen.getByText('Nueva Categoria');
        expect(createButton).toBeInTheDocument();
        expect(createButton.closest('a')).toHaveAttribute('href', '/admin/categories/create');
    });

    it('passes correct pagination data to footer', () => {
        const paginatedCategories = {
            ...mockCategories,
            per_page: 10,
            current_page: 2,
            last_page: 5,
            total: 50,
        };

        render(<Index categories={paginatedCategories} />);

        expect(screen.getByText(/Page 2 of 5/)).toBeInTheDocument();
        expect(screen.getByText(/Total: 50/)).toBeInTheDocument();
    });

    it('renders with empty categories list', () => {
        const emptyCategories = {
            ...mockCategories,
            data: [],
            total: 0,
            from: 0,
            to: 0,
        };

        render(<Index categories={emptyCategories} />);

        const dataTable = screen.getByTestId('data-table');
        expect(dataTable).toBeInTheDocument();
        
        // DataTable should still render but with no rows
        const tbody = dataTable.querySelector('tbody');
        expect(tbody?.children.length).toBe(0);
    });

    it('displays correct number of categories', () => {
        render(<Index categories={mockCategories} />);

        const dataTable = screen.getByTestId('data-table');
        const rows = dataTable.querySelectorAll('tbody tr');
        
        expect(rows.length).toBe(3);
    });
});
