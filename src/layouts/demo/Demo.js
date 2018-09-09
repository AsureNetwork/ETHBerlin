import React, { Component } from 'react';
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import moment from 'moment';
import { ContractDataExt } from '../../util/ContractDataExt';

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

        const lastMonth = moment().subtract('1', "month");

        this.lastMonthDepositsCacheId = this.contracts.DecentralizedPension.methods.depositsByUser.cacheCall(
            this.account,
            lastMonth.year(),
            lastMonth.month() + 1
        );
        this.isRetiredCacheId = this.contracts.DecentralizedPension.methods.isRetired.cacheCall(
            this.account
        );
    }

    get isRetired() {
        const decentralizedPension = this.props.contracts.DecentralizedPension;
        if (decentralizedPension.isRetired[this.isRetiredCacheId]) {
            return decentralizedPension.isRetired[this.isRetiredCacheId].value;
        }

        return false;
    }

    get lastMonthDeposits() {
        const decentralizedPension = this.props.contracts.DecentralizedPension;
        if (decentralizedPension.depositsByUser[this.lastMonthDepositsCacheId]) {
            return decentralizedPension.depositsByUser[this.lastMonthDepositsCacheId]
                .value;
        }

        return '0';
    }

    onDeposit = async () => {
        const amountInWei = Web3.utils.toWei(this.state.amount);
        const tx = await this.contracts.DecentralizedPension.methods
            .deposit(amountInWei)
            .send({value: amountInWei});
        console.log(tx);
    };

    onClaim = async () => {
        console.log('claim');
    };


    onRetire = async () => {
        // TODO: fetch balance, approve, and pass to retire
        const tx = await this.contracts.DecentralizedPension.methods
            .retire('0')
            .send();
        console.log(tx);
    };

    renderContributor() {
        return (
            <div>


                <h2>Deposit</h2>

                <p>
                    Your total contributions in {moment().format('MMM')}.{' '}
                    {this.currentYear} have been{' '}
                    <strong>
                        <ContractDataExt
                            contract="DecentralizedPension"
                            method="depositsByUser"
                            methodArgs={[
                                this.props.accounts[0],
                                this.currentYear,
                                this.currentMonth
                            ]}
                            render={data => Web3.utils.fromWei(data)}
                        />{' '}
                        ETH{' '}
                    </strong>
                    so far.
                </p>

                <p>Deposit (more) ETH for the current month.</p>

                <Form inline>
                    <FormGroup>
                        <Label for="amount" hidden>
                            Email
                        </Label>
                        <Input
                            type="number"
                            name="amount"
                            id="amount"
                            placeholder="ETH"
                            onChange={evt => {
                                this.setState({amount: evt.target.value});
                            }}
                        />
                    </FormGroup>
                    <Button onClick={this.onDeposit}>Deposit</Button>
                </Form>

                <hr/>

                <h2>Claim tokens</h2>
                {this.lastMonthDeposits == 0 ? (
                    <p>
                        You did not deposit anything last month. Therefore, you can not
                        claim token.
                    </p>
                ) : (
                    <div>
                        <p>
                            Last month, you deposited {' '}
                            <strong>{Web3.utils.fromWei(this.lastMonthDeposits)} ETH</strong>.
                        </p>
                        <Button onClick={this.onClaim}>Claim tokens</Button>
                    </div>
                )}

                <hr/>
                <h2>Retire</h2>
                <Button onClick={this.onRetire}>Retire</Button>
            </div>
        );
    }

    renderPensioner() {
        return (
            <div>
                <h2>Withdraw</h2>

                <Alert color="dark">To be implemented :)</Alert>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h1>Your pension overview</h1>

                <p>
                    Your current status is{' '}
                    <strong>{this.isRetired ? 'Pensioner' : 'Contributor'}</strong>
                </p>
                <hr/>
                {this.isRetired ? this.renderPensioner() : this.renderContributor()}
            </div>
        );
    }
}
