import { CoinDispatchType, UPDATE_DATA, UPDATE_BYNANCE, coinInfo, CoinInfoList } from "../type"

export interface InitState {
    coinInfoList: CoinInfoList,
    allThemeList: string[]
}

const initialstate: InitState = {
    coinInfoList: {
        kimchi: [],
        china: [],
        nft: [],
        cloud: [],
        defi: [],
        did: [],
        none: [],
    },
    allThemeList: ["kimchi", "china", "nft", "cloud", "defi", "did", "none"],
}

// { kimchi{} }

export const coinReducer = (state = initialstate, action: CoinDispatchType): InitState => {
    switch (action.type) {
        case UPDATE_DATA:
            const upInfo: coinInfo = action.payload;
            // const upInfo: coinInfo = { name: info.name, code: info.code, trade_price: info.trade_price, signed_change_rate: info.signed_change_rate, acc_trade_price: info.acc_trade_price };
            const themeList = setTheme(upInfo.code);
            const copyList = { ...state.coinInfoList };

            setCoinList(copyList, themeList, upInfo);
            return { ...state, coinInfoList: copyList };
        case UPDATE_BYNANCE:
            const bnList = [...action.payload];
            const copy = { ...state.coinInfoList };

            bnList.forEach((item) => {

                for (let theme in copy) {
                    if (theme === "kimchi" || theme === "china" || theme === "nft"
                        || theme === "cloud" || theme === "defi" || theme === "did"
                        || theme === "none"
                    )
                        copy[theme].forEach((upCoin: any) => {
                            if (upCoin.code.indexOf(item.code) !== -1) {
                                let koreanPrice = upCoin.trade_price;
                                let bnPrice = item.price;
                                let exchangeRate = 1117;
                                // console.log(`${item.code}Price = ${bnPrice}`);
                                let exPrice = Math.round(bnPrice * exchangeRate);
                                let kimpRate = (koreanPrice / exPrice - 1) * 100;
                                let str = String(Math.round(kimpRate * 100) / 100);
                                upCoin.kimp = str + "%";
                            } else {
                                if (!upCoin.kimp) {
                                    upCoin.kimp = "none";
                                }
                            }
                        })
                }

            })
            return { ...state, coinInfoList: copy };
        default:
            return { ...state };
    }
}

const setCoinList = (copyList: CoinInfoList, themeList: string[], upInfo: coinInfo) => {
    themeList.forEach((theme: string) => {
        if (theme === "kimchi" || theme === "china" || theme === "nft"
            || theme === "cloud" || theme === "defi" || theme === "did"
            || theme === "none"
        ) {
            if (Object.keys(copyList).includes(theme)) {
                let idx = copyList[theme]?.findIndex((item: any) => item.code === upInfo.code);
                if (idx !== undefined && idx >= 0) {
                    if (copyList[theme][idx].kimp) {
                        upInfo.kimp = copyList[theme][idx].kimp;
                    }
                    copyList[theme]?.splice(idx, 1, upInfo);
                } else {
                    copyList[theme]?.push(upInfo);
                }
            } else {
                copyList[theme]?.push(upInfo);
            }
        }
    })

}

const setTheme = (code: string) => {

    let theme: string[] = [];

    let noneTheme = true;

    let kimchi = ["KRW-HUM", "KRW-MARO", "KRW-DKA", "KRW-PXL", "KRW-BORA", "KRW-AHT", "KRW-MOC", "KRW-MBL", "KRW-QTCON", "KRW-MED", "KRW-MLK", "KRW-LUNA", "KRW-RFR", "KRW-META", "KRW-SOLVE", "KRW-STMX", "KRW-SSX", "KRW-EMC2", "KRW-AQT",
        "KRW-CRE", "KRW-CBK", "KRW-TON", "KRW-PCI", "KRW-PLA"
        , "KRW-FCT2", "KRW-PICA", "KRW-HUNT"];

    let china = ["KRW-NEO", "KRW-GAS", "KRW-VET", "KRW-BTT", "KRW-SC", "KRW-TT", "KRW-STPT", "KRW-ELF", "KRW-ONT", "KRW-ONG", "KRW-JST", "KRW-QKC", "KRW-QTUM", "KRW-TRX"];

    let nft = ["KRW-MANA", "KRW-MOC", "KRW-SAND", "KRW-THETA", "KRW-ENJ", "KRW-WAXP", "KRW-CHZ", "KRW-PXL"];

    let cloud = ["KRW-GLM", "KRW-LAMB", "KRW-STORJ", "KRW-SC", "KRW-BTT", "KRW-ANKR", "KRW-FIL"];

    let defi = ["KRW-SXP", "KRW-UNI", "KRW-JST", "KRW-LINK", "KRW-TRX", "KRW-DOT"];

    let did = ["KRW-LAMB", "KRW-MED", "KRW-META", "KRW-CVC", "KRW-ICX", "KRW-ONT", "KRW-FCT2", "KRW-HUM"];

    // if (kimchi.includes(code)) {
    //     theme = "kimchi"
    // } else if (china.includes(code)) {
    //     theme = "china";
    // } else if (nft.includes(code)) {
    //     theme = "nft";
    // } else if (cloud.includes(code)) {
    //     theme = "cloud";
    // } else if (defi.includes(code)) {
    //     theme = "defi";
    // } else if (did.includes(code)) {
    //     theme = "did";
    // } else {
    //     theme = "none"
    // }

    if (kimchi.includes(code)) {
        theme.push("kimchi");
        noneTheme = false;
    } if (china.includes(code)) {
        theme.push("china");
        noneTheme = false;
    } if (nft.includes(code)) {
        theme.push("nft");
        noneTheme = false;
    } if (cloud.includes(code)) {
        theme.push("cloud");
        noneTheme = false;
    } if (defi.includes(code)) {
        theme.push("defi");
        noneTheme = false;
    } if (did.includes(code)) {
        theme.push("did");
        noneTheme = false;
    }
    if (noneTheme) {
        theme.push("none");
    }

    return theme;


}