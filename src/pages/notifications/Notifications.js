import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar, {ToolbarDefaultCenter, ToolbarDefaultRight} from "../../components/shared/Toolbar";
import Loading from "../../components/shared/Loading";
import {Typography} from "@mui/material";
import IconNoNotification from "../../assets/images/ic_no_notification.svg";
import {getNotificationsApi} from "../../services/NotificationService";
import NotificationItem from "../../components/notification/NotificationItem";


export default function Notifications() {
    const navigator = useNavigate();

    const [loading, setLoading] = useState(false)
    const [notificationList, setNotificationList] = useState()

    useEffect(() => {
        if(loading)
            return
        setLoading(true)
        getNotificationsApi().then(r => {
            console.log('getNotificationsApi', r.data)
            setLoading(false)
            setNotificationList(r.data)
        }).catch(e => {
            setLoading(false)
            console.log(e)
        })
    }, [])

    return (
        <>
            <Toolbar rightChild={<ToolbarDefaultRight/>}>
                <ToolbarDefaultCenter/>
            </Toolbar>
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

                {notificationList && notificationList.length === 0 ?
                    <React.Fragment>
                        <Typography variant={"h6"} fontWeight={"bold"} color={'text.primary'} textAlign={"right"}
                                    width={'100%'} mt={4}>اعلان‌ها</Typography>
                        <Typography variant={"body2"} color={'text.primary'} textAlign={"right"}
                                    dir={'rtl'}
                                    width={'100%'}>اعلانی برای شما ارسال نشده است.</Typography>
                        <img src={IconNoNotification} alt={""} style={{
                            width: '80px',
                            height: '120px',
                            marginTop: '80px'
                        }}/>
                    </React.Fragment>
                    : null
                }

                {notificationList && notificationList.map((item , index) => {
                    return (<NotificationItem key={index} notification={item}/>)
                })}


            </Box>
            <Loading isLoading={loading}/>
        </>
    );
}



