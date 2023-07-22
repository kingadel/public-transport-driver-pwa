import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar, {ToolbarDefaultRight} from "../../components/shared/Toolbar";
import Loading from "../../components/shared/Loading";
import {Stack, Typography} from "@mui/material";
import IconCargoSign from "../../assets/images/ic_cargo_sign.svg";
import IconChevronTop from "../../assets/images/ic_chevron_top.svg";
import IconCalendar from "../../assets/images/ic_calandar.svg";
import IconCargoId from "../../assets/images/ic_cargo_id.svg";
import IconDestination from "../../assets/images/ic_destination.svg";
import IconWeight from "../../assets/images/ic_weight.svg";
import IconSource from "../../assets/images/ic_source.svg";
import IconWeighBridge from "../../assets/images/ic_weigh_bridge.svg";
import IconVehicle from "../../assets/images/ic_vehicle.svg";
import IconAddress from "../../assets/images/ic_address.svg";
import {callSupportClick, getPersianDate, getTruckNames, getUserFromLocalStorage, navigateTo} from "../../utils/Utils";
import Button from "@mui/material/Button";
import {
    getOrderDetail,
    reserveOrderApi
} from "../../services/CargoService";
import {toast} from "react-hot-toast";
import {SwipeableBottomSheet} from "../../components/cargo/bottomsheets";


export default function OrderDetail() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [showDetail, setShowDetail] = useState(true)
    const [showDesc, setShowDesc] = useState(false)
    const [showBottomSheet, setShowBottomSheet] = useState(true);
    const [order, setOrder] = useState();


    const location = useLocation()
    const orderId = location.state?.orderDetail?.orderId ?? location.pathname.split('/')[2] ?? ''
    const copyPayloadCode = () => {
        navigator.clipboard.writeText(order.orderId).then(function () {

            toast('کپی شد')

        }, function () {
        });
    }


    useEffect(() => {
        console.log('local user', getUserFromLocalStorage())

        getOrderDetail(orderId).then(r => {
            setOrder(r.data.data)
            console.log('order detail ', r.data)
        }).catch(e => {
            console.log('getDriverInformation error ', e)
        })
        console.log('cargoDetail', order)
    }, [])


    const handleShowDetailClick = () => {
        setShowDetail(!showDetail)
    }
    const handleShowDescriptionClick = () => {
        setShowDesc(!showDesc)
    }

    const closeSheet = () => {
        if (showBottomSheet.status === 'failed') {
            setShowBottomSheet(null);
        } else {
            navigateTo(navigate, 'history')
        }
    };

    // This is used only for the example
    const validateDriver = () => {
        //
        // if (driver?.FirstName === "-" || driver?.LastName === "-") {
        //     console.log(4)
        //     toast('برای ثبت بار، لطفا پروفایل خود را تکمیل کنید.')
        //     return false;
        // }
        //
        // if (!driver?.Sheba || driver?.Sheba?.length !== 26) {
        //     console.log(5)
        //     toast('برای ثبت بار، لطفا پروفایل خود را تکمیل کنید.')
        //     return false;
        // }
        //
        // if (cargo.Weight > driver?.Tonnage) {
        //     toast("وزن بار از وزن قابل تحمل کشنده شما بیشتر است")
        //     return false
        // }


        return true

    }

    const reserveCargoClick = () => {
        if (
            !validateDriver()
        ) return

        // console.log(navigator.geolocation)
        // navigator.geolocation.getCurrentPosition(position => {
        //     console.log(position.coords.latitude)
        //     console.log(position.coords.longitude)
        //     console.log(position.coords.heading)
        //     console.log(position.coords.speed)
        //     console.log(position.coords.accuracy)
        if (loading)
            return;
        setLoading(true)
        reserveOrderApi(
            order.orderId,
            order.weight
        ).then(r => {

            setShowBottomSheet({
                variant: 'positive',
                open: true,
                title: 'ثبت بار',
                description: 'بار مورد نظر برای شما ثبت شد.',
                btn: 'باشه',
                type: 'reserve',
                status: 'success'
            })
            setLoading(false)
            console.log("reserve order", r.data)
        }).catch(e => {
            if (e?.code === 422) {
                setShowBottomSheet({
                    variant: 'negative',
                    open: true,
                    title: 'تغییر وزن بار',
                    description: e.data.message ?? 'مقدار بار موجود تغییر کرده است. آیا مایل به بارگیری مجدد هستید؟',
                    btn: 'بارگیری مجدد',
                    type: 'reserve',
                    status: 'failed'
                })
            } else
                setShowBottomSheet({
                    variant: 'negative',
                    open: true,
                    title: 'ثبت بار',
                    description: e.data.message ?? 'خطا در ثبت بار',
                    btn: 'متوجه شدم',
                    type: 'reserve',
                    status: 'failed'
                })

            setLoading(false)
            console.log("reserve order error", e)
        })
        // }, error => {
        //     toast('geolocation:' + locationError(error))
        //     console.error(locationError(error))
        // })

    }

    return (
        <>
            <Toolbar rightChild={<ToolbarDefaultRight/>}>
                <Typography textAlign={"center"} variant={"h6"}>جزییات بار</Typography>
            </Toolbar>
            {order ? <Box
                sx={{
                    overflowX: 'hidden',
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
                <Stack mt={2} width={'100%'} direction={"row-reverse"} alignItems={"center"} gap={2}>

                    <img style={{
                        backgroundColor: '#8A8A8E44',
                        borderRadius: '6px',
                        width: '44px',
                        height: '44px',
                        padding: '10px'
                    }} src={IconCargoSign} alt={""}/>

                    <Stack direction={"column"} alignItems={"end"}>
                        <Typography variant={"h6"} fontWeight={"bold"} color={'text.primary'} dir={'rtl'}>
                            {order.title}
                        </Typography>
                        <Typography fontWeight={"bold"} variant={"body1"} color={'background.red'}>
                            کرایه:
                            {" " + new Intl.NumberFormat('en-US').format(order.driverFee) + " "}
                            ریال
                        </Typography>
                    </Stack>

                </Stack>


                <Typography dir={'rtl'} textAlign={"right"} variant={"body1"} color={'#FF6905'} width={'100%'} mt={2}>
                    پرداخت سهم باربری با آی‌بار است.
                </Typography>


                <Stack onClick={copyPayloadCode} dir={'rtl'} my={2} width={'100%'} direction={"row"}
                       justifyContent={"space-between"}
                       alignItems={"center"}>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
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
                                color={'text.primary'}>{order.orderId}</Typography>

                </Stack>

                <Stack my={1} direction={"row-reverse"} justifyContent={"space-between"} width={'100%'}
                       onClick={handleShowDetailClick}>
                    <Typography variant={"h6"} fontWeight={"bold"} color={'text.primary'} dir={'rtl'}>
                        جزییات بار
                    </Typography>
                    <img src={IconChevronTop} alt={""} style={{
                        width: '24px',
                        height: '24px',
                        padding: '4px',
                        objectFit: "contain",
                        objectPosition: 'center',
                        transform: !showDetail ? 'rotate(180deg)' : 'rotate(0)'
                    }}/>
                </Stack>

                {
                    showDetail && order ? <DetailSection cargo={order}/> : null
                }


                <Stack mt={3} mb={1} direction={"row-reverse"} justifyContent={"space-between"} width={'100%'}
                       onClick={handleShowDescriptionClick}>
                    <Typography variant={"h6"} fontWeight={"bold"} color={'text.primary'}
                                dir={'rtl'}>توضیحات</Typography>
                    <img src={IconChevronTop} alt={""} style={{
                        width: '24px',
                        height: '24px',
                        padding: '4px',
                        objectFit: "contain",
                        objectPosition: 'center',
                        transform: !showDesc ? 'rotate(180deg)' : 'rotate(0)'
                    }}/>
                </Stack>

                {
                    showDesc && order ?
                        <Typography variant={"body1"} color={'text.secondary'}>{order.description}</Typography>
                        : null
                }

                <Box bgcolor={'text.secondary'} height={'2px'} width={'100%'} sx={{
                    opacity: 0.2
                }}/>


                <Stack mt={5} gap={2} direction={"row-reverse"}>
                    <Typography variant={"body2"} fontWeight={"bold"} color={'text.primary'}
                                dir={'rtl'}>سوالی دارید یا نیازمند پشتیبانی‌اید؟</Typography>
                    <Typography variant={"body2"} fontWeight={"bold"} color={'primary'}
                                dir={'rtl'} onClick={callSupportClick}>تماس با پشتیبانی</Typography>
                </Stack>

                <Box width={'100%'} maxWidth={'440px'} mt={4}>
                    <Button
                        type="submit"
                        variant="contained"
                        disableElevation={true}
                        sx={{
                            padding: 2,
                            width: '100%',
                            maxWidth: '440px',
                            bgcolor: 'background.button',
                            color: 'text.button',
                            fontSize: '14px',
                            borderRadius: 2,
                        }}
                        onClick={reserveCargoClick}
                    >ثبت بار</Button>
                </Box>

                {
                    showBottomSheet ?
                        <SwipeableBottomSheet title={showBottomSheet.title} description={showBottomSheet.description}
                                              variant={showBottomSheet.variant} open={showBottomSheet.open}
                                              btn={showBottomSheet.btn}
                                              onClose={closeSheet}/>
                        : null
                }


            </Box> : null}
            <Loading isLoading={loading}/>
        </>
    );
}

function DetailRow({title, amount, icon}) {
    return (
        <>
            <Stack dir={'rtl'} my={'4px'} width={'100%'} direction={"row"} justifyContent={"space-between"}
                   alignItems={"center"}>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <img src={icon} alt={""} style={{
                        width: '20px',
                        height: '20px',
                        objectFit: "contain",
                        objectPosition: 'center'
                    }}/>
                    <Typography fontWeight={"bold"} variant={"body1"} color={'text.primary'}>{title}</Typography>
                </Stack>

                <Typography dir={'rtl'} variant={"body1"} color={'text.secondary'}>{amount}</Typography>

            </Stack>
        </>
    );
}

function DetailSection({cargo}) {

    return (
        <>
            {/*<DetailRow title={"شماره سفارش"} amount={formatPayloadCode(cargo.PayloadCode)} icon={IconCargoId}/>*/}
            {/*<Box bgcolor={'text.secondary'} mr={6} height={'2px'} width={'100%'} sx={{*/}
            {/*    opacity: 0.2*/}
            {/*}}/>*/}
            <DetailRow title={"تاریخ بارگیری"} amount={getPersianDate(cargo.loadDate)} icon={IconCalendar}/>
            <Box bgcolor={'text.secondary'} mr={6} height={'2px'} width={'100%'} sx={{
                opacity: 0.2
            }}/>
            <DetailRow title={"وزن بار"} amount={cargo.weight + " تن"} icon={IconWeight}/>
            <Box bgcolor={'text.secondary'} mr={6} height={'2px'} width={'100%'} sx={{
                opacity: 0.2
            }}/>
            <DetailRow title={"فرستنده"} amount={cargo.sender ?? 'نامشخص'} icon={IconSource}/>
            <Box bgcolor={'text.secondary'} mr={6} height={'2px'} width={'100%'} sx={{
                opacity: 0.2
            }}/>
            <DetailRow title={"مبدا"} amount={cargo.sourceCity?.name ?? 'نامشخص'} icon={IconSource}/>
            <Box bgcolor={'text.secondary'} mr={6} height={'2px'} width={'100%'} sx={{
                opacity: 0.2
            }}/>
            <DetailRow title={"گیرنده"} amount={cargo.receiver ?? 'نامشخص'} icon={IconDestination}/>
            <Box bgcolor={'text.secondary'} mr={6} height={'2px'} width={'100%'} sx={{
                opacity: 0.2
            }}/>
            <DetailRow title={"مقصد"} amount={cargo.destinationCity?.name ?? 'نامشخص'} icon={IconDestination}/>
            <Box bgcolor={'text.secondary'} mr={6} height={'2px'} width={'100%'} sx={{
                opacity: 0.2
            }}/>
            <DetailRow title={"نوع کامیون"} amount={getTruckNames(cargo.trailer)} icon={IconVehicle}/>
            <Box bgcolor={'text.secondary'} mr={6} height={'2px'} width={'100%'} sx={{
                opacity: 0.2
            }}/>
            <DetailRow title={"نوع بارگیر"} amount={cargo.trailer.name ?? 'نامشخص'} icon={IconVehicle}/>
            <Box bgcolor={'text.secondary'} mr={6} height={'2px'} width={'100%'} sx={{
                opacity: 0.2
            }}/>

            <DetailRow title={"باسکول"} amount={cargo.weighBridge === true ? "دارد" : "ندارد"} icon={IconWeighBridge}/>
            <Box bgcolor={'text.secondary'} mr={6} height={'2px'} width={'100%'} sx={{
                opacity: 0.2
            }}/>

            {
                cargo.Status ? <>

                    {/*<DetailRow title={"مسافت"} amount={cargo.Distance + " کیلومتر"} icon={IconDistance}/>*/}
                    {/*<Box bgcolor={'text.secondary'} mr={6} height={'2px'} width={'100%'} sx={{*/}
                    {/*    opacity: 0.2*/}
                    {/*}}/>*/}
                    <DetailRow title={"آدرس"} amount={cargo.address} icon={IconAddress}/>
                    <Box bgcolor={'text.secondary'} mr={6} height={'2px'} width={'100%'} sx={{
                        opacity: 0.2
                    }}/>
                </> : null
            }
        </>
    );
}




