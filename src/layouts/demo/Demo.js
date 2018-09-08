import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import PropTypes from 'prop-types';
import Web3 from 'web3';
import { ContractDataExt } from "../../util/ContractDataExt";

export default class Demo extends Component {
    static contextTypes = {
        drizzle: PropTypes.object
    };

    state = {
        amount: 0
    };

    constructor(props, context) {
        super(props, context);

        this.contracts = context.drizzle.contracts;
    }

    onDeposit = async () => {
        const amountInWei = Web3.utils.toWei(this.state.amount);
        const tx = await this.contracts.DecentralizedPension.methods.deposit(amountInWei).send({value: amountInWei});
        console.log(tx)
    };

    render() {
        return (
            <div>
                <h1>Pension overview</h1>

                <p>
                    Your total contributions in Sep. 2018 have been {' '}
                    <strong>
                        <ContractDataExt
                            contract="DecentralizedPension"
                            method="depositsByUser"
                            methodArgs={[this.props.accounts[0], 2018, 9]}
                            render={data => Web3.utils.fromWei(data)}>
                        </ContractDataExt>
                        {' '} ETH {' '}
                    </strong>
                     so far.
                </p>

                <h2>Deposit</h2>

                <p>Deposit (more) ETH for the current month.</p>

                <Form inline>
                    <FormGroup>
                        <Label for="amount" hidden>Email</Label>
                        <Input type="number" name="amount" id="amount" placeholder="ETH" onChange={evt => {
                            this.setState({amount: evt.target.value});
                        }}/>
                    </FormGroup>
                    <Button onClick={this.onDeposit}>Deposit</Button>
                </Form>
            </div>
        );
    }
}
