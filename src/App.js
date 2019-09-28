import React from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import ProfileComponent from './ProfileComponent';
import PickerComponent from './PickerComponent';
import CheckoutComponent from './CheckoutComponent';
import NotFoundComponent from './NotFoundComponent';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Switch>
          <Route exact path='/profile/:userId' component={ProfileComponent}></Route>
          <Route exact path='/picker/:userId' component={PickerComponent}></Route>
          <Route exact path='/checkout/:userId' component={CheckoutComponent}></Route>
          <Route component={NotFoundComponent}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
