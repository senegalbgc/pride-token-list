const { ethers } = require("hardhat");
const PancakeRouter = require("@uniswap/v2-periphery/build/IUniswapV2Router02.json"); // Replace with actual PancakeSwap Router ABI

async function main() {
  const [deployer] = await ethers.getSigners();
  const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // PancakeSwap Router on BSC
  const wbnbAddress = "0xBB4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; // Wrapped BNB Address
  
  const prideToken = await ethers.getContractAt("PrideToken", "0xAE62Ca7e7Bc80C800DADc1c4b9175800033537cd");
  const router = new ethers.Contract(routerAddress, PancakeRouter.abi, deployer);
  
  const tokenAmount = ethers.utils.parseUnits("1000000", 18); // Amount of PRD tokens to add
  const bnbAmount = ethers.utils.parseUnits("10", 18); // Amount of BNB to pair with PRD tokens

  // Approve Router to spend tokens
  const approveTx = await prideToken.approve(routerAddress, tokenAmount);
  await approveTx.wait();
  
  // Add Liquidity
  const addLiquidityTx = await router.addLiquidityETH(
    prideToken.address,
    tokenAmount,
    tokenAmount,  // Min amount of PRD accepted
    bnbAmount,  // Min amount of BNB accepted
    deployer.address,
    Math.floor(Date.now() / 1000) + 60 * 20, // Deadline 20 minutes from now
    { value: bnbAmount }
  );
  await addLiquidityTx.wait();
  console.log("Liquidity added successfully.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

