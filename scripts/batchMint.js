// Import ethers from hardhat, a development environment for Ethereum
const { ethers } = require("hardhat");

// Asynchronous function to batch mint NFTs
async function batchMintNFTs() {
    // Retrieve the private key from environment variables to set up the signer
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
        // If the private key is not found, throw an error
        throw new Error("Private key not found in the .env file.");
    }

    // Connect to the Ethereum Goerli test network using the private key
    const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
    const signer = new ethers.Wallet(privateKey, provider);

    // Define the smart contract address of the NFT collection
    NFTCollectionAddress = "0x1DCA12e97C703Ba8D16599146837617057520282";
    // Get the contract factory for the NFTCollection contract and attach it to the deployed address
    const NFTCollection = await ethers.getContractFactory("NFTCollection");
    const nFTCollection = await NFTCollection.attach(NFTCollectionAddress);

    // Create an array with 5 elements, all set to the signer's address for NFT minting
    const recipients = Array(5).fill(signer.address);
    // Define token IDs for the NFTs to be minted
    const tokenIds = [1, 2, 3, 4, 5];
    // Define token URIs for the NFTs, typically pointing to metadata stored on IPFS
    const tokenURIs = [
        "https://gateway.pinata.cloud/ipfs/QmPHqgWrVkf6rxgE3dTiHXKFcDzL2yHbDGJsB9ktpxM4JJ",
        "https://gateway.pinata.cloud/ipfs/QmVttvEo1AdrxGUvLTVpuhMMdMfmr3hmYzssSKBkFmrTYM",
        "https://gateway.pinata.cloud/ipfs/Qmf7KeLXcmbVRAe5kgtfDnCRYRH7vaLD2Uum72csgzDzic",
        "https://gateway.pinata.cloud/ipfs/QmRjFyeQnPVgiFrNz8fgNowERBVBGGSVp8TYeoLrYwZFKp",
        "https://gateway.pinata.cloud/ipfs/QmdoCCeayKen6DaUnCyTY9EJeZvdVtSvu4mFBRDYcqh3wd"
    ];
    // Define descriptions for each NFT to provide context or story behind the NFT
    const descriptions = [
        "Students studying together",
        "An athlete that won a race",
        "A lady in an astronaut suit in space",
        "A newly married Muslim couple",
        "A happy nuclear family",
    ];

    // Batch mint NFTs by passing recipient addresses, token IDs, URIs, and descriptions to the smart contract
    const minted = await nFTCollection.batchMint(recipients, tokenIds, tokenURIs, descriptions);
    // Wait for the minting transaction to be confirmed
    await minted.wait();
    // Log a confirmation message upon successful minting
    console.log("Batch minting of your NFTs has been completed!");
}

// Execute the batch mint function and handle success or errors
batchMintNFTs()
    .then(() => process.exit(0)) // Exit the process successfully upon completion
    .catch((error) => {
        // Log any errors encountered during execution
        console.error(error);
        process.exit(1); // Exit the process with an error code
});

 