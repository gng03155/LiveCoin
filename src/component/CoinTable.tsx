import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { coinInfo } from '../store/type';

import "./CoinTableStyles.css";
// import { ValueGetterParams, ValueSetterParams } from 'ag-grid-community/dist/lib/entities/colDef';
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

    // const onGridReady = (params: GridReadyEvent) => {
    //     if (params.api)
    //         setGridApi(params.api);
    // }


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
            {!showGrid &&
                <div className="ag-theme-alpine-dark" style={{ width: 530, height: 500, margin: "20px", display: "block" }} >
                    <AgGridReact
                        rowData={data}
                        suppressMovableColumns={true}
                        suppressScrollOnNewData={true}
                        rowHeight={50}
                        domLayout="normal"
                        groupHeaderHeight={60}
                    // onGridReady={onGridReady}
                    >
                        <AgGridColumn headerName={theme}>
                            <AgGridColumn headerName="이름" field="name" width={150}></AgGridColumn>
                            <AgGridColumn headerName="현재가" field="trade_price" width={80}></AgGridColumn>
                            <AgGridColumn headerName="등락률" field="signed_change_rate"
                                cellClassRules={cellClassRateRules}
                                sortable={true} width={80}></AgGridColumn>
                            <AgGridColumn headerName="거래대금" type="rightAligned" field="acc_trade_price" sortable={true} width={100}></AgGridColumn>
                            {data[0].kimp !== null && typeof data[0].kimp === "string" &&
                                <AgGridColumn headerName="김프" field="kimp" width={80} cellClassRules={cellClassKimpRules}></AgGridColumn>
                            }
                        </AgGridColumn>
                    </AgGridReact>
                </div >
            }
        </>
    );
};

export default CoinTable;