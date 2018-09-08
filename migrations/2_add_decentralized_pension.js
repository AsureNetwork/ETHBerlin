const DecentralizedPension = artifacts.require("./DecentralizedPension.sol");
const DateTime = artifacts.require("./DateTime.sol");

module.exports = function(deployer) {
    deployer.then(async () => {
        const dateTime = await deployer.deploy(DateTime);

        await deployer.deploy(DecentralizedPension, dateTime.address, /*math.address*/);
    });
};
