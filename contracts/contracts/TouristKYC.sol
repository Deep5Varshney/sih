// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TouristKYC {
    struct KYC {
        string cid;     // IPFS CID
        uint256 date;   // timestamp when uploaded
    }

    mapping(address => KYC) public kycs;

    event KYCStored(address indexed user, string cid, uint256 date);

    function storeCidForUser(address user, string memory cid) public {
        kycs[user] = KYC(cid, block.timestamp);
        emit KYCStored(user, cid, block.timestamp);
    }

    function getCidForUser(address user) public view returns (string memory) {
        return kycs[user].cid;
    }
}
