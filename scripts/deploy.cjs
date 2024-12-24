// Importing necessary modules from Hardhat
const hre = require("hardhat");

// Ensure ethers is correctly referenced
const { ethers } = hre;

async function main() {
  // Fetching the deployer's account
  const [deployer] = await ethers.getSigners();
  const expectedAddress = "0x327EF4f03CAE0a79A08d6c3984714d8f183cf7eB";

  // Verifying the deployer address
  if (deployer.address.toLowerCase() !== expectedAddress.toLowerCase()) {
    console.error(`Error: Deployer address ${deployer.address} does not match expected address ${expectedAddress}`);
    process.exit(1);
  }

  console.log("Deploying contracts with the account:", deployer.address);

  // Fetching and logging the deployer's balance
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance.toString()));

  // Setting initial supply and owner (adjust values as required)
  const initialSupply = ethers.utils.parseUnits("1000000", 18); // Example initial supply
  const initialOwner = deployer.address;

  // Deploying the PrideToken contract
  console.log("Deploying PrideToken contract...");
  const PrideToken = await hre.ethers.getContractFactory("PrideToken");
  const prideToken = await PrideToken.deploy(initialSupply, initialOwner);
  await prideToken.deployed();

  // Logging the deployed contract address and transaction details
  console.log("PrideToken deployed to:", prideToken.address);
  console.log("Transaction Hash:", prideToken.deployTransaction.hash); // Logging transaction hash
}

// Running the deployment and handling errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

