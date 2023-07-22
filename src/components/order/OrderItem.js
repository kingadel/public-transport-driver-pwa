import React from 'react';
import Box from "@mui/material/Box";
import {Stack, Typography} from "@mui/material";
import {ChevronLeft} from "@mui/icons-material";
import IconCargoSign from "../../assets/images/ic_cargo_sign.svg";
import {useNavigate} from "react-router-dom";
import {getPersianDate, getTruckNames, navigateTo} from "../../utils/Utils";
import IconCargoId from "../../assets/images/ic_cargo_id.svg";
import {toast} from "react-hot-toast";

export default function OrderItem({order}) {
    const navigate = useNavigate()
    console.log(order)

    const onClick = (e) => {
        e.stopPropagation()
        navigateTo(navigate, 'orders/' + order?.orderId, {
            orderDetail: order
        })
    }


    return (
        <Box onClick={onClick} width={'100%'} display={"flex"} mt={3} flexDirection={"column"}>
            <Stack justifyContent={"space-between"} direction={'row'}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
                    <ChevronLeft fontSize={"large"} color={"primary"}/>
                    <Typography marginTop={'2px'} variant={"body1"} fontWeight={"bold"}
                                color={'primary'}>مشاهده</Typography>
                </Stack>


                <Stack direction={"row"} alignItems={"center"} gap={2}>
                    <Stack direction={"column"} alignItems={"end"}>
                        <Typography variant={"body1"} fontWeight={"bold"} color={'text.primary'} dir={'rtl'}>
                            {order.title}
                        </Typography>
                        <Typography variant={"body1"} color={'text.secondary'}>
                            بارگیری:
                            {" " + getPersianDate(order.loadDate)}
                        </Typography>
                    </Stack>

                    <img style={{
                        backgroundColor: '#8A8A8E44',
                        borderRadius: '6px',
                        width: '44px',
                        height: '44px',
                        padding: '10px'
                    }} src={IconCargoSign} alt={""}/>
                </Stack>
            </Stack>


            {/*<Stack px={2} gap={4} dir={'rtl'} my={3} width={'100%'} direction={"row"}*/}
            {/*       alignItems={"center"}>*/}
            {/*    <Stack direction={"row"} alignItems={"center"} gap={4}>*/}
            {/*        <img src={IconCargoId} alt={""} style={{*/}
            {/*            width: '20px',*/}
            {/*            height: '20px',*/}
            {/*            objectFit: "contain",*/}
            {/*            objectPosition: 'center'*/}
            {/*        }}/>*/}
            {/*        <Typography fontWeight={"bold"} variant={"body1"} color={'text.primary'}>شماره*/}
            {/*            سفارش</Typography>*/}
            {/*    </Stack>*/}

            {/*    <Typography dir={'rtl'} variant={"h6"} fontWeight={"bold"}*/}
            {/*                color={'text.primary'}>{new Intl.NumberFormat('en-IN').format(order.orderId) + " "}</Typography>*/}

            {/*</Stack>*/}

            <Stack direction={'row-reverse'} px={0} mt={1} gap={2}>
                <Stack minWidth={'44px'} alignItems={"center"} mt={'4px'}>
                    <div style={{
                        width: '16px',
                        height: '16px',
                        border: '3px solid #8A8A8E44',
                        borderRadius: '50px',
                    }}/>
                    <div style={{
                        width: '4px',
                        height: '35%',
                        backgroundColor: '#8A8A8E44',
                    }}/>
                    <div style={{
                        width: '16px',
                        height: '16px',
                        border: '3px solid #8A8A8E44',
                        borderRadius: '50px',
                    }}/>
                </Stack>

                <Stack direction={"column"} alignItems={"end"} width={'100%'} gap={2}>


                    <Stack direction={"row-reverse"} gap={1} width={'100%'}>
                        <Stack direction={"column"} alignItems={"end"} flexBasis={'55%'} overflow={"hidden"}>
                            <Typography fontWeight={"bold"} variant={"body1"} color={'text.primary'} dir={'rtl'}
                                        textAlign={"right"}>
                                {order?.sender ?? 'نامشخص'}
                            </Typography>
                            <Typography fontWeight={"bold"} variant={"body1"} color={'background.red'} dir={'rtl'}>
                                {order?.sourceCity?.name ?? 'نامشخص'}
                            </Typography>

                        </Stack>

                        <Stack direction={"column"} alignItems={"end"} flexBasis={'45%'}>
                            <Typography fontWeight={"bold"} variant={"body1"} color={'text.primary'} dir={'rtl'}>
                                وزن بار</Typography>
                            <Typography fontWeight={"bold"} variant={"body1"} color={'background.red'} dir={'rtl'}>
                                {order.weight + " "} تن
                            </Typography>
                        </Stack>

                    </Stack>

                    <Stack direction={"row-reverse"} width={'100%'} gap={1}>

                        <Stack direction={"column"} alignItems={"end"} flexBasis={'55%'} overflow={"hidden"}>
                            <Typography fontWeight={"bold"} variant={"body1"} color={'text.primary'} dir={'rtl'}>
                                {order.receiver ?? 'نامشخص'}
                            </Typography>
                            <Typography fontWeight={"bold"} variant={"body1"} flexBasis={'45%'} color={'background.red'}
                                        dir={'rtl'}>
                                {order.destinationCity?.name ?? 'نامشخص'}
                            </Typography>

                        </Stack>

                        <Stack direction={"column"} alignItems={"end"}>
                            <Typography fontWeight={"bold"} variant={"body1"} color={'text.primary'} dir={'rtl'}>
                                کرایه
                            </Typography>
                            <Typography fontWeight={"bold"} variant={"body1"} color={'background.red'} dir={'rtl'}>
                                {new Intl.NumberFormat('en-US').format(order.driverFee) + " "}
                                ریال
                            </Typography>
                        </Stack>

                    </Stack>

                    <Stack direction={"row-reverse"} width={'100%'} gap={1} mt={1}>

                        <Stack direction={"row-reverse"} alignItems={"start"} gap={1} flexBasis={'55%'}>
                            <Typography fontWeight={"bold"} textAlign={"right"} variant={"caption"}
                                        color={'text.secondary'} dir={'rtl'}>
                                نوع کامیون
                            </Typography>
                            <Typography textAlign={"right"} fontWeight={"bold"} variant={"caption"} color={'text.primary'} dir={'rtl'}>
                                {order.trailer?.trailerTypes ? getTruckNames(order.trailer) : 'نامشخص'}
                            </Typography>
                        </Stack>
                        <Stack direction={"row-reverse"} alignItems={"start"} gap={'4px'} flexBasis={'45%'}>
                            <Typography fontWeight={"bold"} variant={"caption"} color={'text.secondary'} dir={'rtl'}>
                                نوع بارگیر
                            </Typography>
                            <Typography fontWeight={"bold"} variant={"caption"} color={'text.primary'} dir={'rtl'}>
                                {order.trailer?.name ?? 'نامشخص'}
                            </Typography>

                        </Stack>
                    </Stack>

                </Stack>
            </Stack>

            <Box sx={{opacity: '0.2'}} width={'100%'} bgcolor={'text.secondary'} height={'2px'} mt={3}/>
        </Box>
    )
}





