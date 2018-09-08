pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';

contract DecentralizedPensionToken is ERC20Mintable {
    string public constant name = "Decentralized Pension Token";
    string public constant symbol = "DPT";
    uint8 public constant decimals = 18;
}