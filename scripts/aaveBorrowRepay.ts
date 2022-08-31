import { ethers, getNamedAccounts, network } from "hardhat"
import { getWeth } from "./getWeth"
import { networkConfig, amount } from"../helper-hardhat-config"
import { ILendingPool } from "../typechain-types"
import { Address } from "hardhat-deploy/dist/types"
import { BigNumber } from "ethers"

async function main() {
    // 1. DEPOSIT COLLATERAL
    const { deployer } = await getNamedAccounts();
    // Get Wrapped Ether
    await getWeth();
    // Get lending pool contract address
    const lendingPool:ILendingPool = await getLendingPool(deployer);
    // Get Weth token contract address
    const wethTokenAddress = networkConfig[network.config!.chainId!].wethToken!;
    // Approve lending pool contract to withdraw weth from deployer's account
    await approveErc20(
        wethTokenAddress,
        lendingPool.address,
        (ethers.utils.parseEther(amount.toString())).toString(),
        deployer
    );
    // Deposit weth as collateral in the lending pool contract
    console.log("Depositing WETH...");
    await lendingPool.deposit(
        wethTokenAddress,
        (ethers.utils.parseEther(amount.toString())).toString(),
        deployer,
        0
    );
    console.log("Desposited!");

    // 2. BORROW ANOTHER ASSET (DAI)
    // Getting the borrowing stats
    let returnData = await getBorrowUserData(
        lendingPool,
        deployer
    );
    let availableBorrowsETH = returnData[0]
    // Get DAI price
    const daiPrice = await getDaiPrice();
    console.log(`Dai Price: ${daiPrice}`);
    const amountDaiToBorrow = availableBorrowsETH.div(daiPrice)
    const amountDaiToBorrowWei = ethers.utils.parseEther(amountDaiToBorrow.toString())
    console.log(`You can borrow ${amountDaiToBorrow.toString()} DAI`);
    console.log(`You can borrow ${amountDaiToBorrowWei.toString()} DAI`);
    // Borrow DAI using collateral deposited
    await borrowDai(
        networkConfig[network.config!.chainId!].daiToken!,
        lendingPool,
        amountDaiToBorrowWei.toString(),
        deployer
    );
    await getBorrowUserData(lendingPool, deployer);
    // 3. REPAY DAI
    await repay(
        amountDaiToBorrowWei.toString(),
        networkConfig[network.config!.chainId!].daiToken!,
        lendingPool,
        deployer
    );
    // Getting the borrowing stats
    await getBorrowUserData(lendingPool, deployer);
}

async function repay(amount:string, daiAddress:string, lendingPool:ILendingPool, account:Address) {
    await approveErc20(daiAddress, lendingPool.address, amount, account);
    const repayTx = await lendingPool.repay(daiAddress, amount, 1, account);
    await repayTx.wait(1);
    console.log("Repaid!");
}

async function borrowDai(daiAddress:string, lendingPool:ILendingPool, amountDaiToBorrow:string, account:Address) {
    const borrowTx = await lendingPool.borrow(
        daiAddress,
        amountDaiToBorrow,
        1,
        0,
        account
    );
    await borrowTx.wait(1);
    console.log("You've borrowed!");
}

async function getLendingPool(account: Address): Promise<ILendingPool> {
    const lendingPoolAddressesProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider",
        networkConfig[network.config!.chainId!].lendingPoolAddressesProvider!,
        account
    );
    const lendingPoolAddress =
        await lendingPoolAddressesProvider.getLendingPool();
    const lendingPool:ILendingPool = await ethers.getContractAt(
        "ILendingPool",
        lendingPoolAddress,
        account
    );
    return lendingPool;
}

async function approveErc20(erc20Address:string, spenderAddress:string, amount:string, signer:Address) {
    const erc20Token = await ethers.getContractAt(
        "IERC20",
        erc20Address,
        signer
    );
    let txResponse = await erc20Token.approve(spenderAddress, amount);
    await txResponse.wait(1);
    console.log("Approved!");
}

async function getBorrowUserData(lendingPool:ILendingPool, account:Address): Promise<[BigNumber, BigNumber]> {
    const { totalCollateralETH, totalDebtETH, availableBorrowsETH } =
        await lendingPool.getUserAccountData(account);
    console.log(`You have ${totalCollateralETH} worth of ETH deposited.`);
    console.log(`You have ${totalDebtETH} worth of ETH borrowed.`);
    console.log(`You can borrow ${availableBorrowsETH} worth of ETH.`);
    return [ availableBorrowsETH, totalDebtETH ];
}

async function getDaiPrice() {
    const daiEthPriceFeed = await ethers.getContractAt(
        "AggregatorV3Interface",
        networkConfig[network.config!.chainId!].daiEthPriceFeed!
    );
    const price = (await daiEthPriceFeed.latestRoundData())[1];
    console.log(`The DAI/ETH price is ${price.toString()}`);
    return price;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
