import {HasChildren} from './HasChildren';

export interface ClosableHasChildren extends HasChildren {
  onClose: (event: {}) => void;
}
