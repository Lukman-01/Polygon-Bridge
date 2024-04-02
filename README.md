Project Name: Migrating NFTs to Polygon with Bridge Integration

Overview: This initiative demonstrates the transition of a Non-Fungible Token (NFT) project from the Ethereum blockchain to Polygon to boost its market appeal and reduce transaction fees. The process starts with the establishment of an NFT collection on Ethereum, which is subsequently mapped and transferred to Polygon using the Polygon Bridge. Uniquely, the project utilizes the lexica image generation tool for crafting NFT images, which are then uploaded to IPFS via pinata.cloud. The NFT contract is equipped with a "promptDescription" function, providing the creative prompt behind each NFT's image upon request.

The project includes scripts developed in hardhat for mass minting of NFTs, adhering to the ERC721A standard, and for the bulk relocation of NFTs from Ethereum to the Polygon Mumbai network through the FxPortal Bridge. This involves authorizing the NFTs for transfer, depositing them into the Bridge, and subsequently verifying the "balanceOf" function on the Mumbai network post-state synchronization.

Setup Instructions: 
1. **Installation:**
    - Clone the repository to your local machine using the command: `git clone https://github.com/Lukman-01/Polygon-Bridge.git
    - Access the cloned directory through a command line interface of your choice, such as VSCode's integrated terminal.

2. **Program Execution:**
    - Within the terminal, ensure the current directory is set to `Building-with-Polygon-Bridge`, then execute `yarn install` to install necessary dependencies.
    - Create a `.env` file in the project root and define all required environment variables as referenced in the project scripts.
    - To initiate the project's scripts, execute the following commands sequentially:
        - Deploy the NFT contract: `npx hardhat run scripts/deploy.js --network goerli`
        - Mint NFTs in batches: `npx hardhat run scripts/batchMint.js --network goerli`
        - Transfer NFTs in batches to Polygon: `npx hardhat run scripts/batchTransfer.js --network goerli`
        - Post-transfer, wait approximately 30 minutes for chain state synchronization before running: `npx hardhat run scripts/testBalanceOf.js --network mumbai` to verify the transfer.