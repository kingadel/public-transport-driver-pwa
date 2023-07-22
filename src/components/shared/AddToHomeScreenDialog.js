import React from 'react'
import {Dialog, Stack, Typography, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import {AddBoxOutlined, IosShareOutlined} from "@mui/icons-material";


function AddToHomeScreen({onDismissClicked , open}) {
    const theme = useTheme()
    return (
        <Dialog onClose={onDismissClicked} fullWidth={true} open={open} onBackdropClick={onDismissClicked}
                maxWidth={'md'}
                PaperComponent={Box}

                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        opacity: '1',
                        backgroundColor: theme.palette.background.default,
                    },
                }}>
            <Stack dir={'rtl'} direction={"column"} alignItems={"center"} pb={4} gap={1}
                   px={2}>
                <Typography
                    variant={"body1"}
                    color={'text.primary'}
                    fontSize={"large"}
                    mt={4}
                >افزودن به خانه</Typography>

                <Typography
                    variant={"body1"}
                    fontSize={"small"}
                    color={'text.primary'}
                    mt={4}
                >وب‌اپلیکیشن آی‌بار را به صفحه اصلی آیفون خود اضافه کنید</Typography>

                <Typography
                    variant={"h5"}
                    fontSize={"medium"}
                    color={'text.primary'}
                    mt={4}
                    width={'100%'}>
                    ۱. در نوار پایین دکمه
                    <IosShareOutlined sx={{pt : 1}} fontSize={'large'} color={"primary"}/>
                    Share را انتخاب کنید.
                </Typography>

                <Typography
                    variant={"h5"}
                    fontSize={"medium"}
                    color={'text.primary'}
                    mt={4}
                    width={'100%'}>
                    ۲. منوی بازشده را به بالا بکشید و گزینه
                    <AddBoxOutlined sx={{ transform : 'translateY(8px)', mx : 1}} fontSize={'large'} color={"primary"}/>
                    add to Home screen
                    را انتخاب کنید.
                </Typography>

                <Typography
                    variant={"h5"}
                    fontSize={"medium"}
                    color={'text.primary'}
                    mt={4}
                    width={'100%'}>
                    ۳. در مرحله بعد در قسمت بالا روی Add کلیک کنید
                </Typography>


                <Typography mt={4} color={'text.button'} sx={{
                    borderRadius: '3px',
                    px: 6,
                    bgcolor: 'background.button'
                }} variant={"body1"} py={1} px={2} onClick={onDismissClicked}>متوجه شدم</Typography>
            </Stack>
        </Dialog>
    )
}

export default AddToHomeScreen;
