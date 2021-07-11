import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Draft from './draft'
import Home from './home'



function HeaderMessage(props) {
  if(props.team) {
    return <span>| Selected team: {props.team}</span>
  }

  return <span></span>
}

function App() {
  const [screen, setScreen] = useState("options");
  const [team, setTeam] = useState(null);

  return (
    <Router>
      <Navbar>
        <Navbar.Brand href="/">
          NFL Mock Draft Simulator
          <HeaderMessage team={team} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/draft">Draft</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
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
