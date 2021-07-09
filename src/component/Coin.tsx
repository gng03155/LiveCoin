import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { ReducerType } from "../store";

interface Props {
    list: any,
}

export default function Coin({ list }: Props) {

    const [success, setSuccess] = useState(false);

    useEffect(() => {

        // setInterval(() => { console.log(coinInfo) }, 1000)

    }, [])

    useEffect(() => {

        console.log(list);

    }, [list])



    return (
        <div>
            {!success &&
                <>
                    <h2>{list[1].trade_price || "dd"}</h2>
                    <h2>{list[2].trade_price || "dd"}</h2>
                    <h2>{list[3].trade_price || "dd"}</h2>
                    <h2>{list[4].trade_price || "dd"}</h2>
                    <h2>{list[5].trade_price || "dd"}</h2>
                    <h2>{list[6].trade_price || "dd"}</h2>
                </>
            }
        </div>
    )
}
