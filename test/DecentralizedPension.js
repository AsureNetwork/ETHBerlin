const moment = require('moment');
const chai = require('chai');
const expect = chai.expect;
const BN = require('bn.js');
const bnChai = require('bn-chai');
chai.use(bnChai(BN));

const DecentralizedPension = artifacts.require('DecentralizedPension');
const DecentralizedPensionToken = artifacts.require('DecentralizedPensionToken');

contract('DecentralizedPension', async accounts => {
    const year = moment().year();
    const month = moment().month() + 1;

    describe('deposit', () => {
        it('user should have no deposits', async () => {
            const pension = await DecentralizedPension.deployed();

            const amount = await pension.depositsByUser.call(
                accounts[0],
                year,
                month,
            );
            expect(amount).to.eq.BN('0');
        });

        it('deposit 1 ETH', async () => {
            const pension = await DecentralizedPension.deployed();

            await pension.deposit(web3.utils.toWei('1'), {value: web3.utils.toWei('1')});

            const amount = await pension.depositsByUser.call(
                accounts[0],
                year,
                month,
            );
            expect(amount).to.eq.BN(web3.utils.toWei('1'));
        });
    });

    describe('claim', () => {
        it('should claim tokens', async () => {
            const pension = await DecentralizedPension.deployed();
            const pensionToken = await DecentralizedPensionToken.at(
                await pension.pensionToken.call()
            );

            let balance = await pensionToken.balanceOf.call(accounts[0]);
            expect(balance).to.eq.BN(web3.utils.toWei('0'));

            await pension.claim(
                year,
                month,
            );

            balance = await pensionToken.balanceOf.call(accounts[0]);
            expect(balance).to.eq.BN(web3.utils.toWei('2'));

            const totalSupply = await pensionToken.totalSupply.call();
            expect(totalSupply).to.eq.BN(web3.utils.toWei('2'));
        });
    });

    describe('retire', () => {
        it('should retire', async () => {
            const pension = await DecentralizedPension.deployed();
            const pensionToken = await DecentralizedPensionToken.at(
                await pension.pensionToken.call()
            );

            let balance = await pensionToken.balanceOf.call(accounts[0]);
            await pensionToken.approve(pension.address, balance);

            await pension.retire(balance);

            const isRetired = await pension.isRetired.call(accounts[0]);
            expect(isRetired).to.equal(true);

            balance = await pensionToken.balanceOf.call(accounts[0]);
            expect(balance).to.eq.BN(web3.utils.toWei('0'));

            const totalSupply = await pensionToken.totalSupply.call();
            expect(totalSupply).to.eq.BN(web3.utils.toWei('0'));
        });
    });

    describe('withdraw', () => {
        it('should withdraw', async () => {
            const pension = await DecentralizedPension.deployed();

            const oldBalance = await web3.eth.getBalance(accounts[0]);

            await pension.withdraw(
                year,
                month,
            );

            const newBalance = await web3.eth.getBalance(accounts[0]);

            expect(newBalance - oldBalance).to.be.below(10**18);
            expect(newBalance - oldBalance).to.be.above(10**17);
        });
    });
});