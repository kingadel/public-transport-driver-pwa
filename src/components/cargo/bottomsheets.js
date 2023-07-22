import React from 'react';
import Box from "@mui/material/Box";
import {Stack, styled, SwipeableDrawer, Typography} from "@mui/material";
import {ChevronLeft} from "@mui/icons-material";
import IconConfirm from "../../assets/images/ic_confirm.svg";
import IconError from "../../assets/images/ic_error.svg";
import {useNavigate} from "react-router-dom";
import {navigateTo} from "../../utils/Utils";
import Button from "@mui/material/Button";

export function BottomSheetInform({title, description, buttonClick, isPositive, icon ,btnText }) {
    const navigate = useNavigate()

    return (
        <Box width={'100%'} display={"flex"} mt={1} flexDirection={"column"} px={3} pt={3}>
            <Typography textAlign={"right"} variant={"h6"} fontWeight={"bold"} mb={4}>{title}</Typography>
            <Stack alignItems={"center"} direction={"column"} gap={1} mt={2} dir={'rtl'}>
                <img src={icon} alt={""} style={{
                    width: '60px',
                    height: '60px',
                    objectFit: "contain"
                }}/>
                <Stack mt={3}/>
                {isPositive ? <Typography textAlign={"right"} variant={"body1"} fontWeight={"bold"}
                                          px={3}>
                    تبریک!
                </Typography> : null}
                <Typography textAlign={"right"} variant={"body2"} fontWeight={"bold"} mb={6}
                            px={3}>{description}</Typography>

                <Typography pb={3} variant={"body1"} fontWeight={"bold"} color={"primary"} onClick={buttonClick}>
                    {btnText}
                </Typography>
            </Stack>

        </Box>
    )
}


export function BottomSheetConfirmation({title, description, buttonClick}) {

    return (
        <Box width={'100%'} display={"flex"} mt={3} flexDirection={"column"}>

        </Box>
    )
}

export function SwipeableBottomSheet({
                                         open,
                                         onClose,
                                         variant,
                                         onNegativeClick,
                                         onPositiveClick,
                                         title,
                                         description,
                                         btn
                                     }) {
    const drawerBleeding = 56;


    return (
        <SwipeableDrawer
            // container={container}
            anchor="bottom"
            open={open}
            onClose={onClose}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <Box>
                <Puller/>
                {variant === 'positive' ?
                    <BottomSheetInform
                        icon={IconConfirm}
                        title={title}
                        description={description}
                        isPositive={false}
                        btnText={btn? btn : 'بازگشت'}
                        buttonClick={onClose ? onClose : () => {
                        }}/> : null}

                {variant === 'negative' ?
                    <BottomSheetInform
                        icon={IconError}
                        title={title}
                        description={description}
                        isPositive={false}
                        btnText={btn? btn : 'بازگشت'}
                        buttonClick={onClose ? onClose : () => {
                        }}/> : null}
            </Box>
        </SwipeableDrawer>
    )
}

export const Puller = styled(Box)(({theme}) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.text.secondary,
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));


