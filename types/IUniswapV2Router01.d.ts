/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IUniswapV2Router01Contract
  extends Truffle.Contract<IUniswapV2Router01Instance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<IUniswapV2Router01Instance>;
}

type AllEvents = never;

export interface IUniswapV2Router01Instance extends Truffle.ContractInstance {
  WETH(txDetails?: Truffle.TransactionDetails): Promise<string>;

  addLiquidity: {
    (
      tokenA: string,
      tokenB: string,
      amountADesired: number | BN | string,
      amountBDesired: number | BN | string,
      amountAMin: number | BN | string,
      amountBMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      tokenA: string,
      tokenB: string,
      amountADesired: number | BN | string,
      amountBDesired: number | BN | string,
      amountAMin: number | BN | string,
      amountBMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN, BN]>;
    sendTransaction(
      tokenA: string,
      tokenB: string,
      amountADesired: number | BN | string,
      amountBDesired: number | BN | string,
      amountAMin: number | BN | string,
      amountBMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      tokenA: string,
      tokenB: string,
      amountADesired: number | BN | string,
      amountBDesired: number | BN | string,
      amountAMin: number | BN | string,
      amountBMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  addLiquidityETH: {
    (
      token: string,
      amountTokenDesired: number | BN | string,
      amountTokenMin: number | BN | string,
      amountETHMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      token: string,
      amountTokenDesired: number | BN | string,
      amountTokenMin: number | BN | string,
      amountETHMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN, BN]>;
    sendTransaction(
      token: string,
      amountTokenDesired: number | BN | string,
      amountTokenMin: number | BN | string,
      amountETHMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      token: string,
      amountTokenDesired: number | BN | string,
      amountTokenMin: number | BN | string,
      amountETHMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  factory(txDetails?: Truffle.TransactionDetails): Promise<string>;

  getAmountIn(
    amountOut: number | BN | string,
    reserveIn: number | BN | string,
    reserveOut: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getAmountOut(
    amountIn: number | BN | string,
    reserveIn: number | BN | string,
    reserveOut: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getAmountsIn(
    amountOut: number | BN | string,
    path: string[],
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN[]>;

  getAmountsOut(
    amountIn: number | BN | string,
    path: string[],
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN[]>;

  quote(
    amountA: number | BN | string,
    reserveA: number | BN | string,
    reserveB: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  removeLiquidity: {
    (
      tokenA: string,
      tokenB: string,
      liquidity: number | BN | string,
      amountAMin: number | BN | string,
      amountBMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      tokenA: string,
      tokenB: string,
      liquidity: number | BN | string,
      amountAMin: number | BN | string,
      amountBMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN]>;
    sendTransaction(
      tokenA: string,
      tokenB: string,
      liquidity: number | BN | string,
      amountAMin: number | BN | string,
      amountBMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      tokenA: string,
      tokenB: string,
      liquidity: number | BN | string,
      amountAMin: number | BN | string,
      amountBMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  removeLiquidityETH: {
    (
      token: string,
      liquidity: number | BN | string,
      amountTokenMin: number | BN | string,
      amountETHMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      token: string,
      liquidity: number | BN | string,
      amountTokenMin: number | BN | string,
      amountETHMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN]>;
    sendTransaction(
      token: string,
      liquidity: number | BN | string,
      amountTokenMin: number | BN | string,
      amountETHMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      token: string,
      liquidity: number | BN | string,
      amountTokenMin: number | BN | string,
      amountETHMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  removeLiquidityETHWithPermit: {
    (
      token: string,
      liquidity: number | BN | string,
      amountTokenMin: number | BN | string,
      amountETHMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      approveMax: boolean,
      v: number | BN | string,
      r: string,
      s: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      token: string,
      liquidity: number | BN | string,
      amountTokenMin: number | BN | string,
      amountETHMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      approveMax: boolean,
      v: number | BN | string,
      r: string,
      s: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN]>;
    sendTransaction(
      token: string,
      liquidity: number | BN | string,
      amountTokenMin: number | BN | string,
      amountETHMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      approveMax: boolean,
      v: number | BN | string,
      r: string,
      s: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      token: string,
      liquidity: number | BN | string,
      amountTokenMin: number | BN | string,
      amountETHMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      approveMax: boolean,
      v: number | BN | string,
      r: string,
      s: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  removeLiquidityWithPermit: {
    (
      tokenA: string,
      tokenB: string,
      liquidity: number | BN | string,
      amountAMin: number | BN | string,
      amountBMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      approveMax: boolean,
      v: number | BN | string,
      r: string,
      s: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      tokenA: string,
      tokenB: string,
      liquidity: number | BN | string,
      amountAMin: number | BN | string,
      amountBMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      approveMax: boolean,
      v: number | BN | string,
      r: string,
      s: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[BN, BN]>;
    sendTransaction(
      tokenA: string,
      tokenB: string,
      liquidity: number | BN | string,
      amountAMin: number | BN | string,
      amountBMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      approveMax: boolean,
      v: number | BN | string,
      r: string,
      s: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      tokenA: string,
      tokenB: string,
      liquidity: number | BN | string,
      amountAMin: number | BN | string,
      amountBMin: number | BN | string,
      to: string,
      deadline: number | BN | string,
      approveMax: boolean,
      v: number | BN | string,
      r: string,
      s: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  swapETHForExactTokens: {
    (
      amountOut: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      amountOut: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN[]>;
    sendTransaction(
      amountOut: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      amountOut: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  swapExactETHForTokens: {
    (
      amountOutMin: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      amountOutMin: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN[]>;
    sendTransaction(
      amountOutMin: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      amountOutMin: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  swapExactTokensForETH: {
    (
      amountIn: number | BN | string,
      amountOutMin: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      amountIn: number | BN | string,
      amountOutMin: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN[]>;
    sendTransaction(
      amountIn: number | BN | string,
      amountOutMin: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      amountIn: number | BN | string,
      amountOutMin: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  swapExactTokensForTokens: {
    (
      amountIn: number | BN | string,
      amountOutMin: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      amountIn: number | BN | string,
      amountOutMin: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN[]>;
    sendTransaction(
      amountIn: number | BN | string,
      amountOutMin: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      amountIn: number | BN | string,
      amountOutMin: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  swapTokensForExactETH: {
    (
      amountOut: number | BN | string,
      amountInMax: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      amountOut: number | BN | string,
      amountInMax: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN[]>;
    sendTransaction(
      amountOut: number | BN | string,
      amountInMax: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      amountOut: number | BN | string,
      amountInMax: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  swapTokensForExactTokens: {
    (
      amountOut: number | BN | string,
      amountInMax: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      amountOut: number | BN | string,
      amountInMax: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN[]>;
    sendTransaction(
      amountOut: number | BN | string,
      amountInMax: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      amountOut: number | BN | string,
      amountInMax: number | BN | string,
      path: string[],
      to: string,
      deadline: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    WETH(txDetails?: Truffle.TransactionDetails): Promise<string>;

    addLiquidity: {
      (
        tokenA: string,
        tokenB: string,
        amountADesired: number | BN | string,
        amountBDesired: number | BN | string,
        amountAMin: number | BN | string,
        amountBMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        tokenA: string,
        tokenB: string,
        amountADesired: number | BN | string,
        amountBDesired: number | BN | string,
        amountAMin: number | BN | string,
        amountBMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<[BN, BN, BN]>;
      sendTransaction(
        tokenA: string,
        tokenB: string,
        amountADesired: number | BN | string,
        amountBDesired: number | BN | string,
        amountAMin: number | BN | string,
        amountBMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        tokenA: string,
        tokenB: string,
        amountADesired: number | BN | string,
        amountBDesired: number | BN | string,
        amountAMin: number | BN | string,
        amountBMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    addLiquidityETH: {
      (
        token: string,
        amountTokenDesired: number | BN | string,
        amountTokenMin: number | BN | string,
        amountETHMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        token: string,
        amountTokenDesired: number | BN | string,
        amountTokenMin: number | BN | string,
        amountETHMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<[BN, BN, BN]>;
      sendTransaction(
        token: string,
        amountTokenDesired: number | BN | string,
        amountTokenMin: number | BN | string,
        amountETHMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        token: string,
        amountTokenDesired: number | BN | string,
        amountTokenMin: number | BN | string,
        amountETHMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    factory(txDetails?: Truffle.TransactionDetails): Promise<string>;

    getAmountIn(
      amountOut: number | BN | string,
      reserveIn: number | BN | string,
      reserveOut: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getAmountOut(
      amountIn: number | BN | string,
      reserveIn: number | BN | string,
      reserveOut: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getAmountsIn(
      amountOut: number | BN | string,
      path: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN[]>;

    getAmountsOut(
      amountIn: number | BN | string,
      path: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN[]>;

    quote(
      amountA: number | BN | string,
      reserveA: number | BN | string,
      reserveB: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    removeLiquidity: {
      (
        tokenA: string,
        tokenB: string,
        liquidity: number | BN | string,
        amountAMin: number | BN | string,
        amountBMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        tokenA: string,
        tokenB: string,
        liquidity: number | BN | string,
        amountAMin: number | BN | string,
        amountBMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<[BN, BN]>;
      sendTransaction(
        tokenA: string,
        tokenB: string,
        liquidity: number | BN | string,
        amountAMin: number | BN | string,
        amountBMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        tokenA: string,
        tokenB: string,
        liquidity: number | BN | string,
        amountAMin: number | BN | string,
        amountBMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    removeLiquidityETH: {
      (
        token: string,
        liquidity: number | BN | string,
        amountTokenMin: number | BN | string,
        amountETHMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        token: string,
        liquidity: number | BN | string,
        amountTokenMin: number | BN | string,
        amountETHMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<[BN, BN]>;
      sendTransaction(
        token: string,
        liquidity: number | BN | string,
        amountTokenMin: number | BN | string,
        amountETHMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        token: string,
        liquidity: number | BN | string,
        amountTokenMin: number | BN | string,
        amountETHMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    removeLiquidityETHWithPermit: {
      (
        token: string,
        liquidity: number | BN | string,
        amountTokenMin: number | BN | string,
        amountETHMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        approveMax: boolean,
        v: number | BN | string,
        r: string,
        s: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        token: string,
        liquidity: number | BN | string,
        amountTokenMin: number | BN | string,
        amountETHMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        approveMax: boolean,
        v: number | BN | string,
        r: string,
        s: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<[BN, BN]>;
      sendTransaction(
        token: string,
        liquidity: number | BN | string,
        amountTokenMin: number | BN | string,
        amountETHMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        approveMax: boolean,
        v: number | BN | string,
        r: string,
        s: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        token: string,
        liquidity: number | BN | string,
        amountTokenMin: number | BN | string,
        amountETHMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        approveMax: boolean,
        v: number | BN | string,
        r: string,
        s: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    removeLiquidityWithPermit: {
      (
        tokenA: string,
        tokenB: string,
        liquidity: number | BN | string,
        amountAMin: number | BN | string,
        amountBMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        approveMax: boolean,
        v: number | BN | string,
        r: string,
        s: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        tokenA: string,
        tokenB: string,
        liquidity: number | BN | string,
        amountAMin: number | BN | string,
        amountBMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        approveMax: boolean,
        v: number | BN | string,
        r: string,
        s: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<[BN, BN]>;
      sendTransaction(
        tokenA: string,
        tokenB: string,
        liquidity: number | BN | string,
        amountAMin: number | BN | string,
        amountBMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        approveMax: boolean,
        v: number | BN | string,
        r: string,
        s: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        tokenA: string,
        tokenB: string,
        liquidity: number | BN | string,
        amountAMin: number | BN | string,
        amountBMin: number | BN | string,
        to: string,
        deadline: number | BN | string,
        approveMax: boolean,
        v: number | BN | string,
        r: string,
        s: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    swapETHForExactTokens: {
      (
        amountOut: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        amountOut: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN[]>;
      sendTransaction(
        amountOut: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        amountOut: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    swapExactETHForTokens: {
      (
        amountOutMin: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        amountOutMin: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN[]>;
      sendTransaction(
        amountOutMin: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        amountOutMin: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    swapExactTokensForETH: {
      (
        amountIn: number | BN | string,
        amountOutMin: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        amountIn: number | BN | string,
        amountOutMin: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN[]>;
      sendTransaction(
        amountIn: number | BN | string,
        amountOutMin: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        amountIn: number | BN | string,
        amountOutMin: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    swapExactTokensForTokens: {
      (
        amountIn: number | BN | string,
        amountOutMin: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        amountIn: number | BN | string,
        amountOutMin: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN[]>;
      sendTransaction(
        amountIn: number | BN | string,
        amountOutMin: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        amountIn: number | BN | string,
        amountOutMin: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    swapTokensForExactETH: {
      (
        amountOut: number | BN | string,
        amountInMax: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        amountOut: number | BN | string,
        amountInMax: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN[]>;
      sendTransaction(
        amountOut: number | BN | string,
        amountInMax: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        amountOut: number | BN | string,
        amountInMax: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    swapTokensForExactTokens: {
      (
        amountOut: number | BN | string,
        amountInMax: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        amountOut: number | BN | string,
        amountInMax: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN[]>;
      sendTransaction(
        amountOut: number | BN | string,
        amountInMax: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        amountOut: number | BN | string,
        amountInMax: number | BN | string,
        path: string[],
        to: string,
        deadline: number | BN | string,
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
