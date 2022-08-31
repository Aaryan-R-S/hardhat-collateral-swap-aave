import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "bignumber.js";
import { assert, expect } from "chai";
import { network, deployments, ethers } from "hardhat";
import {
    amount,
    developmentChains,
    networkConfig,
} from "../../helper-hardhat-config";
import {
    SwapCollateralAave,
    IERC20,
    AggregatorV3Interface,
    IWeth,
    ILendingPool,
    ILendingPoolAddressesProvider,
} from "../../typechain-types";

describe("SwapCollateralAave", function () {
    let swapCollateralAave: SwapCollateralAave;
    let iWeth: IWeth;
    let iLendingPoolAddressesProvider: ILendingPoolAddressesProvider;
    let iLendingPool: ILendingPool;
    let aggregatorV3Interface: AggregatorV3Interface;
    let iERC20: IERC20;
    let deployer: SignerWithAddress;
    let amountUsed = ethers.utils.parseEther(amount.toString());

    beforeEach(async () => {
        if (!developmentChains.includes(network.name)) {
            throw "You need to be on a development chain to run tests";
        }
        const accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["all"]);
        swapCollateralAave = await ethers.getContract("SwapCollateralAave");
        iWeth = await ethers.getContractAt(
            "IWeth",
            networkConfig[network.config!.chainId!].wethToken!,
            deployer
        );

        iLendingPoolAddressesProvider = await ethers.getContractAt(
            "ILendingPoolAddressesProvider",
            networkConfig[network.config!.chainId!]
                .lendingPoolAddressesProvider!,
            deployer
        );
        const lendingPoolAddress =
            await iLendingPoolAddressesProvider.getLendingPool();
        iLendingPool = await ethers.getContractAt(
            "ILendingPool",
            lendingPoolAddress,
            deployer
        );

        iERC20 = await ethers.getContractAt(
            "IERC20",
            networkConfig[network.config!.chainId!].daiToken!,
            deployer
        );
        aggregatorV3Interface = await ethers.getContractAt(
            "AggregatorV3Interface",
            networkConfig[network.config!.chainId!].daiEthPriceFeed!,
            deployer
        );
    });

    describe("constructor", function () {
        it("sets the wethToken, lendingPoolAddressesProvider, daiEthPriceFeed, and daiToken addresses correctly", async () => {
            let response = await swapCollateralAave.getWethToken();
            assert.equal(response, iWeth.address);
            response =
                await swapCollateralAave.getLendingPoolAdressesProvider();
            assert.equal(response, iLendingPoolAddressesProvider.address);
            response = await swapCollateralAave.getDaiEthPriceFeed();
            assert.equal(response, aggregatorV3Interface.address);
            response = await swapCollateralAave.getDaiToken();
            assert.equal(response, iERC20.address);
        });
    });

    describe("getWeth", function () {
        it("fails if you send no or zero ETH", async () => {
            await expect(swapCollateralAave.getWeth()).to.be.revertedWith(
                "SwapCollateralAave__NoETHSent"
            );
        });

        it("emits an event on getting Weth", async () => {
            await expect(
                await swapCollateralAave.getWeth({
                    value: ethers.utils.parseEther(amount.toString()),
                })
            ).to.emit(swapCollateralAave, "GotWeth");
        });
    });

    describe("setLendingPool", function () {
        it("sets lending pool address", async () => {
            await swapCollateralAave.setLendingPool();
            let response = await swapCollateralAave.getLendingPool();
            assert.equal(response, iLendingPool.address);
        });
    });

    describe("approveERC20", function () {
        it("fails if you approve no or zero Weth", async () => {
            await expect(swapCollateralAave.approveERC20(0)).to.be.revertedWith(
                "SwapCollateralAave__NoWethToApprove"
            );
        });

        it("emits an event on approving usage of Weth by lending pool contract", async () => {
            await expect(
                swapCollateralAave.approveERC20(
                    ethers.utils.parseEther(amount.toString())
                )
            ).to.emit(swapCollateralAave, "ApprovedERC20");
        });
    });

    describe("depositCollateral", function () {
        beforeEach(async () => {
            await swapCollateralAave.getWeth({
                value: ethers.utils.parseEther(amount.toString()),
            });
            await swapCollateralAave.setLendingPool();
            await swapCollateralAave.approveERC20(
                ethers.utils.parseEther(amount.toString())
            );
        });

        it("fails if you deposit no or zero Weth", async () => {
            await expect(
                swapCollateralAave.depositCollateral(0)
            ).to.be.revertedWith("SwapCollateralAave__NoWethToDeposit");
        });

        it("emits an event on depositing Weth as collateral", async () => {
            await expect(
                swapCollateralAave.depositCollateral(
                    ethers.utils.parseEther(amount.toString())
                )
            ).to.emit(swapCollateralAave, "CollateralDeposited");
        });
    });

    describe("getBorrowUserData", function () {
        beforeEach(async () => {
            await swapCollateralAave.getWeth({
                value: ethers.utils.parseEther(amount.toString()),
            });
            await swapCollateralAave.setLendingPool();
            await swapCollateralAave.approveERC20(
                ethers.utils.parseEther(amount.toString())
            );
            await swapCollateralAave.depositCollateral(
                ethers.utils.parseEther(amount.toString())
            );
        });

        it("returns borrow user's data", async () => {
            let [totalCollateralETH, totalDebtETH, availableBorrowsETH] =
                await swapCollateralAave.getBorrowUserData();
            console.log("totalCollateralETH: " + totalCollateralETH.toString());
            console.log("totalDebtETH: " + totalDebtETH.toString());
            console.log(
                "availableBorrowsETH: " + availableBorrowsETH.toString()
            );

            assert.equal(totalCollateralETH.toString(), amountUsed.toString());
            assert.equal(totalDebtETH.toString(), "0");
        });
    });

    describe("borrowDai", function () {
        beforeEach(async () => {
            await swapCollateralAave.getWeth({ value: amountUsed });
            await swapCollateralAave.setLendingPool();
            await swapCollateralAave.approveERC20(
                ethers.utils.parseEther(amount.toString())
            );
            await swapCollateralAave.depositCollateral(
                ethers.utils.parseEther(amount.toString())
            );
        });

        it("fails if you borrow no or zero dai", async () => {
            await expect(swapCollateralAave.borrowDai(0)).to.be.revertedWith(
                "SwapCollateralAave__NoDaiAmountSpecified"
            );
        });

        it("borrows the dai token using collateral deposited", async () => {
            let [totalCollateralETH, totalDebtETH, availableBorrowsETH] =
                await swapCollateralAave.getBorrowUserData();
            console.log("totalCollateralETH: " + totalCollateralETH);
            console.log("totalDebtETH: " + totalDebtETH);
            console.log("availableBorrowsETH: " + availableBorrowsETH);

            let daiPrice = await swapCollateralAave.getDaiPrice();
            console.log(`Dai Price: ${daiPrice}`);
            const amountDaiToBorrow = availableBorrowsETH.div(daiPrice);
            const amountDaiToBorrowWei = ethers.utils.parseEther(
                amountDaiToBorrow.toString()
            );
            console.log(`amountDaiToBorrow: ${amountDaiToBorrow.toString()}`);
            console.log(
                `amountDaiToBorrowWei: ${amountDaiToBorrowWei.toString()}`
            );

            const borrowTx = await iLendingPool.borrow(
                iERC20.address,
                amountDaiToBorrowWei,
                1,
                0,
                deployer.address
            );
            await borrowTx.wait(1);
            console.log("You've borrowed!");

            // await expect(
            //     await swapCollateralAave.borrowDai(amountDaiToBorrowWei)
            // ).to.emit(swapCollateralAave, "DaiTokenBorrowed");
            // console.log("You've borrowed!");

            let [totalCollateralETH1, totalDebtETH1, availableBorrowsETH1] =
                await swapCollateralAave.getBorrowUserData();
            console.log("totalCollateralETH: " + totalCollateralETH1);
            console.log("totalDebtETH: " + totalDebtETH1);
            console.log("availableBorrowsETH: " + availableBorrowsETH1);
        });
    });

    describe("repayDai", function () {
        beforeEach(async () => {
            await swapCollateralAave.getWeth({ value: amountUsed });
            await swapCollateralAave.setLendingPool();
            await swapCollateralAave.approveERC20(
                ethers.utils.parseEther(amount.toString())
            );
            await swapCollateralAave.depositCollateral(
                ethers.utils.parseEther(amount.toString())
            );
        });

        it("fails if you repay no or zero dai", async () => {
            await expect(swapCollateralAave.repay(0)).to.be.revertedWith(
                "SwapCollateralAave__NoDaiAmountSpecified"
            );
        });

        it("repays the dai token", async () => {
            let [totalCollateralETH, totalDebtETH, availableBorrowsETH] =
                await swapCollateralAave.getBorrowUserData();
            console.log("totalCollateralETH: " + totalCollateralETH);
            console.log("totalDebtETH: " + totalDebtETH);
            console.log("availableBorrowsETH: " + availableBorrowsETH);

            let daiPrice = await swapCollateralAave.getDaiPrice();
            console.log(`Dai Price: ${daiPrice}`);
            const amountDaiToBorrow = availableBorrowsETH.div(daiPrice);
            const amountDaiToBorrowWei = ethers.utils.parseEther(
                amountDaiToBorrow.toString()
            );
            console.log(`amountDaiToBorrow: ${amountDaiToBorrow.toString()}`);
            console.log(
                `amountDaiToBorrowWei: ${amountDaiToBorrowWei.toString()}`
            );

            const borrowTx = await iLendingPool.borrow(
                iERC20.address,
                amountDaiToBorrowWei,
                1,
                0,
                deployer.address
            );
            await borrowTx.wait(1);
            console.log("You've borrowed!");

            // await expect(
            //     await swapCollateralAave.borrowDai(amountDaiToBorrowWei)
            // ).to.emit(swapCollateralAave, "DaiTokenBorrowed");
            // console.log("You've borrowed!");

            let txResponse = await iERC20.approve(iLendingPool.address, amountDaiToBorrowWei);
            await txResponse.wait(1);
            console.log("Approved!");
            
            let [totalCollateralETH1, totalDebtETH1, availableBorrowsETH1] =
                await swapCollateralAave.getBorrowUserData();
            console.log("totalCollateralETH: " + totalCollateralETH1);
            console.log("totalDebtETH: " + totalDebtETH1);
            console.log("availableBorrowsETH: " + availableBorrowsETH1);
            const repayTx = await iLendingPool.repay(
                iERC20.address,
                amountDaiToBorrowWei,
                1,
                deployer.address
            );
            await repayTx.wait(1);
            console.log("Repaid!");

            // await expect(
            //     await swapCollateralAave.repay(amountDaiToRepayWei)
            // ).to.emit(swapCollateralAave, "DaiTokenRepayed");
            // console.log("Repaid!");

            let [totalCollateralETH2, totalDebtETH2, availableBorrowsETH2] =
                await swapCollateralAave.getBorrowUserData();
            console.log("totalCollateralETH: " + totalCollateralETH2);
            console.log("totalDebtETH: " + totalDebtETH2);
            console.log("availableBorrowsETH: " + availableBorrowsETH2);
        });
    });
});
