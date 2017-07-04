// import App from './App';


// const rootElement = document.getElementById('app');

// window.onload = () => {
//   ReactDOM.render(<App />, rootElement);
// }


import React from 'react';  
import ReactDOM from 'react-dom';  
import {  
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { AppContainer } from 'react-hot-loader';
import App from './App.jsx';


ReactDOM.render(<AppContainer><App/></AppContainer>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
