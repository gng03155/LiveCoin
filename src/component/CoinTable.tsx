import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { coinInfo } from '../store/type';

import "./CoinTableStyles.css";
import { ValueGetterParams, ValueSetterParams } from 'ag-grid-community/dist/lib/entities/colDef';
import { CellClickedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';



interface Props {
    data: coinInfo[]
    theme: string,
}


const CoinTable = ({ data, theme }: Props) => {

    const [gridApi, setGridApi] = useState<GridApi>();
    const [showGrid, SetShowGrid] = useState(false);

    useEffect(() => {
    }, [data])

    const onGridReady = (params: GridReadyEvent) => {
        if (params.api)
            setGridApi(params.api);
    }


    const cellClassKimpRules = {
        'increase': 'x.replace("%","") > 0',
        'decrease': 'x.replace("%","") < 0',
        'normal': 'x.replace("%","") === "none"',
    };

    const cellClassRateRules = {
        'increase': 'x > 0',
        'decrease': 'x < 0',
        'normal': 'x === 0',
    };

    return (
        <>
            {!showGrid &&
                <div className="ag-theme-alpine-dark" style={{ width: 450, height: 500, margin: "20px", display: "block" }} >
                    <AgGridReact
                        rowData={data}
                        // getRowStyle={getRowStyle}
                        suppressMovableColumns={true}
                        suppressScrollOnNewData={true}
                        rowHeight={50}
                        domLayout="normal"
                        groupHeaderHeight={60}
                        onGridReady={onGridReady}
                    >
                        <AgGridColumn headerName={theme}>
                            <AgGridColumn headerName="이름" field="name" width={120}></AgGridColumn>
                            <AgGridColumn headerName="현재가" field="trade_price" width={80}></AgGridColumn>
                            <AgGridColumn headerName="등락률" field="signed_change_rate"
                                cellClassRules={cellClassRateRules}
                                sortable={true} width={80}></AgGridColumn>
                            <AgGridColumn headerName="거래대금" type="rightAligned" field="acc_trade_price" sortable={true} width={100}></AgGridColumn>
                            {data.reduce((prev: any, cur) => {
                                if (typeof cur.kimp === "string") {
                                    prev = <AgGridColumn headerName="김프" field="kimp" width={80} cellClassRules={cellClassKimpRules}></AgGridColumn>;
                                    return prev;
                                }
                                else {
                                    prev = <></>;
                                    return prev;
                                }
                            }, null)}
                        </AgGridColumn>
                    </AgGridReact>
                </div >
            }
        </>
    );
};

export default CoinTable;