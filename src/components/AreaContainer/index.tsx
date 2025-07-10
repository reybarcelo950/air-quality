import React, {memo} from 'react';
import {Paper} from '@mui/material';
import {cx} from "../../utils";

interface AreaContainerProps {
    children: React.ReactNode;
    className?: string;
}

const AreaContainer = ({children, className, ...rest}: AreaContainerProps) => {
    return (
        <Paper className={cx("p-4 shadow-sm transition-shadow", className)} {...rest}>
            {children}
        </Paper>
    );
};

export default memo(AreaContainer);
