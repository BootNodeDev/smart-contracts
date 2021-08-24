/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface LegacyPool2Contract
  extends Truffle.Contract<LegacyPool2Instance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<LegacyPool2Instance>;
}

type AllEvents = never;

export interface LegacyPool2Instance extends Truffle.ContractInstance {
  _getCurrencyAssetsBalance(
    _curr: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  changeDependentContractAddress: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  changeUniswapFactoryAddress: {
    (
      newFactoryAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      newFactoryAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newFactoryAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newFactoryAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  externalLiquidityTrade: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  internalLiquiditySwap: {
    (curr: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(curr: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      curr: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      curr: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  saveIADetails: {
    (
      curr: string[],
      rate: (number | BN | string)[],
      date: number | BN | string,
      bit: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      curr: string[],
      rate: (number | BN | string)[],
      date: number | BN | string,
      bit: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      curr: string[],
      rate: (number | BN | string)[],
      date: number | BN | string,
      bit: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      curr: string[],
      rate: (number | BN | string)[],
      date: number | BN | string,
      bit: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  sendEther: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  uniswapFactoryAddress(
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  upgradeInvestmentPool: {
    (newPoolAddress: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      newPoolAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newPoolAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newPoolAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    _getCurrencyAssetsBalance(
      _curr: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    changeDependentContractAddress: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    changeUniswapFactoryAddress: {
      (
        newFactoryAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        newFactoryAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newFactoryAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newFactoryAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    externalLiquidityTrade: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    internalLiquiditySwap: {
      (curr: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(curr: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(
        curr: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        curr: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    saveIADetails: {
      (
        curr: string[],
        rate: (number | BN | string)[],
        date: number | BN | string,
        bit: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        curr: string[],
        rate: (number | BN | string)[],
        date: number | BN | string,
        bit: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        curr: string[],
        rate: (number | BN | string)[],
        date: number | BN | string,
        bit: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        curr: string[],
        rate: (number | BN | string)[],
        date: number | BN | string,
        bit: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    sendEther: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    uniswapFactoryAddress(
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    upgradeInvestmentPool: {
      (newPoolAddress: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        newPoolAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newPoolAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newPoolAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}