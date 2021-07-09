import React, { useMemo } from 'react'
// import { useSelector } from "react-redux";

import { useTable, useSortBy } from "react-table";

import { COLUMNS } from "../column";

import { coinInfo } from "../store/type"

interface Props {
    DATA: coinInfo[]
}

export default function KimchiTable({ DATA }: Props) {


    const columns: any = useMemo(() => COLUMNS, []);

    const data = useMemo(() => DATA, [DATA]);

    // const tableInstance = useTable({ columns, data }, useSortBy);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);


    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps)}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* <h2>row : {data[2].acc_trade_price}</h2> */}
        </>
    );
}

export { }