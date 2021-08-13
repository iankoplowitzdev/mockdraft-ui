import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Draft from './components/draft';
import Home from './components/home';
import About from './components/about';
import Roadmap from './components/roadmap';
import ChangeLog from './components/changelog';



function App() {
  return (
    <Router>
      <nav className="uk-navbar-container uk-margin-bottom" data-uk-navbar>
        <div className="uk-navbar-left">
          <a className="uk-navbar-item uk-logo" href="/">NFL Mock Draft Simulator</a>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li><a href="/about">About</a></li>
            <li><a href="/roadmap">Roadmap</a></li>
            <li><a href="/changelog">Changelog</a></li>
            <li>
              <a href="/draft">
                <button className="uk-button uk-button-primary">Draft</button>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/changelog">
          <ChangeLog />
        </Route>
        <Route path="/roadmap">
          <Roadmap />
        </Route>
        <Route path="/draft">
          <Draft />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

