import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import ProfileComponent from './ProfileComponent';
import PickerComponent from './PickerComponent';
import CheckoutComponent from './CheckoutComponent';
import NotFoundComponent from './NotFoundComponent';
import RootComponent from './RootComponent';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Switch>
          <Route exact path='/' component={RootComponent}></Route>
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
