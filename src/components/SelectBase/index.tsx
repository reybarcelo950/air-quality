import {MenuItem, Select, SelectProps, styled} from "@mui/material"
import {memo} from "react";

export const StyledSelect = styled(Select)(() => ({
    '.MuiSelect-select': {
        padding: '4px 0 5px 15px',
        fontSize: '14px !important'
    },
    fontSize: '14px !important',
    minWidth: '100px',
    textAlign: 'center'
}))

export const StyledMenuItem = styled(MenuItem)(() => ({
    fontSize: '14px !important'
}))

const SelectBase = ({
                        options,
                        ...rest
                    }: SelectProps & { options: { value: any, label: string }[] }) => {
    return (
        <StyledSelect {...rest}>
            {
                options
                    .map((opt) =>
                        (<StyledMenuItem key={opt.value} value={opt.value}>{opt.label}</StyledMenuItem>))
            }
        </StyledSelect>
    )
}

export default memo(SelectBase);
