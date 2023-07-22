import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GetOtpApi} from "./AuthService";
import {toast} from "react-hot-toast";
import Box from "@mui/material/Box";
import {TextField, Typography, useTheme} from "@mui/material";
import Button from "@mui/material/Button";
import {isInStandaloneMode, isIos, navigateTo} from "../../utils/Utils";
import Loading from "../../components/shared/Loading";
import IconLogo from "../../assets/images/logo.webp";
import {BASE_URL_PRODUCTION} from "../../constants/Constants";
import AddToHomeScreen from "../../components/shared/AddToHomeScreenDialog";


function Login() {
    const [mobile, setMobile] = useState('')
    const [loading, setLoading] = useState(false)
    const [showAddToHomeScreen, setShowAddToHomeScreen] = useState(false)


    const navigator = useNavigate();

    useEffect(() => {
        if (!isInStandaloneMode() && isIos()) {
            setShowAddToHomeScreen(true)
        }
    }, [])


    //Func
    const getOtp = async () => {
        if (mobile.length < 11) {
            toast('لطفا موبایل خود را وارد کنید')
            return
        }
        if (loading) return;
        setLoading(true)
        GetOtpApi(mobile).then(r => {
            console.log('GetOtpApi', r)
            gotoOtpPage()
            setLoading(false)
        }).catch(e => {
            console.log('error', e);
            setLoading(false)
            if (e?.data?.message)
                toast(e.data.message)
            else{
                toast('خطایی رخ داده است')
            }
        });
    }
    const gotoOtpPage = () => {
        navigateTo(navigator, "verify", {mobile: mobile});
    }



    // const onEnter = (event, callback) => event.key === 'Enter' && callback()
    // const enterEvent = () => getOtp();

    const onTextChange = (e) => {
        if (e.target.value.length < 12)
            setMobile(e.target.value)
    }

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowY: 'scroll',
                    justifyContent: 'center',
                    gap: '8px',
                    paddingTop: 4,
                    outline: '1px red solid '

                }}
            >
                <img src={IconLogo} style={{
                    width: '64px',
                    height: '64px'
                }}
                     alt={""}
                />
                <Typography width={"100%"} px={3} textAlign={"right"} fontWeight={"bold"} variant={"h5"}
                            color={'text.primary'}>ورود | ثبت‌نام</Typography>
                <Typography width={"100%"} textAlign={"right"} px={3} variant={"body1"} color={'text.primary'}>لطفا
                    شماره موبایل خود را وارد
                    کنید</Typography>

                <TextField type={"tel"} onChange={onTextChange} placeholder={"مثال: 4576 123 0912"} px={3} dir={'rtl'} sx={{
                    textAlign: 'right',
                    maxWidth: '440px', width: '100%', px: 3, marginTop: 2
                }} variant={"outlined"} value={mobile}/>

                <Box width={'100%'} maxWidth={'440px'} px={3} mt={4}>
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
                        onClick={() => {
                            getOtp()
                        }}
                    >ورود</Button>
                </Box>

                <Typography width={"100%"} textAlign={"right"} px={3} variant={"body1"} color={'text.primary'}>
                    ورود به آی‌بار به منزله موافقت با
                    <Typography onClick={()=>{
                        window.open(BASE_URL_PRODUCTION+'/site2/services')
                    }} sx={{display: 'inline-block'}} fontWeight={"bold"} color={"primary"}
                                mx={1}>قوانین</Typography>
                    است
                </Typography>

                <Loading isLoading={loading}/>

                {showAddToHomeScreen === true ? <AddToHomeScreen open={showAddToHomeScreen} onDismissClicked={() => {
                        setShowAddToHomeScreen(false)
                    }}/> : null
                }
            </Box>
        </>
    );
}


export default Login;

