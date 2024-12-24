// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrideToken is ERC20, Ownable {
    constructor(uint256 initialSupply, address initialOwner) ERC20("PrideToken", "PRD") Ownable(initialOwner) {
        require(initialSupply > 0, "Initial supply must be greater than zero");
        require(initialOwner != address(0), "Invalid initial owner address");

        // Mint initial supply and check the contract state
        _mint(initialOwner, initialSupply);
        assert(totalSupply() == initialSupply);  // Confirm state 
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than zero");

        // Mint additional supply and check the contract state
        _mint(to, amount);
        assert(totalSupply() >= amount);  // Confirm state 
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(amount <= balanceOf(_msgSender()), "ERC20: transfer amount exceeds balance");
        return super.transfer(recipient, amount);
    }
}

