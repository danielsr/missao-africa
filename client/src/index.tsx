import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import 'assets/css/tailwind.css';
import App from 'views/App';
import * as serviceWorker from './serviceWorker';
import history from 'routes/history';
import { StoreProvider } from 'store';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
