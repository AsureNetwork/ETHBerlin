import React, { Component } from 'react'
import { Col, Jumbotron, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { Link } from "react-router-dom";
import paygInfo from '../../content/payg.png'

class Home extends Component {
    render() {
        return (
            <Row>
                <Col xs="12">
                    <Jumbotron>
                        <h1 className="display-3">
                            Welcome to your decentralized pension!
                        </h1>
                        <p className="lead">
                            Let's build a pension system on blockchain that is not in the hands of governments or
                            insurance companies but in the hands of its users.
                        </p>
                        <img src={paygInfo} alt="pay-as-you-go info graphic" style={{width: '100%'}}/>
                        <p>
                            The idea is to implement a pay-as-you-go pension system. Members pay their contributions in
                            ETH and receive ERC20 tokens in return. No contributions are invested on the capital market
                            and therefore no interest is earned. Instead, the paid-in ETH are used directly for the
                            payment of outstanding pension claims. How much pension is paid out depends on how many
                            pension token a pensioner has, e.g. how many contributions he paid into the system.
                        </p>
                        <p>
                            As a rule, pay-as-you-go systems only work because, for example, states introduce mandatory
                            social security systems and can thus guarantee a stable number of members and contribution
                            payments. In a decentralised pension system nobody can be forced to become a member.
                            Instead, we want to incentivize membership by
                        </p>
                        <ListGroup>
                            <ListGroupItem>
                                Giving people who join early, more</ListGroupItem>
                            <ListGroupItem>
                                Paying people a higher pension if they made higher contributions
                            </ListGroupItem>
                            <ListGroupItem>
                                Paying people a longer pension if they contributed for a long time
                            </ListGroupItem>
                        </ListGroup>
                        <hr className="my-2"/>
                        <p>
                            .</p>
                        <p className="lead">
                            <Link to={"/demo"}>Start contributing to the pension system now</Link>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
        )
    }
}

export default Home
