import React from 'react';
import {Paper, Stack, Typography} from "@mui/material";
import {ChevronRight, HeadsetMicSharp} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import IconLogo from "../../assets/images/logo.webp"
import {callSupportClick} from "../../utils/Utils";

function Toolbar({children, leftChild, rightChild}) {
    return (
        <Paper elevation={0} left={0} top={0} right={0} height={'56px'} position={"fixed"}
               sx={{height: '56px', borderRadius: 0, left: 0, right: 0, top: '0', position: "fixed", zIndex: 1000}}>
            <Stack direction={"row"} alignItems={"center"}
                   justifyContent={"space-between"} bgcolor={"white"}>
                {leftChild ? leftChild : <ToolbarDefaultLeft/>}
                {children}
                {rightChild ? rightChild : <ToolbarEmpty/>}
            </Stack>
        </Paper>

    )
}

export default Toolbar;


export function ToolbarDefaultLeft() {
    return (
        <Stack sx={{

        }}
               onClick={callSupportClick}
               flexBasis={'20%'} marginLeft={2} height={'56px'} alignItems={"start"} justifyContent={"center"}>
            <HeadsetMicSharp fontSize={"large"} color={"primary"}/>

        </Stack>
    )
}

export function ToolbarDefaultRight({onClick}) {
    const navigate = useNavigate()
    return (
        <Stack flexBasis={'20%'} alignItems={"end"} onClick={onClick ? onClick : () => {
            navigate(-1)
        }} direction={"row"} justifyContent={"center"}>
            <Typography marginBottom={'3px'} variant={"body1"} fontWeight={"bold"} color={'primary'}>بازگشت</Typography>
            <ChevronRight fontSize={"large"} color={"primary"} />
        </Stack>
    )
}

export function ToolbarDefaultCenter() {
    const navigate = useNavigate()
    return (
        <Stack flexBasis={'60%'} onClick={() => {
            navigate('/home')
        }} direction={"row"} gap={1} alignItems={"center"} justifyContent={"center"}>
            <img style={{width: '24px', height: '24px', objectFit: 'contain'}} src={IconLogo} alt={""}/>
            <Typography marginTop={'3px'} variant={"h5"} fontWeight={"bold"} color={'primary'}>iBaar</Typography>
        </Stack>
    )
}

export function ToolbarEmpty() {
    return (
        <Stack flexBasis={'20%'} />
    )
}