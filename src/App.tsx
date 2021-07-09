import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { marketAll } from './marketAll';
import { coinDispatch, kimpDispatch } from './store/action';

import { ReducerType } from "./store"
import CoinTable from "./component/CoinTable";
import CoinTableWrap from './component/CoinTableWrap';



function App() {

  const [codeList, setCodeList] = useState<string[]>([]);

  const [coinNameInfo, setCoinNameInfo] = useState<any>([]);

  const [started, setStarted] = useState(false);

  const [coinInfoList, setCoinInfoList] = useState<any>(null);

  // const [kimchiList, setKimchiList] = useState<any>(null);
  // const [chinaList, setChinaList] = useState<any>(null);
  // const [nftList, setNftList] = useState<any>(null);
  // const [cloudList, setCloudList] = useState<any>(null);
  // const [defiList, setDefiList] = useState<any>(null);
  // const [didList, setDidList] = useState<any>(null);
  // const [noneList, setNoneList] = useState<any>(null);

  const dispatch = useDispatch();

  const state = useSelector((state: ReducerType) => state);

  useEffect(() => {

    const setMarketAll = async () => {
      let list: any = await marketAll();
      setCoinNameInfo(list);
    }

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

      setInterval(async () => { await dispatch(kimpDispatch(coinNameInfo)); }, 3000);

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

      setStarted(true);
    }

    return () => {

      const newData = { ...state.coinInfoList };
      setCoinInfoList(newData);

      // if (state.coinInfoList.kimchi) {
      //   const newKimchi = [...state.coinInfoList.kimchi];
      //   setKimchiList(newKimchi);
      // }
      // if (state.coinInfoList.china) {
      //   const newChina = [...state.coinInfoList.china];
      //   setChinaList(newChina);
      // }
      // if (state.coinInfoList.nft) {
      //   const newNft = [...state.coinInfoList.nft];
      //   setNftList(newNft);
      // }
      // if (state.coinInfoList.cloud) {
      //   const newCloud = [...state.coinInfoList.cloud];
      //   setCloudList(newCloud);
      // }
      // if (state.coinInfoList.defi) {
      //   const newDefi = [...state.coinInfoList.defi];
      //   setDefiList(newDefi);
      // }
      // if (state.coinInfoList.did) {
      //   const newDid = [...state.coinInfoList.did];
      //   setDidList(newDid);
      // }
      // if (state.coinInfoList.none) {
      //   const newNone = [...state.coinInfoList.none];
      //   setNoneList(newNone);
      // }

    }


  }, [codeList, coinNameInfo, state]);

  if (coinInfoList === null) {
    return <></>;
  }

  return (
    <div className="App">
      {coinInfoList.none.length > 0 && <CoinTableWrap data={coinInfoList} />}
      {/* {kimchiList?.length > 0 && <CoinTable theme="김치" data={kimchiList} />}
      {chinaList?.length > 0 && <CoinTable theme="쭝국" data={chinaList} />}
      {nftList?.length > 0 && <CoinTable theme="NFT" data={nftList} />}
      {cloudList?.length > 0 && <CoinTable theme="클라우드/저장" data={cloudList} />}
      {defiList?.length > 0 && <CoinTable theme="Defi" data={defiList} />}
      {didList?.length > 0 && <CoinTable theme="Did" data={didList} />}
      {noneList?.length > 0 && <CoinTable theme="None" data={noneList} />} */}
    </div>
  );
}

export default App;
