import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {MenuItem, Select, Stack, SwipeableDrawer, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {Puller} from "../cargo/bottomsheets";
import IconChevronTop from "../../assets/images/ic_chevron_top.svg";
import Button from "@mui/material/Button";

export function PlateBottomSheet({open, onClose, initialPlate, onConfirmClicked}) {

    const [plateChar, setPlateChar] = useState(
        initialPlate?.replace(/[0-9]/g, '') ?? PlateAvailableCharacters[0])


    const [firstValue, setFirstValue] = useState(
        initialPlate?.replace(/\D/g, "").slice(0, 2) ?? '')


    const [secondValue, setSecondValue] = useState(
        initialPlate?.replace(/\D/g, "").slice(2, 5) ?? '')

    const [lastValue, setLastValue] = useState(
        initialPlate?.replace(/\D/g, "").slice(5, 7) ?? '')


    const [showChoosePlateChar, setShowChoosePlateChar] = useState(false)

    useEffect(()=>{
        setPlateChar(
            initialPlate?.replace(/[0-9]/g, '') ?? PlateAvailableCharacters[0]
        )

        setFirstValue(
            initialPlate?.replace(/\D/g, "").slice(0, 2) ?? ''
        )

        setSecondValue(
            initialPlate?.replace(/\D/g, "").slice(2, 5) ?? ''
        )

        setLastValue(
            initialPlate?.replace(/\D/g, "").slice(5, 7) ?? ''
        )
    },[initialPlate])
    const onCharChanged = (e) => {
        setShowChoosePlateChar(false)
        setPlateChar(e.target.value)
    }
    const onSubmit = () => {
        if (firstValue.length !== 2 || secondValue.length !== 3 || lastValue.length !== 2) {
            toast('لطفا تمام مقادیر را پر کنید')
            return
        }

        const finalValue = firstValue + plateChar + secondValue + lastValue
        console.log('finalValue', finalValue)

        if (onConfirmClicked)
            onConfirmClicked(
                finalValue
            )
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
                <Typography align={"right"} variant={"body1"} mt={4} fontWeight={"bold"}>شماره پلاک خودرو</Typography>
                <Stack
                    height={'54px'}
                    direction={"row"}
                    border={'1px solid black'}
                    width={'100%'}
                    borderRadius={'8px'}
                    mt={2}
                    overflow={"hidden"}
                    alignItems={"center"}
                >
                    <Box borderRadius={''} flexBasis={'10%'} bgcolor={'#007AFF'} height={'100%'}/>
                    <TextField
                        sx={{
                            flexBasis: '20%',
                            textAlign: 'center',
                            px: 3
                        }}
                        type={"number"}
                        value={firstValue}
                        onChange={(e) => {
                            if (e.target.value.length < 3) {
                                setFirstValue(e.target.value)
                            }
                        }}
                        variant={"standard"}
                        placeholder={'44'}
                        InputProps={{
                            style: {
                                fontSize: 24
                            },
                            disableUnderline: 'true'
                        }}/>
                    {
                        showChoosePlateChar ? <Select
                                size={"small"}
                                dir={'rtl'}
                                name={"plateChar"}
                                variant="standard"
                                sx={{
                                    height: '0px',
                                    flexBasis: '20%'
                                }}
                                defaultOpen={true}
                                open={true}
                                onClose={() => {
                                    setShowChoosePlateChar(false)
                                }}
                                disableUnderline={true}
                                defaultValue={plateChar}
                                value={plateChar}
                                onChange={onCharChanged}
                            >
                                {PlateAvailableCharacters.map(item => {
                                    return (
                                        <MenuItem sx={{
                                            fontSize: '16px'
                                        }} value={item}>{item}</MenuItem>
                                    )
                                })}
                            </Select> :
                            <Stack
                                onClick={() => {
                                    setShowChoosePlateChar(true)
                                }}
                                direction={"row"}
                                flexBasis={'20%'}
                                gap={1}
                                alignItems={"center"}
                            >
                                <img src={IconChevronTop} alt={""} style={{
                                    width: '22px',
                                    height: '22px',
                                    padding: '6px',
                                    objectFit: "contain",
                                    objectPosition: 'center',
                                    transform: 'rotate(-180deg)'
                                }}/>
                                <Typography variant={"h6"} fontWeight={"bold"}>
                                    {plateChar}
                                </Typography>
                            </Stack>
                    }

                    <TextField
                        sx={{
                            flexBasis: '25%',
                            textAlign: 'center',
                            px: 3
                        }}
                        value={secondValue}
                        onChange={(e) => {
                            if (e.target.value.length < 4) {
                                setSecondValue(e.target.value)
                            }
                        }}
                        type={"tel"}
                        variant={"standard"}
                        placeholder={'888'}
                        InputProps={{
                            style: {
                                fontSize: 24
                            },
                            disableUnderline: 'true'
                        }}/>
                    <Box height={'100%'} bgcolor={"black"} width={'1px'}/>

                    <Stack flexBasis={'25%'} alignContent={"center"} height={'100%'} direction={"column"}>
                        <Typography textAlign={"center"} variant={"caption"} color={'text.secondary'}>
                            ایران
                        </Typography>
                        <TextField
                            align
                            sx={{
                                textAlign: 'center',
                                width: '100%',
                                marginTop: '-2px'
                            }}
                            type={"tel"}
                            variant={"standard"}
                            placeholder={'20'}
                            value={lastValue}
                            onChange={(e) => {
                                if (e.target.value.length < 3) {
                                    setLastValue(e.target.value)
                                }
                            }}
                            inputProps={{min: 0, style: {textAlign: 'center'}}}
                            InputProps={{
                                style: {
                                    fontSize: 18,
                                    textAlign: 'center'
                                },
                                disableUnderline: 'true'
                            }}/>
                    </Stack>

                </Stack>

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
                    >ذخیره</Button>
                </Box>
            </Box>
        </SwipeableDrawer>
    );
}


const PlateAvailableCharacters = [
    "ع",
    "الف",
    "ژ",
    "پ",
    "ب",
    "ت",
    "ث",
    "ج",
    "چ",
    "ح",
    "خ",
    "د",
    "ذ",
    "ر",
    "ز",
    "ژ",
    "س",
    "ش",
    "ص",
    "ض",
    "ط",
    "ظ",
    "غ",
    "ف",
    "ق",
    "ک",
    "ل",
    "م",
    "ن",
    "و",
    "ه",
    "ی"
]
