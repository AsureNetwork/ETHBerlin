//import DecentralizedPensionToken from './../build/contracts/DecentralizedPensionToken.json'
import DecentralizedPension from './../build/contracts/DecentralizedPension.json'

const drizzleOptions = {
    web3: {
        block: false,
        fallback: {
            type: 'ws',
            url: 'ws://127.0.0.1:8545'
        }
    },
    contracts: [
        DecentralizedPension
    ],
    polls: {
        accounts: 1500
    },
    syncAlways: true
};

export default drizzleOptions