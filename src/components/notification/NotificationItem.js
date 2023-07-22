import React from 'react';
import Box from "@mui/material/Box";
import {Stack, Typography} from "@mui/material";
import IconNotification from "../../assets/images/ic_notification_read.svg";

export default function NotificationItem({notification}) {
    const onClick = (e) => {
        e.stopPropagation()
    }
    return (
        <Box onClick={onClick} width={'100%'} display={"flex"} mt={2} flexDirection={"column"}>

            <Stack direction={"row-reverse"} gap={2}>
                <img style={{
                    width: '44px',
                    height: '24px',
                    padding: '0 10px',
                    objectFit: "contain",
                    objectPosition: 'center'
                }} src={IconNotification} alt={''}/>

                <Stack direction={"column"} width={'100%'} gap={1}>
                    <Typography ml={2} align={"justify"} dir={'rtl'} color={'text.primary'} variant={"body2"}
                                fontWeight={"bold"}>
                        {notification.Message}
                    </Typography>
                    <Stack direction={"row-reverse"} justifyContent={"space-between"} width={'100%'}>
                        <Typography color={'text.primary'} variant={"body2"} fontWeight={"bold"}>
                        </Typography>

                        <Typography ml={2} variant={"body2"} fontWeight={"bold"} color={'text.secondary'}>
                            {notification.DateTime}
                        </Typography>
                    </Stack>


                </Stack>
            </Stack>
            <Box sx={{opacity: '0.2'}} width={'100%'} bgcolor={'text.secondary'} height={'2px'} mt={3}/>
        </Box>
    )
}




