type SortOrder = 'asc' | 'desc';

export const sortData = <T>(array: T[], column: keyof T, order: SortOrder = 'asc'): T[] => {
    return array.sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];

        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return order === 'asc' ? -1 : 1;
        if (bValue == null) return order === 'asc' ? 1 : -1;

        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
        return 0;
    });
};
