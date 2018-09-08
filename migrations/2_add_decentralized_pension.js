const DecentralizedPension = artifacts.require("./DecentralizedPension.sol");
const DecentralizedPensionToken = artifacts.require("./DecentralizedPensionToken.sol");
const DateTime = artifacts.require("./DateTime.sol");
//const Math = artifacts.require("./Math.sol");

module.exports = function(deployer) {
    deployer.then(async () => {
        const dateTime = await deployer.deploy(DateTime);
        //const math = await deployer.deploy(Math);

        //await deployer.deploy(DecentralizedPensionToken);

        await deployer.deploy(DecentralizedPension, dateTime.address, /*math.address*/);
    });
};
