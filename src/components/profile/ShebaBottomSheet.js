import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {ShebaInquiry} from "../../pages/auth/AuthService";
import {Checkbox, Stack, SwipeableDrawer, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {Puller} from "../cargo/bottomsheets";
import Button from "@mui/material/Button";
import Loading from "../shared/Loading";

export function ShebaBottomSheet({open, onClose, initialSheba, onConfirmClicked}) {

    const [sheba, setSheba] = useState(initialSheba && initialSheba !== '-' ? initialSheba : '')
    const [isDoubleChecked, setIsDoubleChecked] = useState(false)
    const [shebaOwner, setShebaOwner] = useState()
    const [confirmCheckbox, setConfirmCheckbox] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setIsDoubleChecked(false)
        setShebaOwner(false)
        setConfirmCheckbox(false)
    },[open])
    const onShebaChanged = (e) => {
        if (e.target.value.length === 2) {
            setSheba('')
        } else if (e.target.value.length < 27) {
            console.log('value', e.target.value)
            console.log('value length', e.target.value.length)
            if (!e.target.value.includes('IR')) {
                setSheba('IR' + e.target.value
                    .replaceAll('I', '')
                    .replaceAll('r', '')
                    .replaceAll('I', '')
                    .replaceAll('R', '')
                )
            } else
                setSheba(e.target.value)
        }

    }
    const onSubmit = () => {
        if (onConfirmClicked && isDoubleChecked === true) {
            if (confirmCheckbox === true) {
                onConfirmClicked(sheba, shebaOwner)
            } else {
                toast('لطفا ابتدا مشخصات خود را تایید کنید')
            }
            return
        }

        checkAccountBySheba()
    }
    const checkAccountBySheba = () => {
        if (loading)
            return;
        setLoading(true)
        ShebaInquiry(sheba).then(r => {
            setLoading(false)
            console.log('sheba inquiry', r.data)
            setShebaOwner(r.data.ownername)
            setIsDoubleChecked(true)

        }).catch(e => {
            if (e?.data?.message)
                toast(e.data.message)
            else{
                toast('خطایی رخ داده است')
            }
            setLoading(false)
            console.log(e)
        })
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
                <Typography align={"right"} variant={"body1"} mt={4} fontWeight={"bold"}>شماره شبا</Typography>
                <Typography align={"right"} variant={"body2"} mt={3} color={'text.secondary'}>شماره شبای خود را بدون IR
                    وارد کنید:</Typography>

                <TextField
                    size={"small"}
                    onChange={onShebaChanged}
                    placeholder={"مثال:IR123400000000111170000000"}
                    dir={'rtl'}
                    disabled={isDoubleChecked}
                    sx={{
                        textAlign: 'right',
                        width: '100%',
                        mt: 1
                    }}
                    type={'tel'}
                    variant={"outlined"}
                    value={sheba}/>

                {isDoubleChecked === true ? <React.Fragment>
                        <Stack direction={'row-reverse'} mt={4} gap={2}>
                            <Typography mr={'4px'} dir={'rtl'} color={"text.secondary"} variant={"body1"}
                                        fontWeight={"bold"}>
                                نام صاحب حساب:
                            </Typography>
                            <Typography
                                dir={'rtl'}
                                color={"darkblue"}
                                variant={"body1"}
                                fontWeight={"bold"}>
                                {shebaOwner}
                            </Typography>
                        </Stack>

                        <Stack
                            width={'100%'}
                            dir={'rtl'}
                            direction={'row'}
                            alignItems={"center"}
                            mt={1}>

                            <Checkbox
                                checked={confirmCheckbox}
                                onChange={(e) => {
                                    console.log(e.target.checked)
                                    setConfirmCheckbox(e.target.checked)
                                }}

                                sx={{
                                    px: '0',
                                    '& .MuiSvgIcon-root': {fontSize: 22}
                                }}/>
                            <Typography variant={"body2"} fontWeight={"bold"} mt={'1px'}>
                                صحت اطلاعات استعلام شده را تایید می‌کنم</Typography>

                        </Stack>
                    </React.Fragment>
                    : null
                }

                <Box width={'100%'} maxWidth={'440px'} mt={5}>
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
                        onClick={onSubmit}
                    >{isDoubleChecked === true ? 'تایید اطلاعات' : 'استعلام مشخصات'}</Button>
                </Box>
            </Box>
            <Loading isLoading={loading}/>
        </SwipeableDrawer>
    );
}
