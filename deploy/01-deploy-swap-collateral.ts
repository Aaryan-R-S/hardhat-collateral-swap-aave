import { getNamedAccounts, deployments, network, run } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config";
import verify from "../utils/verify";

const deploySwapCollateralAave: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network, ethers } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    let wethToken = networkConfig[network.config.chainId!]["wethToken"];
    let lendingPoolAddressesProvider =
        networkConfig[network.config.chainId!]["lendingPoolAddressesProvider"];
    let daiEthPriceFeed =
        networkConfig[network.config.chainId!]["daiEthPriceFeed"];
    let daiToken = networkConfig[network.config.chainId!]["daiToken"];
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("----------------------------------------------------");
    const args: any[] = [
        wethToken,
        lendingPoolAddressesProvider,
        daiEthPriceFeed,
        daiToken,
    ];
    const swapCollateralAave = await deploy("SwapCollateralAave", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    });

    // Verify the deployment
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("Verifying...");
        await verify(swapCollateralAave.address, args);
    }
    log("----------------------------------------------------");
};
export default deploySwapCollateralAave;
deploySwapCollateralAave.tags = ["all", "swapcollateralaave"];
