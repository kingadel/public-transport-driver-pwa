import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {MenuItem, Select, Stack, SwipeableDrawer, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {Puller} from "../cargo/bottomsheets";
import IconChevronTop from "../../assets/images/ic_chevron_top.svg";
import Button from "@mui/material/Button";
import {formatNumber} from "../../utils/Utils";
import {requestWithdrawApi} from "../../services/TransactionService";
import Loading from "../shared/Loading";

export function WithdrawBottomSheet({open, onClose, driverInfo, onSuccess}) {

    const [price, setPrice] = useState('0')
    const [loading, setLoading] = useState(false)


    const onPriceChanged = (e) => {
        setPrice(e.target.value)
    }
    const onSubmit = () => {
        if(parseInt(price) > driverInfo.Credit) {
            toast('مبلغ وارد شده از موجودی کیف‌پول شما بیشتر است')
            return;
        }
        if(loading)
            return
        setLoading(true)
        requestWithdrawApi(driverInfo.Id, price).then(r => {
            if (onSuccess)
                onSuccess()
            setLoading(false)
            console.log(r.data)
        }).catch(e => {
            setLoading(false)
            console.log(e)
            if (e.data.message)
                toast(e.data.message)
        })

    }
    const onAllCreditClicked = (e) => {
        setPrice(driverInfo.Credit)
    }

    return (
        <SwipeableDrawer
            // container={container}
            anchor="bottom"
            open={open}
            onClose={onClose}
            swipeAreaWidth={56}
            disableSwipeToOpen={true}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <Box width={'100%'} pb={2} px={4}>
                <Puller/>
                <Typography align={"right"} variant={"body1"} mt={4} fontWeight={"bold"}>
                    درخواست تسویه
                </Typography>
                <Typography
                    sx={{
                        width: '100%'
                    }} dir={'rtl'}
                    align={"right"}
                    variant={"body1"}
                    fontSize={10}
                    fontWeight={"bold"}>
                    جهت درخواست تسویه لطفا مبلغ را وارد نمایید.
                </Typography>

                <WithdrawRow title={'اعتبار شما'} amount={formatNumber(driverInfo?.Credit)}/>
                <Box sx={{opacity: '0.2'}} width={'100%'} bgcolor={'text.secondary'} height={'1px'} mt={2}/>

                <WithdrawRow title={'شماره شبا'} amount={driverInfo?.Sheba}/>
                <Box sx={{opacity: '0.2'}} width={'100%'} bgcolor={'text.secondary'} height={'1px'} mt={2}/>

                <Typography
                    mt={3}
                    textAlign={"right"}
                    variant={"body1"}
                    fontSize={12}
                    color={'text.secondary'}
                    width={'100%'}>مبلغ مورد نظر</Typography>

                <Box width={'100%'} position={'relative'} mt={2}>
                    <TextField

                        size={"small"}
                        name="Tonnage"
                        onChange={onPriceChanged}
                        placeholder={""}
                        dir={'rtl'}
                        sx={{
                            textAlign: 'right',
                            width: '100%',
                        }}
                        inputMode={'decimal'}
                        autoComplete={'off'}
                        variant={"standard"}
                        inputProps={{
                            autocomplete: 'new-password',
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                        InputProps={{
                            style: {
                                paddingBottom: '8px'
                            }
                        }}
                        value={price}>

                    </TextField>
                    <Stack px={2}
                           position={"absolute"}
                           left={0}
                           top={0}
                           bottom={0}
                           direction={"row"}
                           alignItems={"center"}>
                        <Typography fontWeight={"bold"} color={'text.secondary'} variant={'body1'}>ریال</Typography>
                    </Stack>
                </Box>
                <Typography onClick={onAllCreditClicked} mt={1} color={'primary'} variant={'body1'}>انتخاب کل
                    اعتبار</Typography>


                <Box display={"flex"} gap={2} flexDirection={"row"} width={'100%'} maxWidth={'440px'} mt={5}>
                    <Button
                        type="submit"
                        variant="contained"
                        disableElevation={true}
                        sx={{
                            flexBasis: '65%',
                            padding: 2,
                            width: '100%',
                            maxWidth: '440px',
                            fontWeight: "bold",
                            bgcolor: 'background.button',
                            color: 'text.button',
                            fontSize: '14px',
                            borderRadius: 2,
                        }}
                        onClick={onSubmit}
                    >ارسال درخواست</Button>

                    <Button
                        variant="text"
                        disableElevation={true}
                        sx={{
                            flexBasis: '35%',
                            padding: 2,
                            width: '100%',
                            maxWidth: '440px',
                            fontWeight: 'bold',
                            color: 'background.button',
                            fontSize: '14px',
                            borderRadius: 2,
                        }}
                        onClick={onClose}
                    >انصراف</Button>
                    <Loading isLoading={loading}/>
                </Box>
            </Box>
        </SwipeableDrawer>
    );
}

function WithdrawRow({title, amount}) {
    return (
        <>
            <Stack dir={'rtl'} mt={4} width={'100%'} direction={"row"} justifyContent={"space-between"}
                   alignItems={"center"}>
                <Typography variant={"body1"} fontSize={12} color={'text.secondary'}>{title}</Typography>
                <Typography fontWeight={"bold"} variant={"body1"} color={'text.primary'}>{amount}</Typography>

            </Stack>
        </>
    );
}