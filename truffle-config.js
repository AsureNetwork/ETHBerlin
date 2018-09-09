require('dotenv');

const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
    migrations_directory: "./migrations",
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider(
                    process.env.MNEMONIC,
                    `https://rinkeby.infura.io/${process.env.INFURA_API_KEY}`
                );
            },
            network_id: '4'
        },
        kovan: {
            provider: function () {
                return new HDWalletProvider(
                    process.env.MNEMONIC,
                    `https://kovan.infura.io/${process.env.INFURA_API_KEY}`
                );
            },
            network_id: '42'
        }
    }
};
