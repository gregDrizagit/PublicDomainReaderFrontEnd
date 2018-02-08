import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
const AppMount = () =>
{
  return(
      <Router>
        <App />
      </Router>
  )

}

ReactDOM.render(<AppMount />, document.getElementById('root'));
