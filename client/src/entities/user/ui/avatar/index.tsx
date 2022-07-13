import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import styles from '../menu/styles.module.scss';

export type UserAvatarProps = {
  data: any /*User*/;
  onClick: (event: React.MouseEvent<HTMLElement>) => {}
}

export const UserAvatar = ({data, onClick}: UserAvatarProps) => {
  return (
    <Tooltip title={`${data.firstName} ${data.lastName}`}>
      <IconButton className={styles.UserAvatar} onClick={onClick}>
        <Avatar alt={data.firstName} src="/" />
      </IconButton>
    </Tooltip>
  );
};
