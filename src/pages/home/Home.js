import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar, {ToolbarDefaultCenter} from "../../components/shared/Toolbar";
import Loading from "../../components/shared/Loading";
import Nav from "../../components/shared/Nav";
import {Stack, TextField, Typography} from "@mui/material";
import {ReactComponent as IconSearch} from "../../assets/images/ic_search.svg";
import CargoItem from "../../components/cargo/CargoItem";
import IconNoCargo from "../../assets/images/ic_no_cargo.svg";
import {getOrders} from "../../services/CargoService";
import OrderItem from "../../components/order/OrderItem";


function Home() {
    const navigator = useNavigate();

    const [loading, setLoading] = useState(false)
    const [cargoList, setCargoList] = useState()
    const [searchValue, setSearchValue] = useState("")
    const [filterMode, setFilterMOde] = useState(false)
    const [filteredCargoList, setFilteredCargoList] = useState()

    useEffect(() => {
        if (loading)
            return
        setLoading(true)
        getOrders(10).then(r => {
            console.log('all cargos', r.data)
            setCargoList(r.data.data)
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            console.log(e)
        })

    }, [])

    useEffect(() => {
        setFilterMOde(searchValue !== "")
        if (searchValue !== "") {
            setFilteredCargoList(
                cargoList.filter(item => {
                    console.log(item)
                    return item.title.toString()?.includes(searchValue) ?? false
                })
            )
        } else {
            setFilteredCargoList(null)
        }
    }, [searchValue])

    return (
        <>
            <Toolbar>
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
                <Stack width={'100%'} bgcolor={'F4F4F5'} borderRadius={2} direction={"row-reverse"}
                       alignItems={"center"} pt={2} pb={1}>
                    <IconSearch fontSize={"large"}/>
                    <TextField
                        InputProps={{disableUnderline: true}}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                        }}
                        px={3}
                        placeholder={"جستجو براساس نوع بار"}
                        dir={'rtl'}
                        sx={{
                            textAlign: 'right',
                            maxWidth: '440px', width: '100%', px: 3
                        }}
                        variant={'standard'}
                        value={searchValue}
                    />

                </Stack>

                {!filterMode ?
                    <Typography variant={"h6"} fontWeight={"bold"} color={'text.primary'} textAlign={"right"}
                                width={'100%'} mb={3}> فهرست بارها</Typography>
                    : null}
                {filterMode && filteredCargoList && filteredCargoList.length > 0 ?
                    <Stack direction={"column"} alignItems={"end"} width={'100%'} dir={'rtl'}>
                        <Typography variant={"h6"} fontWeight={"bold"} color={'text.primary'} textAlign={"right"}
                                    width={'100%'}>نتیجه جستجو</Typography>
                        <Typography variant={"body1"} color={'text.primary'} textAlign={"right"}
                                    width={'100%'} mb={3}>
                            {filteredCargoList.length + " "}
                            بار با عنوان
                            {" \"" + searchValue + "\" "}
                            پیدا شد.
                        </Typography>
                    </Stack> : null
                }

                {
                    filterMode && !filteredCargoList || filterMode && filteredCargoList && filteredCargoList.length === 0 ?
                        <Stack direction={"column"} alignItems={"end"} width={'100%'} dir={'rtl'}>
                            <Typography variant={"h6"} fontWeight={"bold"} color={'text.primary'} textAlign={"right"}
                                        width={'100%'}>نتیجه‌ای یافت نشد!</Typography>
                            <Typography variant={"body1"} color={'text.primary'} textAlign={"right"}
                                        width={'100%'} mb={3}>متاسفانه بار ثبت شده‌ای با
                                عنوان {" \"" + searchValue + "\" "} پیدا نشد.</Typography>
                        </Stack>
                        : null
                }

                {!filterMode && cargoList && cargoList.length === 0 ?
                    <React.Fragment>
                        <Typography variant={"body1"} fontWeight={"bold"} color={'text.secondary'} textAlign={"right"}
                                    width={'100%'}> متاسفانه باری ثبت نشده است</Typography>
                        <img src={IconNoCargo} alt={""} style={{
                            width: '80px',
                            height: '120px',
                            marginTop: '80px'
                        }}/>
                    </React.Fragment>
                    : null
                }

                {!filterMode && cargoList && cargoList.map(item => {
                    return (<OrderItem key={item.orderId} order={item}/>)
                })}

                {filterMode && filteredCargoList && filteredCargoList.map(item => {
                    return (<OrderItem key={item.orderId} order={item}/>)
                })}

            </Box>
            <Nav currentPage={"home"}/>
            <Loading isLoading={loading}/>
        </>
    );
}


export default Home;

