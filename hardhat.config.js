require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const { MUMBAI_URL, GOERLI_URL, PRIVATE_KEY, RECEICER_PRIVATE_KEY } = process.env;

module.exports = {
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts:[`0x${PRIVATE_KEY}`],
    },
    polygon_mumbai: {
      url: MUMBAI_URL,
      accounts: [`0x${RECEICER_PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: '0.8.7',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  }
}