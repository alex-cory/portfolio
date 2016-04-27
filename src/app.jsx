import 'babel-polyfill';
require('../public/css/main.css')
import App from './components/App.jsx';
import AppHomeRoute from './routes/AppHomeRoute.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={new AppHomeRoute()}
  />,
  document.getElementById('root')
);
