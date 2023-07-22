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
import {deliverCargoApi, getCargoDetail} from "../../services/CargoService";
import {toast} from "react-hot-toast";
import {SwipeableBottomSheet} from "../../components/cargo/bottomsheets";


export default function CargoDetail() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [showDetail, setShowDetail] = useState(true)
    const [showDesc, setShowDesc] = useState(false)
    const [driver, setDriver] = useState()
    const [showBottomSheet, setShowBottomSheet] = useState(true);
    const [cargo, setCargo] = useState();


    const localUser = getUserFromLocalStorage()
    const location = useLocation()
    const cargoId = location.state.cargoDetail.cargoId

    const copyPayloadCode = () => {
        navigator.clipboard.writeText(cargo.cargoId).then(function () {

            toast('کپی شد')

        }, function () {
        });
    }


    useEffect(() => {
        console.log('local user', getUserFromLocalStorage())

        getCargoDetail(cargoId).then(r => {
            setCargo(r.data.data)
            console.log('Cargo detail ', r.data)
        }).catch(e => {
            console.log('getDriverInformation error ', e)
        })
        console.log('cargoDetail', cargo)
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

    const deliverCargoClick = () => {
        if (
            !validateDriver()
        ) return
        if (loading)
            return;
        setLoading(true)

        deliverCargoApi().then(r => {
            setShowBottomSheet({
                variant: 'positive',
                open: true,
                title: 'تحویل بار',
                description: r.data?.message ? r.data.message : 'تحویل باربا موفقیت ثبت شد.',
                btn: 'باشه',
                type: 'delivery',
                status: 'success'
            })
            setLoading(false)
            console.log("deliver cargo", r.data)
        }).catch(e => {
            setShowBottomSheet({
                variant: 'negative',
                open: true,
                title: 'تحویل بار',
                description: e.data.message ? e.data.message : 'خطا در ثبت بار',
                btn: 'متوجه شدم',
                type: 'delivery',
                status: 'failed'
            })
            setLoading(false)
            console.log("deliver cargo error", e)
        })

    }

    return (
        <>
            <Toolbar rightChild={<ToolbarDefaultRight/>}>
                <Typography textAlign={"center"} variant={"h6"}>جزییات بار</Typography>
            </Toolbar>
            {cargo ? <Box
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
                            {cargo.title}
                        </Typography>
                        <Typography fontWeight={"bold"} variant={"body1"} color={'background.red'}>
                            کرایه:
                            {" " + new Intl.NumberFormat('en-US').format(cargo.driverFee) + " "}
                            ریال
                        </Typography>
                    </Stack>

                </Stack>


                <Typography dir={'rtl'} textAlign={"right"} variant={"body1"} color={'#FF6905'} width={'100%'} mt={2}>
                    پرداخت سهم باربری با آی‌بار است.
                </Typography>

                {cargo?.state.state && cargo?.state.state > 0 ?

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
                                بار</Typography>
                        </Stack>

                        <Typography dir={'rtl'} variant={"h6"} fontWeight={"bold"}
                                    color={'text.primary'}>{cargo.cargoId}</Typography>

                    </Stack>
                    : null}

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
                                color={'text.primary'}>{cargo.orderId}</Typography>

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
                    showDetail && cargo ? <DetailSection cargo={cargo}/> : null
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
                    showDesc && cargo ?
                        <Typography variant={"body1"} color={'text.secondary'}>{cargo.description}</Typography>
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

                {cargo?.state.state === 3 || cargo?.state.state === 4 ?
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
                            onClick={deliverCargoClick}
                        >تخلیه بار</Button>
                    </Box> : null
                }
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




