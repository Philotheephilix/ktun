require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: "./src",
  },
  networks: {
    opencampus: {
      url: `https://rpc.open-campus-codex.gelato.digital/`,
      accounts: [process.env.PRIVATE_KEY],
    },
    filecoin_calibration: {
      url: "https://api.calibration.node.glif.io/rpc/v1",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 314159,
      gas: 40000000000,
    },
  },
  etherscan: {
    apiKey: {
      opencampus: "EG4XE37A9QENVZEPCZ35YKGEPKY4IKHXPC",
      filecoin_calibration: "placeholder",
    },
    customChains: [
      {
        network: "opencampus",
        chainId: 656476,
        urls: {
          apiURL: "https://opencampus-codex.blockscout.com/api",
          browserURL: "https://opencampus-codex.blockscout.com",
        },
      },
      {
        network: "filecoin_calibration",
        chainId: 314159,
        urls: {
          // Add Filecoin Calibration explorer URLs if available
          apiURL: "https://calibration.filfox.info/api/v1",
          browserURL: "https://calibration.filfox.info/en",
        },
      },
    ],
  },
};