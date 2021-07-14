export const UPDATE_DATA = "UPDATE_DATA";
export const UPDATE_BYNANCE = "UPDATE_BYNANCE";
export const UPDATE_EXCHANGE = "UPDATE_EXCHANGE";

export interface coinInfo {
    name: string,
    code: string,
    trade_price: number,
    signed_change_rate: number,
    acc_trade_price: number,
    kimp?: string,
}

export interface CoinInfoList {
    [kimchi: string]: coinInfo[],
    china: coinInfo[],
    nft: coinInfo[],
    cloud: coinInfo[],
    defi: coinInfo[],
    did: coinInfo[],
    none: coinInfo[],
}

export interface bnCoinInfo {
    code: string,
    price: number,
}

//============================Action Type

export interface updateCoinInfo {
    type: typeof UPDATE_DATA,
    payload: coinInfo,
}

export interface updateBiNance {
    type: typeof UPDATE_BYNANCE,
    payload: bnCoinInfo[],
}

export interface updateExchange {
    type: typeof UPDATE_EXCHANGE,
    payload: number,
}

export type CoinDispatchType = updateCoinInfo | updateBiNance | updateExchange;