import React, { useEffect, useState, useRef } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { coinInfo } from '../store/type';

import "./CoinTableStyles.css";



interface Props {
    data: coinInfo[]
    theme: string,
}


const CoinTable = ({ data, theme }: Props) => {

    const [showGrid, SetShowGrid] = useState(false);
    const [wrapWidth, setWrapWidth] = useState(0);
    const ref = useRef<any>();

    useEffect(() => {
        const clientWidth = ref.current?.clientWidth;
        setWrapWidth(Math.floor(clientWidth / 100));
        SetShowGrid(true);
    }, [ref])
    const rowStyle = { fontSize: '12px' };

    const cellClassKimpRules = {
        'normal': 'x ? x === "none" : false',
        'increase': 'x ? x.replace("%","") > 0 : false',
        'decrease': 'x ? x.replace("%","") < 0 : false',
    };

    const cellClassRateRules = {
        'increase': 'x > 0',
        'decrease': 'x < 0',
        'normal': 'x === 0',
    };

    return (
        <>
            <div ref={ref} className="ag-theme-alpine-dark" style={{ width: "30%", height: 500, margin: "20px 0", display: "block", textTransform: "uppercase" }} >
                {showGrid &&
                    <AgGridReact
                        rowData={data}
                        suppressScrollOnNewData={true}
                        suppressMovableColumns={true}
                        rowHeight={50}
                        domLayout="normal"
                        groupHeaderHeight={60}
                        rowStyle={rowStyle}
                    >
                        <AgGridColumn headerName={theme}>
                            <AgGridColumn headerName="이름" field="name" width={wrapWidth * 30}></AgGridColumn>
                            <AgGridColumn headerName="현재가" field="trade_price" width={wrapWidth * 20}  ></AgGridColumn>
                            <AgGridColumn headerName="등락률" field="signed_change_rate"
                                cellClassRules={cellClassRateRules}
                                sortable={true} width={wrapWidth * 20}></AgGridColumn >
                            <AgGridColumn headerName="거래대금" type="rightAligned" field="acc_trade_price" sortable={true} width={wrapWidth * 20}></AgGridColumn>
                            {data[0].kimp !== null && typeof data[0].kimp === "string" &&
                                <AgGridColumn headerName="김프" field="kimp" cellClassRules={cellClassKimpRules} width={wrapWidth * 20} ></AgGridColumn>
                            }
                        </AgGridColumn>
                    </AgGridReact>
                }
            </div >

        </>
    );
};

export default CoinTable;