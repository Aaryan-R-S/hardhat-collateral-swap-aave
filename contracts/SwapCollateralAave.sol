// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

/* Imports */
import "./interfaces/IWeth.sol";
import "./interfaces/ILendingPool.sol";
import "./interfaces/AggregatorV3Interface.sol";
import "./interfaces/IERC20.sol";
import "hardhat/console.sol";

/* Errors */

/**@title A sample contract to swap collateral on aave
 * @author Aaryan Raj Saxena
 * @notice This contract is for creating a sample raffle contract
 * @dev This uses Lending Pool, Weth, Aggregatorv3interface and ERC20 interfaces and contracts 
 */
contract SwapCollateralAave {
    /* Type declarations */

    /* State variables */
    IWeth private immutable i_wethToken;
    ILendingPoolAddressesProvider private immutable i_lendingPoolAddressesProvider;
    AggregatorV3Interface private immutable i_daiEthPriceFeed;
    IERC20 private immutable i_daiToken;

    ILendingPool private s_lendingPool;

    /* Events */
    event GotWeth(
        address indexed depositor,
        uint256 amount,
        uint256 balance
    );

    event ApprovedERC20(
        address indexed from,
        address indexed spender,
        uint256 indexed amount
    );

    event CollateralDeposited(
        address indexed depositor,
        uint256 amount
    );

    event DaiTokenBorrowed(
        address indexed borrower,
        uint256 amount
    );

    event DaiTokenRepayed(
        address indexed borrower,
        uint256 amount
    );

    /* Functions */
    constructor(
        address wethToken,
        address lendingPoolAddressesProvider,
        address daiEthPriceFeed,
        address daiToken
    ) public {
        i_wethToken = IWeth(wethToken);
        i_lendingPoolAddressesProvider = ILendingPoolAddressesProvider(
            lendingPoolAddressesProvider
        );
        i_daiEthPriceFeed = AggregatorV3Interface(daiEthPriceFeed);
        i_daiToken = IERC20(daiToken);
    }

    /**
     * @dev This functions get wrapped eth in exchange for eth
     */
    function getWeth() public payable {
        require(msg.value > 0, "SwapCollateralAave__NoETHSent");
        i_wethToken.deposit{value: msg.value}();
        uint256 balance = i_wethToken.balanceOf(msg.sender);
        emit GotWeth(msg.sender, msg.value, balance);
    }

    /**
     * @dev This functions sets lending pool contract address
     */
    function setLendingPool() public {
        s_lendingPool = ILendingPool(i_lendingPoolAddressesProvider.getLendingPool());
    }

    /**
     * @dev This functions approves lending pool contract to withdraw weth from deployer's account
     */
    function approveERC20(uint256 amount) public {
        require(amount > 0, "SwapCollateralAave__NoWethToApprove");
        bool success = i_wethToken.approve(address(s_lendingPool), amount);
        require(success==true, "SwapCollateralAave__NotAbleToApprove");
        emit ApprovedERC20(msg.sender, address(s_lendingPool), amount);
    }

    /**
     * @dev This functions deposits weth as collateral in the lending pool contract
     */
    function depositCollateral(uint256 amount) public {
        require(amount > 0, "SwapCollateralAave__NoWethToDeposit");
        s_lendingPool.deposit(address(i_wethToken), amount, msg.sender, 0);
        emit CollateralDeposited(msg.sender, amount);
    }

    /**
     * @dev This functions gets the borrowing stats
     */
    function getBorrowUserData() public view returns (uint256, uint256, uint256){
        (uint256 totalCollateralETH, uint256 totalDebtETH, uint256 availableBorrowsETH,,,) = s_lendingPool.getUserAccountData(msg.sender);
        return (totalCollateralETH, totalDebtETH, availableBorrowsETH);
    }

    /**
     * @dev This functions borrows DAI (collateral swap in exhchange of Weth/Eth) using collateral deposited
     */
    function borrowDai(uint256 amountDaiToBorrowWei) public payable {
        require(amountDaiToBorrowWei > 0, "SwapCollateralAave__NoDaiAmountSpecified");
        s_lendingPool.borrow(address(i_daiToken), amountDaiToBorrowWei, 1, 0, address(msg.sender));
        emit DaiTokenBorrowed(msg.sender, amountDaiToBorrowWei);
    }

    /**
     * @dev This functions repays Dai
     */
    function repay(uint256 amountDaiToRepayWei) public payable {
        require(amountDaiToRepayWei > 0, "SwapCollateralAave__NoDaiAmountSpecified");
        i_daiToken.approve(address(s_lendingPool), amountDaiToRepayWei);
        s_lendingPool.repay(address(i_daiToken), amountDaiToRepayWei, 1, msg.sender);
        emit DaiTokenRepayed(msg.sender, amountDaiToRepayWei);
    }

    /* Getter Functions */
    function getWethToken() public view returns (address) {
        return address(i_wethToken);
    }

    function getLendingPoolAdressesProvider() public view returns (address) {
        return address(i_lendingPoolAddressesProvider);
    }

    function getDaiEthPriceFeed() public view returns (address) {
        return address(i_daiEthPriceFeed);
    }

    function getDaiToken() public view returns (address) {
        return address(i_daiToken);
    }

    function getLendingPool() public view returns (address) {
        return address(s_lendingPool);
    }

    function getDaiPrice() public view returns (uint256) {
        (, int256 price,,,) = i_daiEthPriceFeed.latestRoundData();
        return uint256(price);
    }

}
