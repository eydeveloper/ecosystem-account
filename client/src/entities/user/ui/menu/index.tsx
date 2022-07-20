import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import React, {FC, useState} from 'react';
import {useQueryClient} from 'react-query';
import {useVerify} from 'entities/user/lib/useVerify';
import {UserService} from '../../model/service';
import styles from './styles.module.scss';

export const UserMenu: FC = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const {data} = useVerify();
  const queryClient = useQueryClient();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAccountClick = () => {
    window.location.href = `${process.env.REACT_APP_ACCOUNT_URL}`;
  };

  const handleLogoutClick = () => {
    return UserService.logout(queryClient);
  };

  return (
    <>
      <Tooltip title={`${data?.user.firstName} ${data?.user.lastName}`}>
        <IconButton className={styles['Header-Icon-Button']} onClick={handleOpenUserMenu}>
          <Avatar alt={data?.user.firstName} src="/" />
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
    </>
  );
};
