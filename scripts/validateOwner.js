const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const contractAddress = "0x1B0b2647Fc522417d79d8080F9D41977f03D3C46"; // Latest Deployment Contract Address
  const PrideToken = await ethers.getContractFactory("PrideToken");
  const prideToken = PrideToken.attach(contractAddress);

  // Query owner to validate
  const owner = await prideToken.owner();
  console.log("Owner of contract:", owner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

