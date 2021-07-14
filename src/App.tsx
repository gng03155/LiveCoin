import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { marketAll } from './marketAll';
import { coinDispatch, kimpDispatch, exchangeRateDispatch } from './store/action';

import { ReducerType } from "./store"
import CoinTableWrap from './component/CoinTableWrap';
import { CoinInfoList } from 'store/type';


function App() {

  const [codeList, setCodeList] = useState<string[]>([]);

  const [coinNameInfo, setCoinNameInfo] = useState<any>([]);

  const [started, setStarted] = useState(false);

  const [coinInfoList, setCoinInfoList] = useState<CoinInfoList | null>(null);

  const dispatch = useDispatch();

  const state = useSelector((state: ReducerType) => state);

  useEffect(() => {

    const setMarketAll = async () => {
      let list: any = await marketAll();
      setCoinNameInfo(list);
    }

    const exchangeDispatch = async () => {
      await dispatch(exchangeRateDispatch());
    };

    if (codeList.length === 0) {
      setMarketAll();
      if (coinNameInfo.length !== 0) {
        setCodeList(() => {
          return coinNameInfo.map((item: any) => {
            return item.code;
          })
        });
      }

    } else if (!started) {
      setInterval(async () => {
        await dispatch(kimpDispatch(coinNameInfo));
      }, 3000);

      setSocket();

      setStarted(true);
      exchangeDispatch();
    }

    return () => {
      const newData = { ...state.coinInfoList };
      setCoinInfoList(newData);
    }

  }, [dispatch, codeList, coinNameInfo, started, state]);

  const setSocket = () => {
    let socket = new WebSocket("wss://api.upbit.com/websocket/v1");

    socket.onopen = function (e) {
      socket.send(`[ { "ticket": "TEST" }, { "type": "ticker", "codes": [ ${codeList} ] } ]`);
    };
    socket.onmessage = function (event) {

      const reader = new FileReader();

      reader.readAsText(event.data);

      reader.onload = () => {

        if (typeof reader.result !== "string") return;

        let coin = JSON.parse(reader.result);

        let name = coinNameInfo.find((item: any) => item.code === `"${coin.code}"`).name;

        let info = {
          name: name ? name : "",
          code: coin.code,
          trade_price: coin.trade_price,
          signed_change_rate: Number((coin.signed_change_rate * 100).toFixed(2)),
          acc_trade_price: Math.round(coin.acc_trade_price_24h),
        }

        dispatch(coinDispatch(info));
      }
    };
  }

  if (coinInfoList === null) {
    return <></>;
  }

  return (
    <div className="App">
      {coinInfoList.none.length > 0 && <CoinTableWrap data={coinInfoList} />}
    </div>
  );
}

export default App;
