const { ethers } = require("hardhat");
require("dotenv").config();

async function testBalanceOf() {
  // Set up the signer with wallet private key
  const privateKey = process.env.RECEICER_PRIVATE_KEY;
  if (!privateKey) {
      throw new Error("Private key not found in the .env file.");
  }


  // Getting the wallet provider for the Mumbai network
  const providerMumbai = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_URL);
  const signerMumbai = new ethers.Wallet(privateKey, providerMumbai);

  const NFTCollectionContractAtMumbai = await ethers.getContractFactory("NFTCollection");
  const nFTCollectionContractAtMumbai = await NFTCollectionContractAtMumbai.attach("0x7Aee444cfaadE656CF1aAEd82D887cEB66DC5d2F");

  // The address where to check the balance
  const receiverAddress = "0x40feacdeee6f017fA2Bc1a8FB38b393Cf9022d71";

  // Getting the balance of the address
  const balance = await nFTCollectionContractAtMumbai.balanceOf(receiverAddress);
  console.log(`Balance of address ${receiverAddress}: ${balance.toString()}`);
}

// Executing the balanceOf test
testBalanceOf()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// npx hardhat run scripts/testBalanceOf.js --network polygon_mumbai
