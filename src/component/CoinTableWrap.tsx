import React, { useEffect, useState } from 'react'

import { CoinInfoList } from "../store/type";
import CoinTable from './CoinTable';
interface Props {
    data: CoinInfoList,
}

export default function CoinTableWrap({ data }: Props) {

    return (
        <div style={{ display: 'flex', flexWrap: "wrap", justifyContent: "space-between" }}>
            {data &&
                Object.keys(data).map((key, idx) => {
                    if (key === "kimchi" || key === "china" || key === "nft"
                        || key === "cloud" || key === "defi" || key === "did"
                        || key === "none"
                    ) {
                        if (data[key]?.length > 0) {
                            let newData = [...data[key]];
                            let newKey = key;
                            return <CoinTable key={idx} data={newData} theme={newKey}></CoinTable>
                        }
                    }
                    return <div key={idx}></div>
                })
            }
        </div>
    )
}
