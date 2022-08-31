# Hardhat Aave Collateral Swap

This is a section of the Javascript Blockchain/Smart Contract FreeCodeCamp Course.

*Contract Address (Kovan Testnet): `0x7b0927c6239Be985008f5B2FE1a5dC3ba8eaF634`*

[View Contract on Kovan Testnet](https://kovan.etherscan.io/address/0x7b0927c6239Be985008f5B2FE1a5dC3ba8eaF634)

- [Hardhat Aave Collateral Swap](#hardhat-aave-collateral-swap)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Quickstart](#quickstart)
    - [Optional Gitpod](#optional-gitpod)
- [Usage](#usage)
  - [Run](#run)
  - [Testing](#testing)
- [Running on a testnet or mainnet](#running-on-a-testnet-or-mainnet)
- [Linting](#linting)
  - [Formatting](#formatting)
- [Thank you!](#thank-you)

# Getting Started

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
- [Nodejs](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
    - `node --version` and get an ouput like: `vx.x.x`
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`
  - You'll know you've installed yarn right if you can run:
    - `yarn --version` and get an output like:`x.x.x`
    - You might need to install it with npm

## Quickstart

```
git clone https://github.com/Aaryan-R-S/hardhat-collateral-swap-aave
cd hardhat-collateral-swap-aave
yarn
```

### Optional Gitpod

If you can't or don't want to run and install locally, you can work with this repo in Gitpod. If you do this, you can skip the `clone this repo` part.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/Aaryan-R-S/hardhat-collateral-swap-aave)


# Usage

This repo requires a mainnet rpc provider, but don't worry! You won't need to spend any real money. We are going to be `forking` mainnet, and pretend as if we are interacting with mainnet contracts. 

All you'll need, is to set a `MAINNET_RPC_URL` environment variable in a `.env` file that you create. You can get setup with one for free from [Alchemy](https://alchemy.com)


## Run

```
yarn hardhat run scripts/aaveBorrowRepay.ts --network localhost
yarn hardhat run scripts/aaveBorrowRepay.ts --network kovan
```

## Testing

```
yarn hardhat test
yarn hardhat test --network kovan
```


# Running on a testnet or mainnet

1. Setup environment variables

You'll want to set your `KOVAN_RPC_URL` and `PRIVATE_KEY` as environment variables. You can add them to a `.env` file, similar to what you see in `.env.example`.

- `PRIVATE_KEY`: The private key of your account (like from [metamask](https://metamask.io/)). **NOTE:** FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.
  - You can [learn how to export it here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
- `KOVAN_RPC_URL`: This is url of the kovan testnet node you're working with. You can get setup with one for free from [Alchemy](https://alchemy.com/?a=673c802981)

2. Get testnet ETH

Head over to [faucets.chain.link](https://faucets.chain.link/) and get some tesnet ETH. You should see the ETH show up in your metamask.

3. Run

```
yarn hardhat run scripts/aaveBorrowRepay.ts --network kovan
```


# Linting

To check linting / code formatting:
```
yarn lint
```
or, to fix: 
```
yarn lint:fix
```

## Formatting

```
yarn format
```


# Thank you!

If you appreciated this, feel free to follow me or star the repository!

ETH/Polygon/Avalanche/etc Address: 
0xb7Df10578096744bBdCe9D49eC56CB8955A7b396

[![Aaryan Raj Saxena Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/AaryanRS1)
[![Aaryan Raj Saxena Portfolio](https://img.shields.io/badge/Portfolio-233554?style=for-the-badge&logo=&logoColor=white)](https://aaryan-r-s.github.io/Portfolio/)
[![Aaryan Raj Saxena Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aaryan-raj-saxena-7016a1212)
[![Aaryan Raj Saxena GitHub](https://img.shields.io/badge/GitHub-222222?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Aaryan-R-S)
[![Aaryan Raj Saxena Telegram](https://img.shields.io/badge/Telegram-0088CC?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/aaryan_ars)