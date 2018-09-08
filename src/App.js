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
import ETHBerlinLogo from './content/ethberlin_logo.png';
import AsureLogo from './content/asure.io.logo.png';

class App extends Component {
  render() {
    return (
        <main className="container container-fluid ">
            <Row>
                <Col xs="3">
                    <NavLink to="/" activeClassName="active" tag={RRNavLink}>
                        <img src={AsureLogo} width="260px" />
                    </NavLink>


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
                    </Nav>

                    <img src={ETHBerlinLogo} width="260px" />
                </Col>
                <Col xs="9">
                    <Route exact path="/" component={Home}/>
                    <Route path="/demo" component={DemoContainer}/>
                    <Route path="/simulation" component={Simulation}/>
                </Col>
            </Row>

            <Row>
                <Col xs="12 footer">
                    Made with love at @ETHBerlin from @Asure
                </Col>
            </Row>
        </main>
    );
  }
}

export default App
