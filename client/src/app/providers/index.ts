import compose from 'compose-function';
import {withRouter} from './withRouter';
import {withStyledEngine} from './withStyledEngine';

export const withProviders = compose(
  withRouter,
  withStyledEngine
);
