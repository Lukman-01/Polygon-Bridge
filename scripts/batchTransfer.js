const { ethers } = require("hardhat");
const FxERC721RootTunnelABI = require('../FxERC721RootTunnel.json');

async function batchTransferNFTs() {
  const [deployer] = await hre.ethers.getSigners();

  // The address of the root tunnel on Polygon Mumbai
  const rootTunnelAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";  
  // Get an instance of the FxERC721RootTunnel contract
  const FxERC721RootTunnelContract = await ethers.getContractAt(FxERC721RootTunnelABI, rootTunnelAddress);

  // Get an instance of the NFTCollection contract
  const NFTCollectionAddress = "0x1DCA12e97C703Ba8D16599146837617057520282";
  const NFTCollection = await ethers.getContractFactory("NFTCollection");
  const nFTCollection = await NFTCollection.attach(NFTCollectionAddress);

  // The address of the receiver wallet - Polygon Mumbai
  const receiverAddress = "0x40feacdeee6f017fA2Bc1a8FB38b393Cf9022d71";

  // The token IDs you want to transfer
  const tokenIds = [1, 2, 3, 4, 5];

  // 1: Approve the NFTs to be transferred
  for (const tokenId of tokenIds) {
    const approval = await nFTCollection.approve(rootTunnelAddress, tokenId);
    await approval.wait();
    console.log(`Approved token ID ${tokenId} for transfer.`);
  }


  // 2: Deposit the NFTs to the Bridge
  metadata = "0x427920416465";

  // Deposit the NFTs
  for (const tokenId of tokenIds) {
    const depositTx = await FxERC721RootTunnelContract.connect(deployer).deposit(NFTCollectionAddress, receiverAddress, tokenId, metadata);
    await depositTx.wait();
    console.log("NFTs have been deposited to the FxPortal Bridge.");
    console.log("Transfer from goeria to Polygon Mumbai network completed!");
  }
}

// Execute the transfer script
batchTransferNFTs()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});