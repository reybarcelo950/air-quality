import {createContext, Dispatch, memo, SetStateAction, useContext, useMemo, useState} from 'react';
import {ColumnTable} from "../components/DataTable";

type FilterContextType = {
    isVisible: Record<string, boolean>
    columns: ColumnTable[]
    visibleColumns: ColumnTable[],
    setIsVisible: Dispatch<SetStateAction<Record<string, boolean>>>;
};

const TableContext = createContext<Partial<FilterContextType>>({});

const TableProvider = ({children, columns}: { children: any, columns: ColumnTable[] }) => {
    const [isVisible, setIsVisible] = useState<Record<string, boolean>>({
        T: false,
        RH: false,
        AH: false,
    });

    const visibleColumns = useMemo(
        () =>
            columns.filter((column: ColumnTable) => {
                return isVisible[column.field] ?? true;
            }),
        [columns, isVisible],
    );

    return (
        <TableContext.Provider value={{
            columns,
            visibleColumns,
            isVisible,
            setIsVisible
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
