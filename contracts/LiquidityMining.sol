// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LiquidityMining is Ownable {
    IERC20 public rewardToken;
    IERC20 public lpToken;
    uint256 public rewardRate;

    struct UserInfo {
        uint256 amount;     // How many LP tokens the user has staked.
        uint256 rewardDebt; // Reward debt.
    }

    mapping(address => UserInfo) public userInfo;
    uint256 public totalStaked;
    uint256 public accTokenPerShare;
    uint256 public lastRewardBlock;

    event Stake(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event Claim(address indexed user, uint256 reward);

    constructor(IERC20 _rewardToken, IERC20 _lpToken, uint256 _rewardRate) Ownable(msg.sender) {
        rewardToken = _rewardToken;
        lpToken = _lpToken;
        rewardRate = _rewardRate;
        lastRewardBlock = block.number;
    }

    function updatePool() internal {
        if (block.number <= lastRewardBlock) {
            return;
        }
        if (totalStaked == 0) {
            lastRewardBlock = block.number;
            return;
        }

        uint256 reward = (block.number - lastRewardBlock) * rewardRate;
        accTokenPerShare += reward * 1e12 / totalStaked;
        lastRewardBlock = block.number;
    }

    function stake(uint256 amount) public {
        UserInfo storage user = userInfo[msg.sender];
        updatePool();

        if (user.amount > 0) {
            uint256 pending = user.amount * accTokenPerShare / 1e12 - user.rewardDebt;
            if (pending > 0) {
                rewardToken.transfer(msg.sender, pending);
            }
        }

        lpToken.transferFrom(msg.sender, address(this), amount);
        user.amount += amount;
        user.rewardDebt = user.amount * accTokenPerShare / 1e12;
        totalStaked += amount;

        emit Stake(msg.sender, amount);
    }

    function withdraw(uint256 amount) public {
        UserInfo storage user = userInfo[msg.sender];
        require(user.amount >= amount, "withdraw: not good");

        updatePool();

        uint256 pending = user.amount * accTokenPerShare / 1e12 - user.rewardDebt;
        if (pending > 0) {
            rewardToken.transfer(msg.sender, pending);
        }

        user.amount -= amount;
        user.rewardDebt = user.amount * accTokenPerShare / 1e12;
        lpToken.transfer(msg.sender, amount);
        totalStaked -= amount;

        emit Withdraw(msg.sender, amount);
    }

    function claimRewards() public {
        UserInfo storage user = userInfo[msg.sender];
        updatePool();

        uint256 pending = user.amount * accTokenPerShare / 1e12 - user.rewardDebt;
        if (pending > 0) {
            rewardToken.transfer(msg.sender, pending);
            emit Claim(msg.sender, pending);
        }

        user.rewardDebt = user.amount * accTokenPerShare / 1e12;
    }
}

