export interface networkConfigItem {
    name?: string;
    wethToken?: string;
    lendingPoolAddressesProvider?: string;
    daiEthPriceFeed?: string;
    daiToken?: string;
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
    31337: {
        name: "localhost",
        wethToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        lendingPoolAddressesProvider:
            "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
        daiEthPriceFeed: "0x773616E4d11A78F511299002da57A0a94577F1f4",
        daiToken: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    },
    42: {
        name: "kovan",
        wethToken: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
        lendingPoolAddressesProvider:
            "0x88757f2f99175387aB4C6a4b3067c77A695b0349",
        daiEthPriceFeed: "0x22B58f1EbEDfCA50feF632bD73368b2FdA96D541",
        daiToken: "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
    },
};

export const developmentChains = ["hardhat", "localhost"];
export const amount = 0.01;
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6;