import React from 'react';
import Box from "@mui/material/Box";
import {Stack, Typography} from "@mui/material";
import {ChevronLeft} from "@mui/icons-material";
import IconCargoSign from "../../assets/images/ic_cargo_sign.svg";
import {useNavigate} from "react-router-dom";
import {getPersianDate, getTruckNames, navigateTo} from "../../utils/Utils";
import IconCargoId from "../../assets/images/ic_cargo_id.svg";
import {toast} from "react-hot-toast";

function CargoItem({cargo}) {
    const navigate = useNavigate()
    console.log(cargo)
    const onClick = (e) => {
        e.stopPropagation()
        navigateTo(navigate, 'cargo-detail', {
            cargoDetail: cargo
        })
    }

    const formatPayloadCode = (payloadCode) => {
        const splitted = payloadCode.split('')
        if (splitted.length > 7) {
            splitted?.splice(2, 0, '-')
            splitted?.splice(5, 0, '-')
            splitted?.splice(9, 0, '-')
        } else {
            splitted?.splice(2, 0, '-')
            splitted?.splice(5, 0, '-')
        }
        let result = ""
        splitted.forEach(item => {
            result += item
        })
        return result
    }
    const copyCargoId = (e) => {
        e.stopPropagation()
        navigator.clipboard.writeText(cargo.cargoId).then(function () {

            toast('کپی شد')

        }, function () {
        });
    }
    const copyOrderId = (e) => {
        e.stopPropagation()
        navigator.clipboard.writeText(cargo.orderId).then(function () {

            toast('کپی شد')

        }, function () {
        });
    }
    // DetailStatusCode
    return (
        <Box onClick={onClick} width={'100%'} display={"flex"} mt={3} flexDirection={"column"}>
            <Stack justifyContent={"space-between"} direction={'row'}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}
                       onClick={() => {
                           // todo goto cargo detail
                       }}>
                    <ChevronLeft fontSize={"large"} color={"primary"}/>
                    <Typography marginTop={'2px'} variant={"body1"} fontWeight={"bold"}
                                color={'primary'}>مشاهده</Typography>
                </Stack>


                <Stack direction={"row"} alignItems={"center"} gap={2}>
                    <Stack direction={"column"} alignItems={"end"}>
                        <Typography variant={"body1"} fontWeight={"bold"} color={'text.primary'} dir={'rtl'}>
                            {cargo.title}
                        </Typography>
                        <Typography variant={"body1"} color={'text.secondary'}>
                            بارگیری:
                            {" " + getPersianDate(cargo.loadDate)}
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

            {cargo.state.state > 0 ?
                <Stack px={2} gap={4} dir={'rtl'} mt={3} width={'100%'} direction={"row"}
                       alignItems={"center"}>
                    <Stack direction={"row"} alignItems={"center"} gap={4}>
                        <img src={IconCargoId} alt={""} style={{
                            width: '20px',
                            height: '20px',
                            objectFit: "contain",
                            objectPosition: 'center'
                        }}/>
                        <Typography fontWeight={"bold"} variant={"body1"} color={'text.primary'}>شماره
                            بار</Typography>
                    </Stack>

                    <Typography dir={'rtl'} variant={"h6"} fontWeight={"bold"}
                                color={'text.primary'}>{new Intl.NumberFormat('en-US').format(cargo.cargoId) + " "}</Typography>

                </Stack> : null}

            <Stack px={2}  gap={4} dir={'rtl'} my={3} width={'100%'} direction={"row"}
                   alignItems={"center"}>
                <Stack direction={"row"} alignItems={"center"} gap={4}>
                    <img src={IconCargoId} alt={""} style={{
                        width: '20px',
                        height: '20px',
                        objectFit: "contain",
                        objectPosition: 'center'
                    }}/>
                    <Typography fontWeight={"bold"} variant={"body1"} color={'text.primary'}>شماره
                        سفارش</Typography>
                </Stack>

                <Typography dir={'rtl'} variant={"h6"} fontWeight={"bold"}
                            color={'text.primary'}>{new Intl.NumberFormat('en-IN').format(cargo.orderId) + " "}</Typography>

            </Stack>

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
                        height: '42px',
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
                            <Typography fontWeight={"bold"} variant={"body1"} color={'text.primary'} dir={'rtl'}>
                                {cargo.sender ?? 'نامشخص'}
                            </Typography>
                            <Typography fontWeight={"bold"} variant={"body1"} color={'background.red'} dir={'rtl'}>
                                {cargo.sourceCity?.name ?? 'نامشخص'}
                            </Typography>

                        </Stack>

                        <Stack direction={"column"} alignItems={"end"} flexBasis={'45%'}>
                            <Typography fontWeight={"bold"} variant={"body1"} color={'text.primary'} dir={'rtl'}>
                                وزن بار</Typography>
                            <Typography fontWeight={"bold"} variant={"body1"} color={'background.red'} dir={'rtl'}>
                                {cargo.weight + " "} تن
                            </Typography>
                        </Stack>

                    </Stack>

                    <Stack direction={"row-reverse"} width={'100%'} gap={1}>

                        <Stack direction={"column"} alignItems={"end"} flexBasis={'55%'} overflow={"hidden"}>
                            <Typography fontWeight={"bold"} variant={"body1"} color={'text.primary'} dir={'rtl'}>
                                {cargo.receiver ?? 'نامشخص'}
                            </Typography>
                            <Typography fontWeight={"bold"} variant={"body1"} flexBasis={'45%'} color={'background.red'}
                                        dir={'rtl'}>
                                {cargo.destinationCity?.name ?? 'نامشخص'}
                            </Typography>

                        </Stack>

                        <Stack direction={"column"} alignItems={"end"}>
                            <Typography fontWeight={"bold"} variant={"body1"} color={'text.primary'} dir={'rtl'}>
                                کرایه
                            </Typography>
                            <Typography fontWeight={"bold"} variant={"body1"} color={'background.red'} dir={'rtl'}>
                                {new Intl.NumberFormat('en-US').format(cargo.driverFee) + " "}
                                ریال
                            </Typography>
                        </Stack>

                    </Stack>

                    <Stack direction={"row-reverse"} width={'100%'} gap={1} mt={1}>

                        <Stack direction={"row-reverse"} alignItems={"end"} gap={1} flexBasis={'55%'}>
                            <Typography fontWeight={"bold"} variant={"caption"} color={'text.secondary'} dir={'rtl'}>
                                نوع کامیون
                            </Typography>
                            <Typography fontWeight={"bold"} variant={"caption"} color={'text.primary'} dir={'rtl'}>
                                {cargo.trailer?.trailerTypes ? getTruckNames(cargo.trailer) : 'نامشخص'}
                            </Typography>
                        </Stack>
                        <Stack direction={"row-reverse"} alignItems={"end"} gap={'4px'} flexBasis={'45%'}>
                            <Typography fontWeight={"bold"} variant={"caption"} color={'text.secondary'} dir={'rtl'}>
                                نوع بارگیر
                            </Typography>
                            <Typography fontWeight={"bold"} variant={"caption"} color={'text.primary'} dir={'rtl'}>
                                {cargo.trailer?.name ?? 'نامشخص'}
                            </Typography>

                        </Stack>
                    </Stack>

                    {
                        cargo?.state ?
                            <Stack bgcolor={'#FFE9DA'} borderRadius={'4px'} direction={"row-reverse"} py={'4px'} px={1}
                                   gap={1} mt={1}>
                                <Typography fontWeight={"bold"} variant={"caption"} color={'text.secondary'}
                                            dir={'rtl'}>
                                    وضعیت
                                </Typography>
                                <Typography fontWeight={"bold"} variant={"caption"} color={'#FF6905'} dir={'rtl'}>
                                    {cargo?.state?.description ?? 'نامشخص'}
                                </Typography>

                            </Stack> : null
                    }


                </Stack>
            </Stack>

            <Box sx={{opacity: '0.2'}} width={'100%'} bgcolor={'text.secondary'} height={'2px'} mt={3}/>
        </Box>
    )
}


export default CargoItem;



