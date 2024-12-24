const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LiquidityMining", function () {
  let liquidityMining, rewardToken, lpToken, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    rewardToken = await ERC20Mock.deploy("Reward Token", "RT", ethers.utils.parseUnits("1000000", 18));
    lpToken = await ERC20Mock.deploy("LP Token", "LT", ethers.utils.parseUnits("1000000", 18));

    const LiquidityMining = await ethers.getContractFactory("LiquidityMining");
    liquidityMining = await LiquidityMining.deploy(rewardToken.address, lpToken.address, ethers.utils.parseUnits("1", 18));

    await rewardToken.transfer(liquidityMining.address, ethers.utils.parseUnits("100000", 18)); // Fund the contract with reward tokens
  });

  it("Should allow staking LP tokens", async function () {
    await lpToken.connect(owner).approve(liquidityMining.address, ethers.utils.parseUnits("100", 18));
    await liquidityMining.connect(owner).stake(ethers.utils.parseUnits("100", 18));
    const userInfo = await liquidityMining.userInfo(owner.address);
    expect(userInfo.amount).to.equal(ethers.utils.parseUnits("100", 18));
  });

  it("Should allow withdrawing LP tokens", async function () {
    await lpToken.connect(owner).approve(liquidityMining.address, ethers.utils.parseUnits("100", 18));
    await liquidityMining.connect(owner).stake(ethers.utils.parseUnits("100", 18));
    await liquidityMining.connect(owner).withdraw(ethers.utils.parseUnits("100", 18));
    const userInfo = await liquidityMining.userInfo(owner.address);
    expect(userInfo.amount).to.equal(0);
  });

  it("Should distribute rewards correctly", async function () {
    await lpToken.connect(owner).approve(liquidityMining.address, ethers.utils.parseUnits("100", 18));
    await liquidityMining.connect(owner).stake(ethers.utils.parseUnits("100", 18));
    await ethers.provider.send("evm_mine", []); // Mine one block
    await liquidityMining.connect(owner).claimRewards();
    const rewardBalance = await rewardToken.balanceOf(owner.address);
    expect(rewardBalance).to.be.gt(0);
  });
});

