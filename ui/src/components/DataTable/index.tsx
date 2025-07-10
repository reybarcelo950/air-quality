import React, {ReactNode, useMemo, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import LoadingRows from './LoadingRows';
import {TABLE_ROWS_PER_PAGE} from "../../constants";
import {useTable} from "../../providers/TableProvider";

export type ColumnTable = {
    field: string;
    align: "center" | "left" | "right" | "justify" | "inherit" | undefined
    headerName: string
    render?: (value: any, field: string) => ReactNode
}

type DataTableProps = {
    dense?: boolean,
    isLoading?: boolean,
    data: any[]
}

const InsideTable = ({children, dense, columns, emptyRows}: {
    emptyRows: number,
    children: ReactNode,
    columns?: ColumnTable[]
} & Partial<DataTableProps>) => {
    return (
        <TableContainer component={Paper}>
            <Table className="w-full" stickyHeader aria-label="sticky table" size={dense ? 'small' : 'medium'}>
                <TableHead>
                    <TableRow>
                        {columns?.map(({headerName, ...rest}) => (<TableCell {...rest} className="!font-bold">
                            {headerName}
                        </TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {children}
                    {emptyRows > 0 && (
                        <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                            <TableCell colSpan={columns?.length}/>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const DataTable = ({data = [], isLoading, dense}: DataTableProps) => {
    const {visibleColumns: columns, isVisible} = useTable()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(TABLE_ROWS_PER_PAGE);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const rows = useMemo(() => {
        return rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
    }, [data, page, rowsPerPage]);

    const emptyRows = page > 0 ? Math.max(0, rows.length - rowsPerPage) : 0;

    if (!isLoading && !data?.length) {
        return (
            <InsideTable columns={columns} emptyRows={emptyRows} dense={dense}>
                <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                    <TableCell colSpan={columns?.length} align="center">
                        No results found.
                    </TableCell>
                </TableRow>
            </InsideTable>
        );
    }

    return (
        <>
            <InsideTable columns={columns} dense={dense} emptyRows={emptyRows}>
                {isLoading && (
                    <LoadingRows headCellsSize={columns?.length}/>
                )}
                {!isLoading && rows?.map((row, index) => (
                    <TableRow
                        key={index}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        {columns?.map(({headerName, field, render, ...rest}) => {
                            return (<TableCell component="th" scope="row" {...rest}>
                                {render ? render(row, field) : row?.[field]}
                            </TableCell>)
                        })}
                    </TableRow>
                ))}
            </InsideTable>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, {label: 'All', value: -1}]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

export default DataTable;
