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
              <Link to="/profile/buyer"> Buyer Profile </Link>
            </li>
            <li>
              <Link to="/picker/buyer"> Picker </Link>
            </li>
            <li>
              <Link to="/checkout/buyer"> Checkout </Link>
            </li>
          </ul>

        <Route exact path='/profile/:userId' component={ProfileComponent}></Route>
        <Route exact path='/picker/:userId' component={PickerComponent}></Route>
        <Route exact path='/checkout/:userId' component={CheckoutComponent}></Route>
      </div>
    </Router>
  );
}

export default App;
