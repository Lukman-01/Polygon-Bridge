// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";

contract AdesdeskNFTCollection is ERC721A {

    uint256[] public tokenIds;
    string[] public tokenURIs;
    mapping(uint256 => string) private _tokenDescriptions;
    mapping(uint256 => bool) private _tokenIdUsed;

    constructor(string memory name, string memory symbol)
        ERC721A(name, symbol)
    {}

    modifier isTokenIdUnused(uint256 tokenId) {
        require(!_tokenIdUsed[tokenId], "Token ID already used");
        _;
    }

    function mint(
        address recipient,
        uint256 tokenId,
        string memory tokenURI,
        string memory description
    ) public isTokenIdUnused(tokenId) {
        require(recipient != address(0), "Cannot mint to the zero address");
        _mint(recipient, tokenId);
        tokenIds.push(tokenId);
        tokenURIs.push(tokenURI);
        _tokenDescriptions[tokenId] = description;
        _tokenIdUsed[tokenId] = true;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURIs[tokenId];
    }

    function promptDescription(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return _tokenDescriptions[tokenId];
    }

    function batchMint(
        address[] memory recipients,
        uint256[] memory tokenIdInput,
        string[] memory batchTokenURIs,
        string[] memory descriptions
    ) public {
        require(
            recipients.length == batchTokenURIs.length &&
            recipients.length == descriptions.length,
            "Input arrays length mismatch"
        );

        for (uint256 i = 0; i < recipients.length; i++) {
            mint(recipients[i], tokenIdInput[i], batchTokenURIs[i], descriptions[i]);
        }
    }
}
