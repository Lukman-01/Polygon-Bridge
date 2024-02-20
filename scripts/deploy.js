// Import the Hardhat runtime environment and ethers library for interacting with Ethereum
const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  // Retrieve the list of accounts from the connected Ethereum node and use the first account as the deployer
  const [deployer] = await ethers.getSigners();

  // Log the address of the account deploying the contracts for verification purposes
  console.log('Deploying contracts with the account:', deployer.address);

  // Define the name and symbol for the NFT collection to be deployed
  const name = 'NFTCollection';
  const symbol = 'NFT';
  // Prepare the constructor arguments for the NFT collection contract
  const contractArgs = [name, symbol];

  // Get a contract factory for the NFTCollection, an abstraction used to deploy new smart contracts
  const NFTCollection = await ethers.getContractFactory('NFTCollection');
  // Deploy a new NFTCollection contract using the deployer account and the specified constructor arguments
  const contract = await NFTCollection.deploy(...contractArgs);

  // Await the contract to be fully deployed and transaction to be mined
  await contract.deployed();

  // Log the address of the deployed NFTCollection contract for reference
  console.log('NFTCollection Contract deployed to:', contract.address);
}

// Execute the main function, handling success with a process exit code 0, and catch any errors, logging them and exiting with code 1
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
