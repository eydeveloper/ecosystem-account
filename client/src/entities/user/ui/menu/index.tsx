import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import {userModel} from 'entities/user';
import React, {FC, useState} from 'react';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch';
import {useAppSelector} from 'shared/lib/hooks/useAppSelector';
import styles from './styles.module.scss';

export const UserMenu: FC = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const {user} = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAccountClick = () => {
    window.location.href = `${process.env.REACT_APP_ACCOUNT_URL}`;
  };

  const handleLogoutClick = async () => {
    dispatch(userModel.actions.logout());
  };

  return (
    <React.Fragment>
      <Tooltip title={`${user.firstName} ${user.lastName}`}>
        <IconButton className={styles['Header-Icon-Button']} onClick={handleOpenUserMenu}>
          <Avatar alt={user.firstName} src="/" />
        </IconButton>
      </Tooltip>
      <Menu
        className={styles['Menu']}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
      >
        <MenuItem onClick={handleAccountClick}>
          Управление аккаунтом
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          Выйти
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
