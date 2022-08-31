/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface SwapCollateralAaveInterface extends utils.Interface {
  functions: {
    "approveERC20(uint256)": FunctionFragment;
    "borrowDai(uint256)": FunctionFragment;
    "depositCollateral(uint256)": FunctionFragment;
    "getBorrowUserData()": FunctionFragment;
    "getDaiEthPriceFeed()": FunctionFragment;
    "getDaiPrice()": FunctionFragment;
    "getDaiToken()": FunctionFragment;
    "getLendingPool()": FunctionFragment;
    "getLendingPoolAdressesProvider()": FunctionFragment;
    "getWeth()": FunctionFragment;
    "getWethToken()": FunctionFragment;
    "repay(uint256)": FunctionFragment;
    "setLendingPool()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "approveERC20"
      | "borrowDai"
      | "depositCollateral"
      | "getBorrowUserData"
      | "getDaiEthPriceFeed"
      | "getDaiPrice"
      | "getDaiToken"
      | "getLendingPool"
      | "getLendingPoolAdressesProvider"
      | "getWeth"
      | "getWethToken"
      | "repay"
      | "setLendingPool"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "approveERC20",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "borrowDai",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "depositCollateral",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getBorrowUserData",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDaiEthPriceFeed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDaiPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDaiToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLendingPool",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLendingPoolAdressesProvider",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getWeth", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getWethToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "repay",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setLendingPool",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "approveERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "borrowDai", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBorrowUserData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDaiEthPriceFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDaiPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDaiToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLendingPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLendingPoolAdressesProvider",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getWeth", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getWethToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "repay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setLendingPool",
    data: BytesLike
  ): Result;

  events: {
    "ApprovedERC20(address,address,uint256)": EventFragment;
    "CollateralDeposited(address,uint256)": EventFragment;
    "DaiTokenBorrowed(address,uint256)": EventFragment;
    "DaiTokenRepayed(address,uint256)": EventFragment;
    "GotWeth(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ApprovedERC20"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CollateralDeposited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DaiTokenBorrowed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DaiTokenRepayed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GotWeth"): EventFragment;
}

export interface ApprovedERC20EventObject {
  from: string;
  spender: string;
  amount: BigNumber;
}
export type ApprovedERC20Event = TypedEvent<
  [string, string, BigNumber],
  ApprovedERC20EventObject
>;

export type ApprovedERC20EventFilter = TypedEventFilter<ApprovedERC20Event>;

export interface CollateralDepositedEventObject {
  depositor: string;
  amount: BigNumber;
}
export type CollateralDepositedEvent = TypedEvent<
  [string, BigNumber],
  CollateralDepositedEventObject
>;

export type CollateralDepositedEventFilter =
  TypedEventFilter<CollateralDepositedEvent>;

export interface DaiTokenBorrowedEventObject {
  borrower: string;
  amount: BigNumber;
}
export type DaiTokenBorrowedEvent = TypedEvent<
  [string, BigNumber],
  DaiTokenBorrowedEventObject
>;

export type DaiTokenBorrowedEventFilter =
  TypedEventFilter<DaiTokenBorrowedEvent>;

export interface DaiTokenRepayedEventObject {
  borrower: string;
  amount: BigNumber;
}
export type DaiTokenRepayedEvent = TypedEvent<
  [string, BigNumber],
  DaiTokenRepayedEventObject
>;

export type DaiTokenRepayedEventFilter = TypedEventFilter<DaiTokenRepayedEvent>;

export interface GotWethEventObject {
  depositor: string;
  amount: BigNumber;
  balance: BigNumber;
}
export type GotWethEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  GotWethEventObject
>;

export type GotWethEventFilter = TypedEventFilter<GotWethEvent>;

export interface SwapCollateralAave extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SwapCollateralAaveInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    approveERC20(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    borrowDai(
      amountDaiToBorrowWei: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositCollateral(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getBorrowUserData(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber]>;

    getDaiEthPriceFeed(overrides?: CallOverrides): Promise<[string]>;

    getDaiPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    getDaiToken(overrides?: CallOverrides): Promise<[string]>;

    getLendingPool(overrides?: CallOverrides): Promise<[string]>;

    getLendingPoolAdressesProvider(
      overrides?: CallOverrides
    ): Promise<[string]>;

    getWeth(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getWethToken(overrides?: CallOverrides): Promise<[string]>;

    repay(
      amountDaiToRepayWei: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setLendingPool(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  approveERC20(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  borrowDai(
    amountDaiToBorrowWei: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositCollateral(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getBorrowUserData(
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber, BigNumber]>;

  getDaiEthPriceFeed(overrides?: CallOverrides): Promise<string>;

  getDaiPrice(overrides?: CallOverrides): Promise<BigNumber>;

  getDaiToken(overrides?: CallOverrides): Promise<string>;

  getLendingPool(overrides?: CallOverrides): Promise<string>;

  getLendingPoolAdressesProvider(overrides?: CallOverrides): Promise<string>;

  getWeth(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getWethToken(overrides?: CallOverrides): Promise<string>;

  repay(
    amountDaiToRepayWei: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setLendingPool(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    approveERC20(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    borrowDai(
      amountDaiToBorrowWei: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    depositCollateral(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getBorrowUserData(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber]>;

    getDaiEthPriceFeed(overrides?: CallOverrides): Promise<string>;

    getDaiPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getDaiToken(overrides?: CallOverrides): Promise<string>;

    getLendingPool(overrides?: CallOverrides): Promise<string>;

    getLendingPoolAdressesProvider(overrides?: CallOverrides): Promise<string>;

    getWeth(overrides?: CallOverrides): Promise<void>;

    getWethToken(overrides?: CallOverrides): Promise<string>;

    repay(
      amountDaiToRepayWei: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setLendingPool(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "ApprovedERC20(address,address,uint256)"(
      from?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      amount?: PromiseOrValue<BigNumberish> | null
    ): ApprovedERC20EventFilter;
    ApprovedERC20(
      from?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      amount?: PromiseOrValue<BigNumberish> | null
    ): ApprovedERC20EventFilter;

    "CollateralDeposited(address,uint256)"(
      depositor?: PromiseOrValue<string> | null,
      amount?: null
    ): CollateralDepositedEventFilter;
    CollateralDeposited(
      depositor?: PromiseOrValue<string> | null,
      amount?: null
    ): CollateralDepositedEventFilter;

    "DaiTokenBorrowed(address,uint256)"(
      borrower?: PromiseOrValue<string> | null,
      amount?: null
    ): DaiTokenBorrowedEventFilter;
    DaiTokenBorrowed(
      borrower?: PromiseOrValue<string> | null,
      amount?: null
    ): DaiTokenBorrowedEventFilter;

    "DaiTokenRepayed(address,uint256)"(
      borrower?: PromiseOrValue<string> | null,
      amount?: null
    ): DaiTokenRepayedEventFilter;
    DaiTokenRepayed(
      borrower?: PromiseOrValue<string> | null,
      amount?: null
    ): DaiTokenRepayedEventFilter;

    "GotWeth(address,uint256,uint256)"(
      depositor?: PromiseOrValue<string> | null,
      amount?: null,
      balance?: null
    ): GotWethEventFilter;
    GotWeth(
      depositor?: PromiseOrValue<string> | null,
      amount?: null,
      balance?: null
    ): GotWethEventFilter;
  };

  estimateGas: {
    approveERC20(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    borrowDai(
      amountDaiToBorrowWei: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositCollateral(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getBorrowUserData(overrides?: CallOverrides): Promise<BigNumber>;

    getDaiEthPriceFeed(overrides?: CallOverrides): Promise<BigNumber>;

    getDaiPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getDaiToken(overrides?: CallOverrides): Promise<BigNumber>;

    getLendingPool(overrides?: CallOverrides): Promise<BigNumber>;

    getLendingPoolAdressesProvider(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWeth(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getWethToken(overrides?: CallOverrides): Promise<BigNumber>;

    repay(
      amountDaiToRepayWei: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setLendingPool(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approveERC20(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    borrowDai(
      amountDaiToBorrowWei: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositCollateral(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getBorrowUserData(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getDaiEthPriceFeed(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDaiPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getDaiToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLendingPool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLendingPoolAdressesProvider(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWeth(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getWethToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    repay(
      amountDaiToRepayWei: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setLendingPool(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
