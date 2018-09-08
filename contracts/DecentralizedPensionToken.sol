pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol';

contract DecentralizedPensionToken is ERC20Mintable, ERC20Burnable {
    string public constant name = "Decentralized Pension Token";
    string public constant symbol = "DPT";
    uint8 public constant decimals = 18;
}