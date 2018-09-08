Decentralized pension system
============================

Let's build a pension system on blockchain that is not in the hands of
governments or insurance companies but in the hands of its users.

[Take a look at the math behind.](https://github.com/AsureFoundation/ETHBerlin/blob/master/math.ipynb)

# Solution

The idea is to implement a pay-as-you-go pension system.  Members
pay their contributions in ETH and receive ERC20 tokens
in return.  No contributions
are invested on the capital market and therefore no interest is earned.
Instead, the paid-in ETH are used directly for the payment of outstanding
pension claims. How much pension is paid out depends on how many pension
token a pensioner has, e.g. how many contributions he paid into the system.

As a rule, pay-as-you-go systems only work because, for example, states
introduce compulsory social security systems and can thus guarantee a stable
number of members and contribution payments. In a decentralised pension
system nobody can be forced to become a member. Instead, we want to incentivize
membership.


