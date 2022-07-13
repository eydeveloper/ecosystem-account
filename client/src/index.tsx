import App from 'app';
import {setupStore} from 'app/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
