// @ts-ignore
import { ethers, getNamedAccounts, network } from "hardhat";
import { networkConfig, amount } from "../helper-hardhat-config";

export async function getWeth() {
    const { deployer } = await getNamedAccounts();
    const iWeth = await ethers.getContractAt(
        "IWeth",
        networkConfig[network.config!.chainId!].wethToken!,
        deployer
    );
    const txResponse = await iWeth.deposit({
        value: ethers.utils.parseEther(amount.toString()),
    });
    await txResponse.wait(1);
    const wethBalance = await iWeth.balanceOf(deployer);
    console.log(`Got ${wethBalance.toString()} WETH`);
}
