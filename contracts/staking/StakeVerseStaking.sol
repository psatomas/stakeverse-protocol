// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract StakeVerseStaking is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable stakingToken;

    uint256 public rewardRate = 5; // 5% APR

    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public stakingTimestamp;

    constructor(address tokenAddress, address initialOwner)
        Ownable(initialOwner)
    {
        stakingToken = IERC20(tokenAddress);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Invalid amount");

        stakingToken.safeTransferFrom(msg.sender, address(this), amount);

        stakedBalance[msg.sender] += amount;

        if (stakingTimestamp[msg.sender] == 0) {
            stakingTimestamp[msg.sender] = block.timestamp;
        }
    }

    function unstake(uint256 amount) external nonReentrant {
        require(amount > 0, "Invalid amount");
        require(stakedBalance[msg.sender] >= amount, "Insufficient balance");

        stakedBalance[msg.sender] -= amount;

        stakingToken.safeTransfer(msg.sender, amount);

        if (stakedBalance[msg.sender] == 0) {
            stakingTimestamp[msg.sender] = 0;
        }
    }

    function calculateRewards(address user) public view returns (uint256) {
        if (stakedBalance[user] == 0 || stakingTimestamp[user] == 0) {
            return 0;
        }

        uint256 stakingDuration = block.timestamp - stakingTimestamp[user];

        return (
            stakedBalance[user] *
            rewardRate *
            stakingDuration
        ) / (365 days * 100);
    }

    function claimRewards() external nonReentrant {
        uint256 reward = calculateRewards(msg.sender);

        require(reward > 0, "No rewards");

        stakingTimestamp[msg.sender] = block.timestamp;

        stakingToken.safeTransfer(msg.sender, reward);
    }

    function setRewardRate(uint256 newRate) external onlyOwner {
        require(newRate <= 100, "Too high");
        rewardRate = newRate;
    }
}