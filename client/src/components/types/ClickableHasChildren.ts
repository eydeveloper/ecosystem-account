import React from 'react';
import {HasChildren} from './HasChildren';

export interface ClickableHasChildren extends HasChildren {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}
