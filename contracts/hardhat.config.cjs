require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.LINEA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
