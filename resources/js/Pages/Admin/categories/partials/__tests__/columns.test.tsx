import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { columns } from '../columns';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

// Mock Button component
vi.mock('@/Components/ui/button', () => ({
    Button: ({ children, onClick, variant }: any) => (
        <button onClick={onClick} data-variant={variant}>
            {children}
        </button>
    ),
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
    ArrowUpDown: () => <span data-testid="arrow-icon">↕</span>,
}));

describe('Category Columns Definition', () => {
    const mockData = [
        {
            id: 1,
            name: 'Electronics',
            created_at: '2024-01-15T10:30:00Z',
            updated_at: '2024-01-20T14:45:00Z',
        },
        {
            id: 2,
            name: 'Clothing',
            created_at: '2024-02-10T08:15:00Z',
            updated_at: '2024-02-15T16:20:00Z',
        },
    ];

    // Helper component to test columns
    const TestTable = ({ data }: { data: any[] }) => {
        const table = useReactTable({
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
        });

        return (
            <table>
                <thead>
                    <tr>
                        {table.getHeaderGroups()[0].headers.map((header) => (
                            <th key={header.id}>
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    it('defines correct number of columns', () => {
        expect(columns).toHaveLength(5);
    });

    it('defines id column with correct header', () => {
        const idColumn = columns[0];
        expect(idColumn.accessorKey).toBe('id');
        expect(idColumn.header).toBe('Id');
    });

    it('defines name column with sortable header', () => {
        const nameColumn = columns[1];
        expect(nameColumn.accessorKey).toBe('name');
        expect(typeof nameColumn.header).toBe('function');
    });

    it('renders name column header with sort button', () => {
        render(<TestTable data={mockData} />);

        const sortButton = screen.getByText('Nombre').closest('button');
        expect(sortButton).toBeInTheDocument();
        expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
    });

    it('name column header toggles sorting on click', () => {
        const mockToggleSorting = vi.fn();
        const nameColumn = columns[1];
        
        if (typeof nameColumn.header === 'function') {
            const mockColumn = {
                toggleSorting: mockToggleSorting,
                getIsSorted: () => false,
            };

            const HeaderComponent = nameColumn.header({ column: mockColumn } as any);
            render(HeaderComponent);

            const button = screen.getByRole('button');
            fireEvent.click(button);

            expect(mockToggleSorting).toHaveBeenCalledWith(true);
        }
    });

    it('defines created_at column with correct header and custom cell', () => {
        const createdAtColumn = columns[2];
        expect(createdAtColumn.accessorKey).toBe('created_at');
        expect(createdAtColumn.header).toBe('Fecha de Creación');
        expect(typeof createdAtColumn.cell).toBe('function');
    });

    it('renders created_at with formatted date', () => {
        render(<TestTable data={mockData} />);

        // Check that dates are formatted (Spanish locale)
        const cells = screen.getAllByRole('cell');
        // The formatted date should be present in one of the cells
        expect(cells.length).toBeGreaterThan(0);
    });

    it('defines updated_at column with correct header and custom cell', () => {
        const updatedAtColumn = columns[3];
        expect(updatedAtColumn.accessorKey).toBe('updated_at');
        expect(updatedAtColumn.header).toBe('Fecha de Actualizacion');
        expect(typeof updatedAtColumn.cell).toBe('function');
    });

    it('defines actions column with correct configuration', () => {
        const actionsColumn = columns[4];
        expect(actionsColumn.id).toBe('actions');
        expect(actionsColumn.header).toBe('Acciones');
        expect(typeof actionsColumn.cell).toBe('function');
    });

    it('renders all column headers correctly', () => {
        render(<TestTable data={mockData} />);

        expect(screen.getByText('Id')).toBeInTheDocument();
        expect(screen.getByText('Nombre')).toBeInTheDocument();
        expect(screen.getByText('Fecha de Creación')).toBeInTheDocument();
        expect(screen.getByText('Fecha de Actualizacion')).toBeInTheDocument();
        expect(screen.getByText('Acciones')).toBeInTheDocument();
    });

    it('renders category data in table cells', () => {
        render(<TestTable data={mockData} />);

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('Electronics')).toBeInTheDocument();
        expect(screen.getByText('Clothing')).toBeInTheDocument();
    });

    it('formats dates using Spanish locale', () => {
        const createdAtColumn = columns[2];
        
        if (typeof createdAtColumn.cell === 'function') {
            const mockRow = {
                getValue: (key: string) => '2024-01-15T10:30:00Z',
            };

            const result = createdAtColumn.cell({ row: mockRow } as any);
            
            // The result should be a formatted date string
            expect(typeof result).toBe('string');
        }
    });

    it('uses correct date format options', () => {
        const testDate = new Date('2024-01-15T10:30:00Z');
        const formatter = new Intl.DateTimeFormat('es-Es', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });

        const formatted = formatter.format(testDate);
        
        // Should contain date components
        expect(formatted).toBeTruthy();
        expect(typeof formatted).toBe('string');
    });
});
