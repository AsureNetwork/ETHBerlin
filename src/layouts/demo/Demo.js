import React, { Component } from 'react';
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import PropTypes from 'prop-types';
import Web3 from 'web3';
import moment from 'moment';
import { ContractDataExt } from "../../util/ContractDataExt";

export default class Demo extends Component {
    static contextTypes = {
        drizzle: PropTypes.object
    };

    state = {
        amount: 0
    };

    currentYear = moment().year();
    currentMonth = moment().month() + 1;

    constructor(props, context) {
        super(props, context);

        this.account = this.props.accounts[0];
        this.contracts = context.drizzle.contracts;

        this.isRetiredCacheId = this.contracts.DecentralizedPension.methods.isRetired.cacheCall(this.account);
    }

    get isRetired() {
        const decentralizedPension = this.props.contracts.DecentralizedPension;
        if (decentralizedPension.isRetired[this.isRetiredCacheId]) {
            console.log(decentralizedPension.isRetired[this.isRetiredCacheId].value);
            return decentralizedPension.isRetired[this.isRetiredCacheId].value;
        }

        return false;
    }

    onDeposit = async () => {
        const amountInWei = Web3.utils.toWei(this.state.amount);
        const tx = await this.contracts.DecentralizedPension.methods.deposit(amountInWei).send({value: amountInWei});
        console.log(tx)
    };

    renderContributor() {
        return (
            <div>




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

                <hr/>

                <h2>Retire</h2>

                <p>
                    Your total contributions in {moment().format('MMM')}. {this.currentYear} have been {' '}
                    <strong>
                        <ContractDataExt
                            contract="DecentralizedPension"
                            method="depositsByUser"
                            methodArgs={[this.props.accounts[0], this.currentYear, this.currentMonth]}
                            render={data => Web3.utils.fromWei(data)}>
                        </ContractDataExt>
                        {' '} ETH {' '}
                    </strong>
                    so far.
                </p>


                <Button>Retire</Button>
                <hr/>


                <h2>Claim tokens</h2>
                <Alert color="dark">
                    To be implemented :)
                </Alert>
            </div>
        );
    }

    renderPensioner() {
        return (
            <div>
                <h2>Withdraw</h2>

                <Alert color="dark">
                    To be implemented :)
                </Alert>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h1>Your pension overview</h1>

                <p>
                    Your current status is <strong>{this.isRetired ? 'Pensioner' : 'Contributor'}</strong>
                </p>
                <hr/>
                {this.isRetired ? this.renderPensioner() : this.renderContributor()}
            </div>
        );
    }
}
