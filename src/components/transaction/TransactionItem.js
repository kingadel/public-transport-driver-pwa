import React from 'react';
import Box from "@mui/material/Box";
import {Stack, Typography} from "@mui/material";
import {formatNumber} from "../../utils/Utils";
import IconWithdraw from "../../assets/images/ic_transaction_withdraw.svg";
import IconDeposit from "../../assets/images/ic_transaction_deposit.svg";

export default function TransactionItem({transaction}) {
    const onClick = (e) => {
    }
    return (
        <Box onClick={onClick} width={'100%'} display={"flex"} mt={3} flexDirection={"column"}>
            <Stack direction={"row-reverse"} gap={2}>
                <Stack alignItems={"center"} sx={{
                    minWidth: '44px',
                    minHeight: '44px',
                    maxWidth: '44px',
                    maxHeight: '44px'
                }} bgcolor={transaction?.type === 'withdraw' ? '#E5E9FF' : '#E4F8E9'} p={3} borderRadius={5}
                       justifyContent={"center"}>
                    <img style={{
                        width: '100%',
                        height: '100%',
                        objectFit: "contain",
                        objectPosition: 'center'
                    }} src={transaction?.type === 'withdraw' ? IconWithdraw : IconDeposit} alt={''}/>

                </Stack>

                <Stack direction={"column"} width={'100%'} gap={1}>

                    <Stack pl={2} direction={"row-reverse"} justifyContent={"space-between"} width={'100%'}>
                        <Typography color={'text.primary'} variant={"body2"} fontWeight={"bold"}>
                            {transaction?.type === 'withdraw' ? "برداشت از کیف پول" : "واریز به کیف پول"}
                        </Typography>

                        <Typography dir={'rtl'} color={transaction?.type === 'withdraw' ? 'red' : 'green'}
                                    variant={"body2"} fontWeight={"bold"}>
                            {formatNumber(transaction.amount) + " ریال"}
                        </Typography>

                    </Stack>

                    {transaction?.type === 'withdraw' ?
                        <Typography ml={2} align={"justify"} dir={'rtl'} color={'text.primary'} variant={"caption"}
                                    fontWeight={"bold"}>
                            واریز درآمد از طریق شبکه شبا
                        </Typography> : null
                    }

                    <Typography dir={'ltr'} textAlign={"right"} ml={2} variant={"body2"} fontWeight={"bold"}
                                color={'text.secondary'}>
                        {transaction.createdAt}
                    </Typography>
                </Stack>
            </Stack>
            <Box sx={{opacity: '0.2'}} width={'100%'} bgcolor={'text.secondary'} height={'2px'} mt={3}/>
        </Box>
    )
}



