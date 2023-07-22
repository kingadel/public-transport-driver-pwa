import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Toolbar, {ToolbarDefaultCenter, ToolbarDefaultRight} from "../../components/shared/Toolbar";
import Loading from "../../components/shared/Loading";
import {getTransactionHistory} from "../../services/TransactionService";
import {Typography} from "@mui/material";
import IconNoSearchResult from "../../assets/images/ic_no_cargo.svg";
import TransactionItem from "../../components/transaction/TransactionItem";


export default function TransactionHistory() {

    const [loading, setLoading] = useState(false)
    const [transactionList, setTransactionList] = useState()
    const [fromDate, setFromDate] = useState('2019-01-01')
    const [toDate, setToDate] = useState()
    const localUser = JSON.parse(localStorage.getItem('user'))




    useEffect(() => {
        let today = new Date().toLocaleDateString();
        console.log('today , ' , today)
        setToDate(today)
    }, [])

    useEffect(() => {
        if (fromDate && toDate)
            setLoading(true)
        getTransactionHistory(fromDate, toDate).then(r => {
            console.log('getTransactionHistory', r.data.data)
            setTransactionList(r.data.data)
            setLoading(false)
        }).catch(e => {
            setTransactionList([])
            console.log(e)
            setLoading(false)
        })

    }, [fromDate, toDate])

    return (
        <>
            <Toolbar rightChild={<ToolbarDefaultRight/>}>
                <ToolbarDefaultCenter/>
            </Toolbar>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowY: 'scroll',
                    justifyContent: 'center',
                    gap: '8px',
                    paddingTop: 6,
                    paddingX: 2,
                    pb: 10
                }}
            >

                <Typography variant={"h6"} fontWeight={"bold"} color={'text.primary'} textAlign={"right"}
                            width={'100%'} mt={4}>سوابق مالی</Typography>
                {transactionList && transactionList.length === 0 ?
                    <React.Fragment>
                        <Typography fontWeight={"bold"} variant={"caption"} color={'text.primary'} textAlign={"right"}
                                    dir={'rtl'}
                                    width={'100%'}>تراکنش ثبت شده‌ای ندارید.</Typography>
                        <img src={IconNoSearchResult} alt={""} style={{
                            width: '80px',
                            height: '120px',
                            marginTop: '80px'
                        }}/>
                    </React.Fragment>
                    : <Typography fontWeight={"bold"} variant={"caption"} color={'text.primary'} textAlign={"right"}
                                  dir={'rtl'}
                                  width={'100%'}>گردش کیف پول شما در آی‌بار</Typography>
                }

                {transactionList && transactionList.map((item, index) => {
                    console.log(index)
                    return (<TransactionItem key={index} transaction={item}/>)
                })}


            </Box>
            <Loading isLoading={loading}/>
        </>
    );
}



export const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
