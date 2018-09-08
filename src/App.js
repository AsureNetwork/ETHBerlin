import React, { Component } from 'react'
import { Col, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { Route } from "react-router";
import { NavLink as RRNavLink } from 'react-router-dom';
import Home from "./layouts/home/Home";

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import  DemoContainer  from "./layouts/demo/DemoContainer";
import { Simulation } from "./layouts/simulation/Simulation";

class App extends Component {
  render() {
    return (
        <main className="container">
            <Row>
                <Col xs="3">
                    <Nav vertical>
                        <NavItem>
                            <NavLink to="/" activeClassName="active" tag={RRNavLink}>Intro</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/demo" activeClassName="active" tag={RRNavLink}>Demo</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/simulation" activeClassName="active" tag={RRNavLink}>Simulation</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink target="_blank" href="https://github.com/AsureFoundation/ethberlin">Github Repository</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink target="_blank" href="https://www.asure.io">asure.io</NavLink>
                        </NavItem>
                    </Nav>
                </Col>
                <Col xs="9">
                    <Route exact path="/" component={Home}/>
                    <Route path="/demo" component={DemoContainer}/>
                    <Route path="/simulation" component={Simulation}/>
                </Col>
            </Row>
        </main>
    );
  }
}

export default App
