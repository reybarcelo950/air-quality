import React, {memo} from 'react';
import {Typography} from "@mui/material";
import AreaContainer from "../AreaContainer";
import DataTable from "../DataTable";
import useDataListMetrics from "../../hooks/useDataListMetrics";
import {useFilter} from "../../providers/FilterProvider";
import {TABLE_COLUMNS} from "../../constants";
import TableProvider from "../../providers/TableProvider";
import VisibilityMenu from "../DataTable/VisibilityMenu";

const DataListSection = () => {
    const {filters} = useFilter()
    const {isLoading, data} = useDataListMetrics(filters)

    return (
        <TableProvider columns={TABLE_COLUMNS}>
            <AreaContainer className="gap-4 flex flex-col py-4">
                <div className="flex md:items-center md:justify-between w-full md:flex-row flex-col">
                    <Typography className="text-gray-600 mt-1 text-lg">
                        Historical Data
                    </Typography>
                    <VisibilityMenu/>
                </div>
                <DataTable data={data} isLoading={isLoading}/>
            </AreaContainer>
        </TableProvider>
    );
};

export default memo(DataListSection);
