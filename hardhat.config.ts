import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "dotenv/config";
import "solidity-coverage";
import "hardhat-deploy";
import "solidity-coverage";
import { HardhatUserConfig } from "hardhat/config";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const KOVAN_RPC_URL =
    process.env.KOVAN_RPC_URL || "https://kovan.infura.io/v3/your-api-key";
const MAINNET_RPC_URL =
    process.env.MAINNET_RPC_URL ||
    "https://eth-mainnet.alchemyapi.io/v2/your-api-key";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "your-private-key";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "your-api-key";
const REPORT_GAS = process.env.REPORT_GAS || "true";
const COINMARKETCAP_API_KEY =
    process.env.COINMARKETCAP_API_KEY || "your-api-key";

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            forking: {
                url: MAINNET_RPC_URL,
            },
        },
        localhost: {
            chainId: 31337,
            forking: {
                url: MAINNET_RPC_URL,
            },
        },
        kovan: {
            url: KOVAN_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 42,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.4.19",
            },
            {
                version: "0.6.12",
            },
            {
                version: "0.8.8",
            },
        ],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: (REPORT_GAS=="true" ? true : false),
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
};

export default config;
