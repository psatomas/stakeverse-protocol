// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract StakeVerseStaking is Ownable, ReentrancyGuard {

    IERC20 public immutable stakingToken;

    uint256 public rewardRate = 5;

    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public stakingTimestamp;

    constructor(address tokenAddress, address initialOwner)
        Ownable(initialOwner)
    {
        stakingToken = IERC20(tokenAddress);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");

        stakingToken.transferFrom(msg.sender, address(this), amount);

        stakedBalance[msg.sender] += amount;
        stakingTimestamp[msg.sender] = block.timestamp;
    }

    function unstake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than zero");
        require(stakedBalance[msg.sender] >= amount, "Insufficient staked balance");

        stakedBalance[msg.sender] -= amount;

        stakingToken.transfer(msg.sender, amount);
    }

    function calculateRewards(address user) public view returns (uint256) {
        uint256 stakingDuration = block.timestamp - stakingTimestamp[user];

        uint256 reward = (
            stakedBalance[user] *
            rewardRate *
            stakingDuration
        ) / (365 days * 100);

        return reward;
    }

    function claimRewards() external nonReentrant {
        uint256 reward = calculateRewards(msg.sender);

        require(reward > 0, "No rewards available");

        stakingTimestamp[msg.sender] = block.timestamp;

        stakingToken.transfer(msg.sender, reward);
    }

    function setRewardRate(uint256 newRate) external onlyOwner {
        rewardRate = newRate;
    }
}