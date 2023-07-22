import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar, {ToolbarDefaultCenter} from "../../components/shared/Toolbar";
import Loading from "../../components/shared/Loading";
import Nav from "../../components/shared/Nav";
import {CircularProgress, Stack, Tab, Tabs, TextField, Typography} from "@mui/material";
import {ReactComponent as IconSearch} from "../../assets/images/ic_search.svg";
import CargoItem from "../../components/cargo/CargoItem";
import {getDeliveredCargoHistory, getDriverCargoHistory, getOngoingCargoHistory} from "../../services/CargoService";
import IconNoCargo from "../../assets/images/ic_no_cargo.svg";
import {toast} from "react-hot-toast";


export default function CargoHistory() {
    const navigator = useNavigate();

    const [loading, setLoading] = useState(false)
    const [cargoList, setCargoList] = useState()
    const [selectedTab, setSelectedTab] = useState(1)
    const [onGoingCargos, setOnGoingCargos] = useState([])
    const [deliveredCargos, setDeliveredCargos] = useState([])

    useEffect(() => {
        if(selectedTab === 1){
            if (loading)
                return
            setLoading(true)
            getOngoingCargoHistory(1).then(r => {
                console.log('getOngoingCargoHistory', r.data)
                setOnGoingCargos(
                    r.data.data
                )
                setLoading(false)
            }).catch(e => {
                toast('خطایی رخ داده است')
                console.log(e)
                setLoading(false)
            })
        }else{
            if (loading)
                return
            setLoading(true)
            getDeliveredCargoHistory(1).then(r => {
                console.log('getDeliveredCargoHistory', r.data)
                setDeliveredCargos(
                    r.data.data
                )
                setLoading(false)
            }).catch(e => {
                toast('خطایی رخ داده است')
                console.log(e)
                setLoading(false)
            })
        }
    }, [selectedTab])

    const replaceTab = (event, newValue) => {
        setSelectedTab(newValue)
    }

    return (
        <>
            <Toolbar>
                <ToolbarDefaultCenter/>
            </Toolbar>
            <Box zIndex={1000} width={'100%'} bgcolor={"white"} position={"fixed"} top={'52px'} left={0} right={0}>
                <Tabs centered={true} value={selectedTab} onChange={replaceTab}>
                    <Tab label="بارهای تخلیه‌شده" sx={{paddingX: '40px'}}/>
                    <Tab label="بار در جریان" sx={{paddingX: '40px'}}/>
                </Tabs>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowY: 'scroll',
                    justifyContent: 'center',
                    gap: '8px',
                    paddingTop: '100px',
                    paddingX: 2,
                    pb: 10
                }}
            >


                {cargoList && cargoList.length === 0 ?
                    <React.Fragment>
                        <Typography variant={"h6"} fontWeight={"bold"} color={'text.primary'} textAlign={"right"}
                                    width={'100%'} mt={4}>فهرست بارهای در جریان</Typography>
                        <Typography variant={"body2"} color={'text.primary'} textAlign={"right"}
                                    width={'100%'}>باری برای شما در سیستم ثبت نشده است</Typography>
                        <img src={IconNoCargo} alt={""} style={{
                            width: '80px',
                            height: '120px',
                            marginTop: '80px'
                        }}/>
                    </React.Fragment>
                    : null
                }

                {selectedTab === 1 && onGoingCargos && onGoingCargos.map(item => {
                    return (<CargoItem key={item.cargoId} cargo={item}/>)
                })}

                {selectedTab === 0 && deliveredCargos && deliveredCargos.map(item => {
                    return (<CargoItem key={item.cargoId} cargo={item}/>)
                })}

            </Box>
            <Nav currentPage={"history"}/>
            <Loading isLoading={loading}/>
        </>
    );
}



