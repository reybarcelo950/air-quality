import React, {memo} from 'react';
import {Typography} from "@mui/material";
import AreaContainer from "../AreaContainer";
import DataTable from "../DataTable";
import useDataListMetrics from "../../hooks/useDataListMetrics";
import {useFilter} from "../../providers/FilterProvider";
import {TABLE_COLUMNS} from "../../constants";
import TableProvider from "../../providers/TableProvider";

const DataListSection = () => {
    const {filters} = useFilter()
    const {isLoading, data} = useDataListMetrics(filters)

    return (
        <AreaContainer className="gap-4 flex flex-col py-4">
            <div className="flex md:items-center md:justify-between w-full md:flex-row flex-col">
                <Typography className="text-gray-600 mt-1 text-lg">
                    Historical Data
                </Typography>
            </div>
            <TableProvider columns={TABLE_COLUMNS}>
                <DataTable data={data} isLoading={isLoading}/>
            </TableProvider>
        </AreaContainer>
    );
};

export default memo(DataListSection);
