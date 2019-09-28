import React from 'react';
import { HashRouter as Router,
  Route,
  Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import ProfileComponent from './ProfileComponent';
import PickerComponent from './PickerComponent';
import CheckoutComponent from './CheckoutComponent';

function App() {
  return (
    <Router>
      <div className="App">
      <ul>
            <li>
              <Link to="/profile"> Profile </Link>
            </li>
            <li>
              <Link to="/picker"> About </Link>
            </li>
            <li>
              <Link to="/checkout"> Team </Link>
            </li>
          </ul>

        <Route exact path='/profile' component={ProfileComponent}></Route>
        <Route exact path='/picker' component={PickerComponent}></Route>
        <Route exact path='/checkout' component={CheckoutComponent}></Route>
      </div>
    </Router>
  );
}

export default App;
