require('dotenv').config();
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
// require('@nomiclabs/hardhat-verify'); // Removed this line

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

let PRIVATE_KEY;
if (process.env.PRIVATE_KEY) {
    PRIVATE_KEY = process.env.PRIVATE_KEY.replace('0x', '');
    if (PRIVATE_KEY.length !== 64) {
        throw new Error("Invalid private key format. Ensure it is 64 hexadecimal characters.");
    }
}

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.7",
                settings: {
                    optimizer: { enabled: true, runs: 200 }
                }
            },
            {
                version: "0.8.20",
                settings: {
                    optimizer: { enabled: true, runs: 200 }
                }
            }
        ]
    },
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545"
        },
        alfajores: {
            url: "https://alfajores-forno.celo-testnet.org",
            accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
            gas: 3000000,
            gasPrice: 50000000000 // 50 Gwei
        },
        mainnet: {
            url: "https://forno.celo.org",
            accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
            gas: 6000000,
            gasPrice: 20000000000 // 20 Gwei
        },
        bsc: {
            url: process.env.BSC_RPC_URL || "https://bsc-dataseed.binance.org/",
            accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
            chainId: 56,
            gas: 6000000,
            gasPrice: 20000000000 // 20 Gwei
        },
        ropsten: {
            url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
            chainId: 3,
            gas: 6000000,
            gasPrice: 20000000000 // 20 Gwei
        },
        ethereum: {
            url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
            chainId: 1,
            gas: 6000000,
            gasPrice: 20000000000 // 20 Gwei
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
        customChains: [
            {
                network: "mainnet",
                chainId: 42220,
                urls: {
                    apiURL: "https://explorer.celo.org/api",
                    browserURL: "https://explorer.celo.org"
                }
            },
            {
                network: "alfajores",
                chainId: 44787,
                urls: {
                    apiURL: "https://alfajores-forno.celo-testnet.org/api",
                    browserURL: "https://alfajores-blockscout.celo-testnet.org"
                }
            }
        ]
    }
};

