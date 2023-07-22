import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "../../components/shared/Toolbar";
import Loading from "../../components/shared/Loading";
import Nav from "../../components/shared/Nav";
import {Stack, Typography, useTheme} from "@mui/material";
import IconProfile from "../../assets/images/ic_profile_place_holder.svg";
import IconMoneyWithdraw from "../../assets/images/ic_money_withdraw.svg";
import {ReactComponent as IconEditProfile} from "../../assets/images/ic_profile_edit.svg";
import {formatNumber, getUserFromLocalStorage, navigateTo, saveToken, saveUserInLocalStorage} from "../../utils/Utils";
import {getDriverInfoApi} from "../auth/AuthService";
import IconChevronTop from "../../assets/images/ic_chevron_top.svg";
import {ReactComponent as IconTermsAndConditions} from "../../assets/images/ic_terms_and_conditions.svg";
import {ReactComponent as IconAboutUs} from "../../assets/images/ic_about_us.svg";
import {ReactComponent as IconShare} from "../../assets/images/ic_share.svg";
import {ReactComponent as IconLogout} from "../../assets/images/ic_logout.svg";
import {ReactComponent as IconHistory} from "../../assets/images/ic_time.svg";
import {ReactComponent as IconNotification} from '../../assets/images/ic_notification_outline.svg';
import {ReactComponent as IconTruck} from '../../assets/images/ic_vehicle.svg';
import {BASE_URL_PRODUCTION} from "../../constants/Constants";
import {WithdrawBottomSheet} from "../../components/profile/WithdrawBottomSheet";
import {toast} from "react-hot-toast";
import {getWalletInfoApi, requestWithdrawApi} from "../../services/TransactionService";
import {SwipeableBottomSheet} from "../../components/cargo/bottomsheets";


export default function Profile() {
    const navigate = useNavigate();

    const theme = useTheme()
    const [loading, setLoading] = useState(false)
    const [driverInfo, setDriverInfo] = useState()
    const [walletInfo, setWalletInfo] = useState()
    const [showWithdrawBottomSheet, setShowWithdrawBottomSheet] = useState(false)
    const localUser = getUserFromLocalStorage()
    const [showBottomSheet, setShowBottomSheet] = useState();


    useEffect(() => {
        getDriverInfo()
        getWalletInfo()

    }, [])

    function getDriverInfo() {
        if (loading)
            return
        setLoading(true)

        getDriverInfoApi().then(r => {
            // saveUserInLocalStorage(r.data)
            console.log('dirverInfo', r.data.data)
            setDriverInfo(r.data.data)
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            console.log('dirverInfo', e)
        })
    }

    function getWalletInfo() {
        if (loading)
            return
        setLoading(true)

        getWalletInfoApi().then(r => {
            console.log('walletInfo', r.data.data)
            setWalletInfo(r.data.data)
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            console.log('walletInfo', e)
        })
    }

    const requestWithdrawClicked = () => {
        if (driverInfo?.sheba?.length !== 26) {
            toast('برای تسویه ابتدا باید پروفایل خود را تکمیل کنید.')
            return;
        }
        if (walletInfo?.balance === 0) {
            toast('کیف پول شما خالی است.')
            return;
        }
        if (loading)
            return
        setLoading(true)
        requestWithdrawApi(walletInfo?.balance).then(r => {
            setShowBottomSheet({
                variant: 'positive',
                open: true,
                title: 'درخواست تسویه',
                description: r.data.message ? r.data.message : 'درخواست تسویه ثبت شد.',
                btn: 'باشه',
                type: 'reserve',
                status: 'failed'
            })
            getWalletInfo()
            setLoading(false)
            console.log(r.data)
        }).catch(e => {
            setShowBottomSheet({
                variant: 'negative',
                open: true,
                title: 'درخواست تسویه',
                description: e.data.message ?? 'خطا در تسویه',
                btn: 'متوجه شدم',
                type: 'reserve',
                status: 'failed'
            })
            setLoading(false)
            console.log(e)
            if (e.data.message)
                toast(e.data.message)
        })

    }

    const closeSheet = () => {
        setShowBottomSheet(null);

    };

    return (
        <>
            <Toolbar/>
            {driverInfo ?
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

                    <Stack gap={2} width={'100%'} direction={'row-reverse'} alignItems={"center"}>
                        <img
                            src={IconProfile}

                            style={{
                                padding: '12px',
                                width: '44px',
                                height: '44px',
                                objectFit: "contain",
                                backgroundColor: '#E9E9EB',
                                borderRadius: '100px'
                            }}
                            alt={""}/>
                        <Typography variant={"body1"} fontWeight={"bold"}>
                            {(driverInfo.firstname && driverInfo.firstname !== "null" ? driverInfo.firstname : "") + " " + driverInfo.lastname}
                        </Typography>
                    </Stack>

                    <Stack width={'100%'} direction={"row-reverse"} justifyContent={"space-between"}
                           alignItems={"center"}>
                        <Stack direction={"column"} dir={'rtl'} alignItems={'flex-start'}>
                            <Typography variant={"caption"} color={'text.secondary'}>اعتبار</Typography>
                            <Typography variant={"h6"} fontWeight={"bold"}
                                        color={'text.primary'}>{formatNumber(walletInfo?.balance) + " ریال"} </Typography>
                        </Stack>

                        <Stack onClick={requestWithdrawClicked} borderRadius={'8px'} px={2} py={'4px'}
                               direction={"row-reverse"} alignItems={"center"}
                               bgcolor={'primary.main'} gap={1}>

                            <img src={IconMoneyWithdraw} style={{
                                width: '20px',
                                height: '20px',
                                objectFit: "contain"
                            }}
                                 alt={''}
                            />
                            <Typography fontWeight={'500'} variant={"caption"} color={'white'}>درخواست
                                تسویه</Typography>
                        </Stack>
                    </Stack>

                    <Box sx={{opacity: '0.15'}} width={'100%'} bgcolor={'text.secondary'} height={'2px'} mt={3}/>


                    <Typography textAlign={"right"} variant={"caption"} color={'text.secondary'}
                                width={'100%'}>اطلاعات</Typography>
                    <ProfileRow
                        onClick={() => {
                            navigateTo(navigate, 'account/edit')
                        }}
                        title={driverInfo.sheba ? 'ویرایش حساب کاربری' : 'تکمیل حساب کاربری'} color={''}
                        icon={<IconEditProfile width={'15px'} height={'15px'}/>}
                        buttonText={driverInfo.sheba ? '' : 'الزامی'}
                    />

                    <ProfileRow
                        onClick={() => {
                            navigateTo(navigate, 'trucks/add')
                        }}
                        title={driverInfo?.vehicles && driverInfo?.vehicles.length > 0 ? "ویرایش وسیله نقلیه" : "افزودن وسیله نقلیه"}
                        icon={<IconTruck width={'15px'} height={'15px'}/>}
                        buttonText={driverInfo?.vehicles && driverInfo?.vehicles.length > 0 ? '' : 'الزامی'}
                    />

                    <Typography mt={2} textAlign={"right"} variant={"caption"} color={'text.secondary'}
                                width={'100%'}>مالی</Typography>
                    <ProfileRow onClick={() => {
                        navigateTo(navigate, 'transaction-history')
                    }} title={'سوابق مالی'} color={''} icon={<IconHistory width={'15px'} height={'15px'}/>}/>


                    <Typography mt={2} textAlign={"right"} variant={"caption"} color={'text.secondary'}
                                width={'100%'}>عمومی</Typography>

                    <ProfileRow onClick={() => {
                        navigateTo(navigate, 'notifications')
                    }} title={'اعلان‌ها'} color={'#888'}
                                icon={<IconNotification fill={theme.palette.primary.main} width={'15px'}
                                                        height={'15px'}/>}/>

                    <ProfileRow onClick={() => {
                        // navigateTo(navigate , 'transaction-history')
                    }} title={'معرفی به دوستان'} color={''} icon={<IconShare width={'15px'} height={'15px'}/>}/>

                    <ProfileRow onClick={() => {
                        window.open(BASE_URL_PRODUCTION + '/site2/services')
                    }} title={'شرایط و ضوابط'} color={''}
                                icon={<IconTermsAndConditions width={'15px'} height={'15px'}/>}/>

                    <ProfileRow onClick={() => {
                        // navigateTo(navigate , 'transaction-history')
                    }} title={'درباره ما'} color={''} icon={<IconAboutUs width={'15px'} height={'15px'}/>}/>

                    <LogoutItem/>
                    <WithdrawBottomSheet
                        open={showWithdrawBottomSheet}
                        onClose={() => {
                            setShowWithdrawBottomSheet(false)
                        }}
                        driverInfo={driverInfo}/>

                    {
                        showBottomSheet ?
                            <SwipeableBottomSheet title={showBottomSheet.title}
                                                  description={showBottomSheet.description}
                                                  variant={showBottomSheet.variant} open={showBottomSheet.open}
                                                  btn={showBottomSheet.btn}
                                                  onClose={closeSheet}/>
                            : null
                    }
                </Box> : null
            }

            <Nav currentPage={"account"}/>
            <Loading isLoading={loading}/>
        </>
    );
}

function ProfileRow({title, icon, color, buttonText, onClick}) {
    return (
        <>
            <Stack onClick={onClick ? onClick : () => {
            }} dir={'rtl'} my={'4px'} width={'100%'} direction={"row"} justifyContent={"space-between"}
                   alignItems={"center"}>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <Stack width={'32px'}
                           height={'32px'}
                           bgcolor={'#FF3B3033'}
                           borderRadius={'50%'}
                           alignItems={"center"}
                           justifyContent={"center"}
                    >
                        {icon}
                        {/*<icon width={'15px'} height={'15px'}/>*/}
                    </Stack>

                    {/*<img src={icon} alt={""} style={{*/}
                    {/*    width: '30px',*/}
                    {/*    height: '30px',*/}
                    {/*    backgroundColor: '#3D5DFF33',*/}
                    {/*    borderRadius: '30px',*/}
                    {/*    padding: '7px',*/}
                    {/*    objectFit: "contain",*/}
                    {/*    objectPosition: 'center'*/}
                    {/*}}/>*/}
                    <Typography fontSize={11} fontWeight={"bold"} variant={"caption"}
                                color={'text.primary'}>{title}</Typography>
                </Stack>

                <Stack direction={"row-reverse"} alignItems={"center"} gap={1}>

                    <img src={IconChevronTop} alt={""} style={{
                        color: color,
                        width: '22px',
                        height: '22px',
                        padding: '4px',
                        objectFit: "contain",
                        objectPosition: 'center',
                        transform: 'rotate(-90deg)'
                    }}/>
                    <Typography variant={"body2"} color={'#C93400'}>{buttonText}</Typography>
                </Stack>


            </Stack>
        </>
    );
}


function LogoutItem() {
    const navigate = useNavigate()
    const logout = () => {
        saveUserInLocalStorage(null)
        saveToken(null)
        navigate('/login')
    }
    return (
        <>
            <Stack onClick={logout} dir={'rtl'} my={'4px'} width={'100%'} direction={"row"}
                   justifyContent={"space-between"}
                   alignItems={"center"}>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <Stack width={'32px'}
                           height={'32px'}
                           bgcolor={'#FF3B3033'}
                           borderRadius={'50%'}
                           alignItems={"center"}
                           justifyContent={"center"}
                    >
                        <IconLogout width={'15px'} height={'15px'}/>
                    </Stack>
                    <Typography fontSize={11} fontWeight={"bold"} variant={"caption"} color={'#FF3B30'}>
                        خروج از حساب کاربری
                    </Typography>
                </Stack>

                <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <img src={IconChevronTop} alt={""} style={{
                        width: '22px',
                        height: '22px',
                        padding: '4px',
                        objectFit: "contain",
                        objectPosition: 'center',
                        transform: 'rotate(-90deg)'
                    }}/>
                </Stack>


            </Stack>
        </>
    );
}