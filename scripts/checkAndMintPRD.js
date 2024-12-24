require('dotenv').config();

const Kit = require('@celo/contractkit');
const Web3 = require('web3');
const fs = require('fs');
const bip39 = require('bip39');
const hdkey = require('hdkey');
const { toChecksumAddress, privateKeyToAddress } = require('@celo/utils/lib/address');

const mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  console.error("Mnemonic is not set. Please check your .env file.");
  process.exit(1);
}

// Derive private key from mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic);
const hdwallet = hdkey.fromMasterSeed(seed);
const path = "m/44'/52752'/0'/0/0";  // Celo HD wallet derivation path
const wallet = hdwallet.derive(path);
const privateKey = `0x${wallet.privateKey.toString('hex')}`;
const deployerAddress = '0x327EF4f03CAE0a79A08d6c3984714d8f183cf7eB'; // Correct deployer address

console.log(`Derived deployer address: ${deployerAddress}`);

// Connect to Celo Mainnet
const web3 = new Web3('https://forno.celo.org');
const kit = Kit.newKitFromWeb3(web3);

// Add private key to kit
kit.addAccount(privateKey);

async function main() {
  const contractAddress = "0x1B0b2647Fc522417d79d8080F9D41977f03D3C46"; // Latest Deployment Contract Address
  const recipientAddress = '0x327EF4f03CAE0a79A08d6c3984714d8f183cf7eB'; // Correct deployer address for testing

  // Load the ABI JSON from the artifacts/contracts directory
  const abi = JSON.parse(fs.readFileSync('artifacts/contracts/PrideToken.sol/PrideToken.json', 'utf8')).abi;

  const PrideToken = new kit.web3.eth.Contract(abi, contractAddress);

  // Check PRD balance of the deployer address
  const prdBalance = await PrideToken.methods.balanceOf(deployerAddress).call();
  console.log(`PRD Balance of deployer: ${web3.utils.fromWei(prdBalance, 'ether')} PRD`);

  // Minting tokens
  const mint = PrideToken.methods.mint(recipientAddress, web3.utils.toWei('100', 'ether'));

  // Create the transaction object
  const txObject = await kit.sendTransactionObject(mint, { from: deployerAddress });
  const receipt = await txObject.waitReceipt();
  console.log(`Minted 100 tokens to ${recipientAddress}. Transaction Hash: ${receipt.transactionHash}`);

  // Check PRD balance after minting
  const prdBalanceAfterMint = await PrideToken.methods.balanceOf(recipientAddress).call();
  console.log(`PRD Balance of recipient after minting: ${web3.utils.fromWei(prdBalanceAfterMint, 'ether')} PRD`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

