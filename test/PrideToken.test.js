import { expect } from 'chai';
import pkg from 'hardhat';

const { ethers } = pkg;

describe("PrideToken", function () {
  let prideToken, owner, addr1, addr2, addrs;

  beforeEach(async function () {
    const PrideToken = await ethers.getContractFactory("PrideToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    prideToken = await PrideToken.deploy(ethers.utils.parseUnits("1000000", 18), owner.address);
    await prideToken.deployed();
  });

  it("Should set the right owner", async function () {
    expect(await prideToken.owner()).to.equal(owner.address);
  });

  it("Should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await prideToken.balanceOf(owner.address);
    expect(await prideToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    await prideToken.transfer(addr1.address, ethers.utils.parseUnits("50", 18));
    const addr1Balance = await prideToken.balanceOf(addr1.address);
    expect(addr1Balance.eq(ethers.utils.parseUnits("50", 18))).to.be.true;

    await prideToken.connect(addr1).transfer(addr2.address, ethers.utils.parseUnits("50", 18));
    const addr2Balance = await prideToken.balanceOf(addr2.address);
    expect(addr2Balance.eq(ethers.utils.parseUnits("50", 18))).to.be.true;
  });
});

