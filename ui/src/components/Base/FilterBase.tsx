import React, { useCallback, useMemo, useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export type BaseFilterProps = {
  id?: string;
  disabled?: boolean;
  title: string;
  menuProps?: any;
  onOpen?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
};

export const MenuStl = styled(Menu)(() => ({
  '.MuiList-root': {
    minWidth: '150px',
  },
}));

export const ButtonInput = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: '2px 8px',
  border: '1px solid ' + (theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]),
}));

const FilterBase = forwardRef(({ id, title, children, menuProps, onClose, onOpen, ...props }: BaseFilterProps, ref) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { menuID, controls } = useMemo(() => {
    const menuID = id || `menuid${new Date().getTime()}${Math.random()}`;
    const controls = `${menuID}controls`;
    return {
      menuID,
      controls,
    };
  }, [id]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      onOpen?.();
    },
    [onOpen],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    onClose?.();
  }, [onClose]);

  return (
    <Box>
      <ButtonInput
        {...props}
        id={menuID}
        className={'h-full'}
        aria-controls={open ? controls : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='outlined'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <span>{title}</span>
      </ButtonInput>
      <MenuStl
        id={controls}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        action={ref}
        {...menuProps}
      >
        {children}
      </MenuStl>
    </Box>
  );
});

FilterBase.displayName = 'FilterBase';

export default FilterBase;
