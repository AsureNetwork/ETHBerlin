import React, { Component } from 'react'
import { Button, Col, Row, Jumbotron } from 'reactstrap';
import ETHBerlinLogo from './../../content/ethberlin_logo.png';


class Home extends Component {
    render() {
        return (
            <Row>
                <Col xs="12">
                    <Jumbotron>

                        <h1 className="display-3">
                            Welcome to your decentralized pension world!
                        </h1>
                        <p className="lead">This is a simple experemnt from crypto enthusiats to
                            who are researching new insurance and social security solutions on blockchain
                            .</p>
                        <hr className="my-2"/>
                        <p>
                            .</p>
                        <p className="lead">
                            <Button color="primary">Learn More</Button>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
        )
    }
}

export default Home
