require('dotenv').config({ path: '../.env' }); // Ensure proper path to .env file

const Kit = require('@celo/contractkit');
const Web3 = require('web3');
const fs = require('fs');

// Ensure environment variables are loaded
const privateKey = process.env.PRIVATE_KEY;
const celoRpcUrl = process.env.CELO_RPC_URL;

if (!privateKey) {
  console.error("Private key is not set. Please check your .env file.");
  process.exit(1);
}

if (!celoRpcUrl) {
  console.error("Celo RPC URL is not set. Please check your .env file.");
  process.exit(1);
}

// Removed debug statement to not print private key
console.log(`Using Celo RPC URL: ${celoRpcUrl}`);  // Debug statement to check RPC URL

// Connect to Celo Mainnet
const web3 = new Web3(celoRpcUrl);
const kit = Kit.newKitFromWeb3(web3);

// Add private key to kit
kit.connection.addAccount(privateKey);

async function main() {
  const contractAddress = "0x1B0b2647Fc522417d79d8080F9D41977f03D3C46"; // Latest Deployment Contract Address

  // Load the ABI JSON from the artifacts/contracts directory
  const abi = JSON.parse(fs.readFileSync('../artifacts/contracts/PrideToken.sol/PrideToken.json', 'utf8')).abi;

  const PrideToken = new kit.web3.eth.Contract(abi, contractAddress);

  // Check PRD balance of the contract address
  const prdBalance = await PrideToken.methods.balanceOf(contractAddress).call();
  console.log(`PRD Balance of contract address ${contractAddress}: ${web3.utils.fromWei(prdBalance, 'ether')} PRD`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

