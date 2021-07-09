import axios from "axios";

export const marketAll = async () => {
    const url = 'https://api.upbit.com/v1/market/all';
    const options = { method: 'GET', headers: { Accept: 'application/json' } };
    return await axios.get(url, options)
        .then(res => {
            let coinList = res.data;
            let coinNameList = [];
            let coinCodeList = [];
            for (let item of coinList) {
                let [currency, coin] = item.market.split('-');
                if (currency === "KRW") {
                    let list = { code: `"${item.market}"`, name: item.korean_name };
                    coinCodeList.push(`"${currency}-${coin}"`);
                    coinNameList.push(list);
                }
            }


            return coinNameList;
        })
        .catch(err => console.error('error:' + err));

}