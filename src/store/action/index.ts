import axios from "axios"
import { Dispatch } from "redux";
import { ThunkAction } from 'redux-thunk';
import { ReducerType } from 'store';
import { CoinDispatchType, UPDATE_EXCHANGE, bnCoinInfo, UPDATE_BYNANCE, UPDATE_DATA, coinInfo } from "../type"



export const coinDispatch = (updateCoin: coinInfo) => {
    return {
        type: UPDATE_DATA,
        payload: updateCoin,
    }
}

export const exchangeRateDispatch = (): ThunkAction<void, ReducerType, null, CoinDispatchType> => {

    return async (dispatch) => {
        const params = {
            authkey: "SPqIti55hguCsNzTd9otgmb2YUnPvhhG",
            searchdate: "20210709",
            data: "AP01",
        }
        // const temp = await axios({
        //     method: "GET",
        //     url: "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON",
        //     data: params,
        // }).then(res => res.data).catch(error => console.log(error));

        const temp = await axios({
            method: "GET",
            url: "https://v6.exchangerate-api.com/v6/5547db4ef5de20eac99e9293/latest/USD",
            headers: {
                Accept: "application/json",
            }
        }).then(res => res.data.conversion_rates.KRW).catch(error => console.log(error));

        dispatch({
            type: UPDATE_EXCHANGE,
            payload: temp,
        })
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