import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
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
      <Navbar className="mb-4" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          NFL Mock Draft Simulator
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="ml-4" href="/roadmap">Roadmap</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="ml-4" href="/changelog">Change Log</Nav.Link>
          </Nav>
          <Button className="ml-4 btn btn-light" href="/draft">Draft</Button>
        </Navbar.Collapse>
      </Navbar>
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
