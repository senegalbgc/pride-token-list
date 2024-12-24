const Web3 = require('web3');
const { newKitFromWeb3 } = require('@celo/contractkit');
require('dotenv').config({ path: '../.env' });  // Ensure dotenv loads the .env file

// Configuration
const web3 = new Web3(process.env.CELO_RPC_URL);
const kit = newKitFromWeb3(web3);
kit.connection.addAccount(process.env.PRIVATE_KEY);

const newContractAddress = "0x1B0b2647Fc522417d79d8080F9D41977f03D3C46";
const oldContractAddress = "0xAE62Ca7e7Bc80C800DADc1c4b9175800033537cd";

// Correct ABI to interact with ERC20
const abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Create contract instance
const contract = new kit.web3.eth.Contract(abi, newContractAddress);

// Amount of tokens to transfer (in wei)
const amount = kit.web3.utils.toWei('1000', 'ether'); // Adjust according to your need

// Transfer function using Celo
async function transferTokens() {
    const accounts = await kit.web3.eth.getAccounts();
    const txObject = await contract.methods.transfer(oldContractAddress, amount);
    
    const tx = await kit.sendTransactionObject(txObject, { from: accounts[0] });
    console.log("Transaction submitted:", tx.transactionHash);
    const receipt = await tx.waitReceipt();
    console.log("Transaction confirmed:", receipt);
}

// Execute the token transfer
transferTokens().catch(console.error);

