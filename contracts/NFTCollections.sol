// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";

/**
 * @title NFT Collection
 * @dev Extends ERC721A to implement a custom NFT collection with additional metadata and minting functionality.
 */
contract NFTCollection is ERC721A {

    /// @notice Array of all minted token IDs.
    uint256[] public tokenIds;

    /// @notice Array of URIs for each token.
    string[] public tokenURIs;

    /// @dev Mapping from token ID to its description.
    mapping(uint256 => string) private _tokenDescriptions;

    /// @dev Mapping to track whether a token ID has been used.
    mapping(uint256 => bool) private _tokenIdUsed;

    /**
     * @dev Sets the name and symbol for the NFT collection upon contract deployment.
     * @param name The name of the NFT collection.
     * @param symbol The symbol of the NFT collection.
     */
    constructor(string memory name, string memory symbol)
        ERC721A(name, symbol)
    {}

    /**
     * @dev Modifier to ensure a token ID has not been previously used.
     * @param tokenId The token ID to check.
     */
    modifier isTokenIdUnused(uint256 tokenId) {
        require(!_tokenIdUsed[tokenId], "Token ID already used");
        _;
    }

    /**
     * @notice Mints a new token to a specified address with a unique token ID, URI, and description.
     * @dev Checks if the token ID is unused and the recipient address is valid before minting.
     * @param recipient The address to mint the token to.
     * @param tokenId The unique identifier for the token.
     * @param tokenURI The URI containing metadata for the token.
     * @param description A textual description of the token.
     */
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

    /**
     * @notice Retrieves the URI for a given token ID.
     * @param tokenId The identifier of the token to fetch the URI for.
     * @return The token URI associated with the given token ID.
     */
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURIs[tokenId];
    }

    /**
     * @notice Fetches the description for a specific token based on its ID.
     * @param tokenId The identifier of the token to fetch the description for.
     * @return The description of the token.
     */
    function promptDescription(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return _tokenDescriptions[tokenId];
    }

    /**
     * @notice Mints multiple tokens to multiple addresses, each with unique token IDs, URIs, and descriptions.
     * @dev Iterates through the provided arrays, minting each token to the corresponding recipient.
     * @param recipients An array of addresses to receive the tokens.
     * @param tokenIdInput An array of unique token IDs for the new tokens.
     * @param batchTokenURIs An array of URIs for the new tokens.
     * @param descriptions An array of descriptions for the new tokens.
     */
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
