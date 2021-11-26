import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from "history";

import App from './App';
import './App.scss';
 
// Invoking browser history function to get browser routing history from the web
const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
      <App />
  </Router>
, document.getElementById("App"));