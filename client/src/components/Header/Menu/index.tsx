import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, {FC, useState} from 'react';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {logout} from '../../../store/reducers/auth';
import {ClickableHasChildren} from '../../Interfaces/ClickableHasChildren';
import {ClosableHasChildren} from '../../Interfaces/ClosableHasChildren';

const menuList = ['Управление аккаунтом'];

const HeaderMenu: FC = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const {user} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <React.Fragment>
      <Tooltip title={`${user.firstName} ${user.lastName}`}>
        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
          <Avatar alt={user.firstName} src="/" />
        </IconButton>
      </Tooltip>

      <MenuList anchorEl={anchorElUser} onClose={handleCloseUserMenu}>
        {menuList.map((setting) => (
          <MenuListItem key={setting} onClick={handleCloseUserMenu}>
            {setting}
          </MenuListItem>
        ))}

        <MenuListItem key="logout" onClick={handleLogout}>
          Выйти
        </MenuListItem>
      </MenuList>
    </React.Fragment>
  );
};

interface MenuListProps extends ClosableHasChildren {
  anchorEl: HTMLElement | null;
}

const MenuList: FC<MenuListProps> = ({children, anchorEl, onClose}) => (
  <Menu
    sx={{mt: '45px'}}
    id="menu-appbar"
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    open={Boolean(anchorEl)}
    onClose={onClose}
  >
    {children}
  </Menu>
);

const MenuListItem: FC<ClickableHasChildren> = ({onClick, children}) => (
  <MenuItem onClick={onClick}>
    <Typography textAlign="center">{children}</Typography>
  </MenuItem>
);

export default HeaderMenu;
