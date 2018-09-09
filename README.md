Decentralized pension system
============================

Let's build a pension system on blockchain that is not in the hands of
governments or insurance companies but in the hands of its users.

The idea is to implement a pay-as-you-go pension system.  Members
pay their contributions in ETH and receive ERC20 tokens
in return.  No contributions
are invested on the capital market and therefore no interest is earned.
Instead, the paid-in ETH are used directly for the payment of outstanding
pension claims. How much pension is paid out depends on how many pension
token a pensioner has, e.g. how many contributions he paid into the system.

As a rule, pay-as-you-go systems only work because, for example, states
introduce mandatory social security systems and can thus guarantee a stable
number of members and contribution payments. In a decentralised pension
system nobody can be forced to become a member. Instead, we want to incentivize
membership by

- giving people who join early, more
- paying people a higher pension if they made higher contributions
- paying people a longer pension if they contributed for a long time

## Members of Team Awesome

- Paul Mizel
- Fabian Raetz
- Gamal Schmuck
- Andrey Kuchaev

## Deployment

The dApp is hosted on GitHub Pages. SmartContracts are 
only deployed to the Rinkeby testnet.

## How-To Start
1. Start your Browser with MetaMask and chose the Rinkeby Network
2. You need ETH on Rinkeby Testnet (http://faucet.rinkeby.io)
3. Go to [https://ethberlin.asure.io](https://ethberlin.asure.io) 

## Links

- [Presentation](https://github.com/AsureFoundation/ETHBerlin/blob/master/Decentralized%20Pension%20System.pdf)
- [Deployed project](https://ethberlin.asure.io)
- Documentation
   * [IPython notebook playground with some ideas](https://github.com/AsureFoundation/ETHBerlin/blob/master/math.ipynb)
   * [PensionSystem SmartContract](https://github.com/AsureFoundation/ETHBerlin/blob/master/contracts/DecentralizedPension.sol)
   * [PensionSystem SmartContract UnitTests](https://github.com/AsureFoundation/ETHBerlin/blob/master/test/DecentralizedPension.js)
- [License](https://github.com/AsureFoundation/ETHBerlin/blob/master/LICENSE) (MIT)
