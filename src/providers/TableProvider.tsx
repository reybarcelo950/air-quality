import {createContext, memo, useContext, useMemo, useState} from 'react';
import {ColumnTable} from "../components/DataTable";

type FilterContextType = {
    columns: ColumnTable[]
    visibleColumns: ColumnTable[]
};

const TableContext = createContext<Partial<FilterContextType>>({});

const TableProvider = ({children, columns}: { children: any, columns: ColumnTable[] }) => {
    const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

    const visibleColumns = useMemo(
        () =>
            columns.filter((column: ColumnTable) => {
                return isVisible[column.field] ?? true;
            }),
        [columns],
    );

    return (
        <TableContext.Provider value={{
            columns,
            visibleColumns
        }}>
            {children}
        </TableContext.Provider>
    );
};

export default memo(TableProvider);

export function useTable() {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('useTable must be used within TableProvider');
    }
    return context;
}
