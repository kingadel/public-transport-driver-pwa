import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar, {ToolbarDefaultRight} from "../../components/shared/Toolbar";
import Loading from "../../components/shared/Loading";
import {getDriverInfoApi, updateProfileApi} from "../auth/AuthService";
import {Stack, TextField, Typography} from "@mui/material";
import {toast} from "react-hot-toast";
import Button from "@mui/material/Button";
import IconChevronTop from "../../assets/images/ic_chevron_top.svg";
import {ShebaBottomSheet} from "../../components/profile/ShebaBottomSheet";
import {addOrEditTruck} from "../../services/VehicleService";


export default function EditProfile() {
    const navigator = useNavigate()
    const [loading, setLoading] = useState(false)
    const [driver, setDriver] = useState()
    const [showShebaBottomSheet, setShowShebaBottomSheet] = useState(false)
    const [backPressedOnce, setBackPressedOnce] = useState(false)
    const [isDirty, setIsDirty] = useState(false)
    const [changes, setChanges] = useState({
        sheba: undefined, firstname: undefined, lastname: undefined, nationalNumber: undefined
    })


    useEffect(() => {
        // console.log(localUser)
        if (loading)
            return
        setLoading(true)

        getDriverInfoApi().then(r => {
            setLoading(false)
            const driver = r.data.data
            setDriver(driver)
            console.log('driver', driver)
            const newChanges = {
                sheba: driver?.sheba,
                firstname: driver?.firstname,
                lastname: driver?.lastname,
                nationalNumber: driver?.nationalNumber
            }
            setChanges(newChanges)
        }).catch(e => {
            setLoading(false)
            toast("خطایی رخ داده است")
            console.log('driver', e)
        })
    }, [])

    useEffect(() => {
        console.log('changes', changes)
        if (changes.firstname && (driver?.firstname !== changes.firstname)) {
            setIsDirty(true)
            return
        }
        if (changes.lastname && (driver?.lastname !== changes.lastname)) {
            setIsDirty(true)
            return
        }
        if (changes.sheba && (driver?.sheba !== changes.sheba)) {
            setIsDirty(true)
            return
        }
        if (changes.nationalNumber && (driver?.nationalNumber !== changes.nationalNumber)) {
            setIsDirty(true)
            return
        }
        setIsDirty(false)
    }, [changes , driver])

    const onValueChanged = (e) => {
        const {value, name} = e.target
        console.log(name, value)
        setChanges({...changes, [name]: value})
    }


    const onBackClicked = () => {
        if (isDirty !== true) {
            navigator(-1)
        } else {
            if (backPressedOnce !== true) {
                setBackPressedOnce(true)
                toast('شما اطلاعات ثبت نشده دارید. برای ذخیره اطلاعات دکمه ثبت تغییرات را بزنید.')
                toast(' برای خروج از این صفحه مجددا دکمه بازگشت را لمس کنید.')
            } else {
                navigator(-1)
            }
        }
    }

    const onShebaChanged = (newValue) => {
        setShowShebaBottomSheet(false)
        setChanges({...changes, sheba: newValue.replace(/\D/g, "")})
    }

    const onShebaClicked = () => {
        // if (driver.sheba.length === 24) {
        //     toast('در حال حاضر امکان تغییر شماره شبا وجود ندارد.')
        // } else
        setShowShebaBottomSheet(true)
    }


    const updateProfile = (e) => {
        e.stopPropagation()
        if (loading)
            return
        setLoading(true)

        updateProfileApi(changes).then(r => {
            setLoading(false)
            toast('با موفقیت انجام شد')
            navigator(-1)
        }).catch(e => {
            setLoading(false)
            console.log(e)
            toast('خطایی رخ داده یا اطلاعات وارد شده صحیح نیست.')
        })
    }

    return (
        <>
            <Toolbar rightChild={<ToolbarDefaultRight onClick={onBackClicked}/>}/>
            {driver ?
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        justifyContent: 'center',
                        gap: '8px',
                        paddingTop: 6,
                        paddingX: 2,
                        pb: 10
                    }}
                >

                    <Typography variant={"h6"} fontWeight={"bold"} color={'text.primary'} textAlign={"right"}
                                width={'100%'} mt={4}>اطلاعات حساب کاربری</Typography>
                    <Typography fontWeight={"bold"} variant={"caption"} color={'text.primary'} textAlign={"right"}
                                dir={'rtl'}
                                width={'100%'}>تکمیل اطلاعات زیر برای فعالیت شما در آی‌بار ضروری است.</Typography>

                    <Typography mt={2} textAlign={"right"} variant={"caption"} color={'text.secondary'}
                                width={'100%'}>نام</Typography>

                    <TextField size={"small"} name="firstname" onChange={onValueChanged} placeholder={"محمدرضا"}
                               dir={'rtl'} sx={{
                        textAlign: 'right',
                        width: '100%',
                    }} variant={"outlined"}
                               value={changes.firstname ?? ''}/>


                    <Typography mt={2} textAlign={"right"} variant={"caption"} color={'text.secondary'}
                                width={'100%'}>نام خانوادگی </Typography>
                    <TextField size={"small"} name="lastname" onChange={onValueChanged} placeholder={"احمدی"}
                               dir={'rtl'} sx={{
                        textAlign: 'right',
                        width: '100%',
                    }} variant={"outlined"}
                               value={changes.lastname ?? ''}/>


                    <Typography
                        mt={2}
                        textAlign={"right"}
                        variant={"caption"}
                        color={'text.secondary'}
                        width={'100%'}>کد ملی</Typography>
                    <TextField
                        size={"small"}
                        name="nationalNumber"
                        onChange={onValueChanged}
                        placeholder={"2651345678"}
                        dir={'rtl'}
                        sx={{
                            textAlign: 'right',
                            width: '100%',
                        }}
                        type={"tel"}
                        variant={"outlined"}
                        value={changes.nationalNumber ?? ''}/>


                    <Typography
                        mt={2}
                        textAlign={"right"}
                        variant={"caption"}
                        color={'text.secondary'}
                        width={'100%'}>شماره موبایل</Typography>
                    <TextField
                        size={"small"}
                        name="mobile"
                        onChange={onValueChanged}
                        placeholder={"مثال: ۰9********"}
                        dir={'rtl'}
                        disabled={driver.mobile}
                        sx={{
                            textAlign: 'right',
                            width: '100%',
                        }}
                        type={'tel'}
                        variant={"outlined"}
                        value={driver.mobile ?? ''}/>


                    <Typography
                        mt={2}
                        textAlign={"right"}
                        variant={"caption"}
                        color={'text.secondary'}
                        width={'100%'}>شبا</Typography>

                    <Stack
                        onClick={
                            onShebaClicked
                        }
                        width={'100%'}
                        height={'38px'}
                        px={2}
                        border={'1px solid lightgray'}
                        borderRadius={1}
                        alignItems={"center"}
                        direction={"row"}
                        justifyContent={'space-between'}>
                        <img style={{
                            width: '14px',
                            height: '14px',
                            objectFit: "contain",
                            objectPosition: 'center',
                            transform: 'rotate(-90deg)'
                        }}
                             src={IconChevronTop}
                             alt={''}/>
                        <Typography
                            size={"small"}
                            dir={'rtl'}
                        >
                            {driver.sheba}
                        </Typography>

                    </Stack>


                    <Box position={"fixed"} left={0} right={0} bottom={0} width={'100%'} bgcolor={"white"}
                         maxWidth={'440px'} py={2} px={3} mt={4}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isDirty !== true}
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
                            onClick={updateProfile}
                        >ثبت تغییرات</Button>
                    </Box>


                    <ShebaBottomSheet open={showShebaBottomSheet}
                                      initialPlate={changes.sheba}
                                      onClose={() => {
                                          setShowShebaBottomSheet(false)
                                      }}
                                      onConfirmClicked={onShebaChanged}/>

                </Box> : null
            }
            <Loading isLoading={loading}/>
        </>
    );
}





