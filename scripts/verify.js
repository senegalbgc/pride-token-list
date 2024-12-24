const hre = require("hardhat");

async function main() {
  const contractAddress = "0x1B0b2647Fc522417d79d8080F9D41977f03D3C46"; // Your deployed contract address
  const constructorArguments = ["1000000000000000000000000", "0x327EF4f03CAE0a79A08d6c3984714d8f183cf7eB"]; // Arguments during deployment

  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: constructorArguments,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

