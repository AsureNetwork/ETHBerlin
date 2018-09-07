Decentralized pension system
============================

Let's build a pension system on blockchain that is not in the hands of
governments or insurance companies but in the hands of its users.

[Take a look at the math behind.](https://github.com/AsureFoundation/ETHBerlin/blob/master/math.ipynb)

# Solution

The idea is to implement a pay-as-you-go pension system.  Members
pay their contributions in ETH and receive non fungible pension tokens
in return.  No contributions
are invested on the capital market and therefore no interest is earned.
Instead, the paid-in ETH are used directly for the payment of outstanding
pension claims.  How much pension is paid out depends on how many pension
token a pensioner has and how many contributions he paid into the system.

As a rule, pay-as-you-go systems only work because, for example, states
introduce compulsory social security systems and can thus guarantee a stable
number of members and contribution payments. In a decentralised pension
system nobody can be forced to become a member. Instead, we want to incentivize
membership.

# Pension token (DPT)

We wanna incentivize membership by granting people a bonus if they start paying
into the pension system early. Therefore, we design our token as a non fungible
token and add a record of when the token was created.

The creation dates of a members tokens have an influence of how much they get as
a pensioner.

## Example

Given that Max (20) wants to save up a reserve in ETH as his pension.
Max saves 10% of his income as ETH each month over a period of 40 years.
From the age of 60, Max pays off 1/(40\*12) of his ETH every month for
the next 40 years.

### Problem

Throughout the entire period, the saved value is subject to price
fluctuations. Depending on how the price changes Max has more or less
the amount saved at his disposal.

If Max had saved his reserve in dollars and put the money under his
pillow, inflation would have caused a large part of his income to be
lost, too.
