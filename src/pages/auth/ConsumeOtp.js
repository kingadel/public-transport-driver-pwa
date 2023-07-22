import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ConsumeOtpApi, GetOtpApi} from "./AuthService";
import {toast} from "react-hot-toast";
import Box from "@mui/material/Box";
import {TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Toolbar, {ToolbarDefaultLeft} from "../../components/shared/Toolbar";
import IconLogo from "../../assets/images/logo.webp";
import Loading from "../../components/shared/Loading";
import {navigateTo, saveToken, saveUserInLocalStorage} from "../../utils/Utils";


function ConsumeOtp() {
    const navigator = useNavigate();
    const location = useLocation();
    const params = location.state

    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState({
        timer: '05:00',
        startTime: 299,//seconds
        count: 299,//seconds,
        totalCount: 299,
        reverse: true,
        finished: false
    })
    const Ref = useRef(null);
    const resetTimer = () => {
        setTimer({
            timer: '04:49',
            startTime: 299,//seconds
            count: 299,//seconds,
            totalCount: 299,
            reverse: true,
            finished: false
        })
    };


    useEffect(() => {
        let interval = null
        if (!timer.finished)
            interval = setInterval(() => {
                tick(timer)
            }, 1000);
        else {
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [timer])


    useEffect(() => {
    }, [])

    const tick = (state) => {
        if (state.finished) return
        console.log('tick', state.count)
        if (state.reverse) {
            const count = state.count - 1
            if (state.count > 0) {
                setTimer({...timer, count: count, timer: calculateTimer(count)})
            } else {
                setTimer({...timer, count: count, finished: true, timer: ''})
            }
        }
    }


    const calculateTimer = (count) => {
        const min = Math.floor(count / 60)
        const second = count % 60
        const calculatedMin = min < 10 ? `0${min}:` : `${min}:`
        const calculatedSecond = second < 10 ? `0${second}` : `${second}`
        return calculatedMin + calculatedSecond
    }

    //Func
    const consumeOtp = async () => {
        console.log('mobile', params.mobile)
        if (code.length < 5) {
            toast('لطفا کد ارسال شده به موبایل خود را وارد کنید')
            return
        }
        if (loading) return;
        setLoading(true)
        ConsumeOtpApi(params.mobile, code).then(r => {
            console.log('user', r.data)
            // todo save token
            saveToken(r.data.token)
            navigateTo(navigator, 'home')
            setLoading(false)
        }).catch(e => {
            console.log('error', e);
            setLoading(false)
            if (e?.data?.message)
                toast(e.data.message)
        });
    }

    const sendOtpAgain = async () => {
        if (!timer.finished)
            return
        if (loading) return;
        setLoading(true)
        GetOtpApi(params.mobile).then(r => {
            toast('کد ورود مجددا ارسال شد.')
            resetTimer()
            setLoading(false)
        }).catch(e => {
            console.log('error', e);
            setLoading(false)
            if (e?.data?.message)
                toast(e.data.message)
            else {
                toast('خطایی رخ داده است')
            }
        });
    }

    const onCodeChanged = (newValue) => {
        const text = newValue.target.value
        if (text.length < 6)
            setCode(newValue.target.value)
    }


    const onEnter = (event, callback) => event.key === 'Enter' && callback()
    const enterEvent = () => consumeOtp();


    return (
        <>
            <Toolbar leftChild={<ToolbarDefaultLeft/>}/>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowY: 'scroll',
                    justifyContent: 'center',
                    gap: '8px',
                    paddingTop: 1,
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
                            color={'text.primary'}>کد فعال‌سازی</Typography>
                <Typography width={"100%"} textAlign={"right"} px={3} variant={"body1"} color={'text.primary'}>
                    لطفا کد ۵ رقمی ارسال شده به شماره
                    {` ${params.mobile} `}
                    را وارد کنید.
                </Typography>

                <TextField
                    inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                    onChange={onCodeChanged}
                    placeholder={"* * * * *"}
                    px={3}
                    dir={'rtl'}
                    sx={{
                        textAlign: 'right',
                        maxWidth: '440px', width: '100%', px: 3, marginTop: 2
                    }}
                    variant={"outlined"}
                    value={code}
                />

                <Typography onClick={sendOtpAgain} width={"100%"} textAlign={"center"} mt={4} px={3} variant={"body1"}
                            color={timer.finished ? 'primary.main' : 'text.secondary'}>
                    ارسال مجدد
                    {` ${timer.timer} `}
                </Typography>
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
                            consumeOtp()
                        }}
                    >ورود</Button>
                </Box>

                <Loading isLoading={loading}/>

            </Box>
        </>
    );
}


export default ConsumeOtp;

