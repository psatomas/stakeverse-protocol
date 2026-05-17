// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakeVerseDAO is Ownable {

    IERC20 public governanceToken;

    uint256 public proposalCount;

    struct Proposal {
        uint256 id;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 deadline;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;

    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(
        uint256 indexed proposalId,
        string description,
        uint256 deadline
    );

    event Voted(
        uint256 indexed proposalId,
        address indexed voter,
        bool support,
        uint256 votingPower
    );

    event ProposalExecuted(
        uint256 indexed proposalId,
        bool passed
    );

    constructor(address tokenAddress, address initialOwner)
        Ownable(initialOwner)
    {
        governanceToken = IERC20(tokenAddress);
    }

    function createProposal(
        string memory description,
        uint256 durationInSeconds
    ) external onlyOwner {

        proposalCount++;

        proposals[proposalCount] = Proposal({
            id: proposalCount,
            description: description,
            yesVotes: 0,
            noVotes: 0,
            deadline: block.timestamp + durationInSeconds,
            executed: false
        });

        emit ProposalCreated(
            proposalCount,
            description,
            block.timestamp + durationInSeconds
        );
    }

    function vote(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];

        require(proposal.id != 0, "Proposal does not exist");
        require(block.timestamp < proposal.deadline, "Voting period ended");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        uint256 votingPower = governanceToken.balanceOf(msg.sender);

        require(votingPower > 0, "No governance tokens");

        hasVoted[proposalId][msg.sender] = true;

        if (support) {
            proposal.yesVotes += votingPower;
        } else {
            proposal.noVotes += votingPower;
        }

        emit Voted(
            proposalId,
            msg.sender,
            support,
            votingPower
        );
    }

    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];

        require(proposal.id != 0, "Proposal does not exist");
        require(block.timestamp >= proposal.deadline, "Voting still active");
        require(!proposal.executed, "Proposal already executed");

        proposal.executed = true;

        bool passed = proposal.yesVotes > proposal.noVotes;

        emit ProposalExecuted(proposalId, passed);
    }

    function getProposal(
        uint256 proposalId
    ) external view returns (Proposal memory) {
        return proposals[proposalId];
    }
}