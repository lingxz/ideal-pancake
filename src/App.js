import React from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome } from '@fortawesome/free-solid-svg-icons'
import ProfileComponent from './ProfileComponent';
import PickerComponent from './PickerComponent';
import CheckoutComponent from './CheckoutComponent';
import NotFoundComponent from './NotFoundComponent';
import RootComponent from './RootComponent';

library.add(faHome);

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Link to={"/"} style={{color: "#ffffff", position: "fixed", top: "1rem", left: "0.5rem", zIndex: 100}}><FontAwesomeIcon icon="home"></FontAwesomeIcon></Link>
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
