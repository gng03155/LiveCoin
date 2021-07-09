import axios from "axios"
import { Dispatch } from "redux";
import { CoinDispatchType, updateCoinInfo, bnCoinInfo, UPDATE_BYNANCE, UPDATE_DATA, coinInfo } from "../type"



export const coinDispatch = (updateCoin: coinInfo) => {
    return {
        type: UPDATE_DATA,
        payload: updateCoin,
    }
}

export const kimpDispatch = (coinNameInfo: any) => {
    return async (dispatch: Dispatch<CoinDispatchType>) => {

        let bnList: bnCoinInfo[] = [];

        await axios.get("https://api.binance.com/api/v3/ticker/price")
            .then((res) => {
                const codeList = coinNameInfo.map((coin: any) => {
                    let newCode = coin.code.replace(/[/"-]/gi, "").replace("KRW", "");
                    return newCode;
                })

                res.data.forEach((item: any) => {
                    let code: string = codeList.find((code: any) => {
                        let usdt = code + "USDT";
                        if (usdt === item.symbol) {
                            return code;
                        }
                    })
                    if (code) {
                        bnList.push(
                            {
                                code: code,
                                price: item.price,
                            }
                        )
                    }


                })



            })
            .catch(err => console.error(err));
        dispatch({
            type: UPDATE_BYNANCE,
            payload: bnList,
        });

    }
}