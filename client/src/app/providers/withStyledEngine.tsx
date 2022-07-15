import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import React, {FC} from 'react';

export const withStyledEngine = (component: FC) => () => (
  <StyledEngineProvider injectFirst>
    {component({})}
  </StyledEngineProvider>
);
