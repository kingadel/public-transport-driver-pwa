import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/shared/Loading";
import {getDriverInfoApi} from "../auth/AuthService";
import {toast} from "react-hot-toast";
import {addOrEditTruck, getTrailerList, getTruckList} from "../../services/VehicleService";
import Toolbar, {ToolbarDefaultRight} from "../../components/shared/Toolbar";
import {MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {PlateBottomSheet} from "../../components/profile/PlateBottomSheet";
import Button from "@mui/material/Button";
import IconChevronTop from "../../assets/images/ic_chevron_top.svg";


export default function AddNewTruck() {
    const navigator = useNavigate()
    const [loading, setLoading] = useState(false)
    const [driver, setDriver] = useState()
    const [showPlate, setShowPlate] = useState(false)
    const [truckTypeList, setTruckTypeList] = useState([])
    const [trailerTypeList, setTrailerTypeList] = useState([])
    const [isDirty, setIsDirty] = useState(false)
    const [changes, setChanges] = useState({
        trailerId: undefined, trailerTypeId: undefined, capacity: undefined, plate: undefined
    })


    useEffect(() => {
        // console.log(localUser)
        if (loading)
            return
        setLoading(true)

        getTruckList().then(r => {
            let a = [{typeId: -1, name: 'انتخاب کنید'}].concat(r.data.data)
            setTruckTypeList(a)
            console.log('getTruckList', r.data.data)
        }).catch(e => {
            console.log('getTruckList', e.data)
        })

        getTrailerList().then(r => {
            setTrailerTypeList(r.data.data)
            console.log('getTrailerList', r.data.data)
        }).catch(e => {
            console.log('getTrailerList', e.data)
        })

        getDriverInfoApi().then(r => {
            setLoading(false)
            const driver = r.data.data
            console.log('driver', r.data.data)
            if (driver?.vehicles) {
                const primaryTruck = driver.vehicles[0]
                const newChanges = {
                    trailerId: primaryTruck?.trailer?.trailerId ?? undefined,
                    trailerTypeId: primaryTruck?.trailerType?.trailerId ?? undefined,
                    capacity: primaryTruck?.capacity ?? undefined,
                    plate: primaryTruck?.plate ?? undefined
                }
                setChanges(newChanges)
            }
            setDriver(driver)
        }).catch(e => {
            console.log(e)
            setLoading(false)
            toast("خطایی رخ داده است")
        })
    }, [])


    useEffect(() => {
        console.log(changes)
        if (driver?.vehicles) {
            const primaryTruck = driver.vehicles[0]
            if (changes.capacity && (primaryTruck?.capacity !== changes.capacity)) {
                setIsDirty(true)
                return
            }
            if (changes.trailerId && (primaryTruck?.trailer?.trailerId !== changes.trailerId)) {
                setIsDirty(true)
                return
            }
            if (changes.trailerTypeId && (primaryTruck?.trailerType?.trailerId !== changes.trailerTypeId)) {
                setIsDirty(true)
                return
            }
            if (changes.plate && (primaryTruck?.plate !== changes.plate)) {
                setIsDirty(true)
                return
            }
        }
        setIsDirty(false)
    }, [changes])

    const findAvailableTrailers = (truckId) => {
        trailerTypeList.filter((item) => {
            item.trailerTypes.forEach((type) => {
                if (type.typeId === truckId)
                    return true
            })
        })
        return false
    }

    const onTruckChanged = (e) => {
        const {value, name} = e.target
        console.log(name, value)
        setChanges({...changes, trailerTypeId: value})
    }


    const onCapacityChanged = (e) => {
        const {value, name} = e.target
        console.log(name, value)
        setChanges({...changes, capacity: value})
    }

    const onTrailerChanged = (e) => {
        const {value, name} = e.target
        console.log(name, value)
        setChanges({...changes, trailerId: value})
    }


    const onPlateChanged = (newValue) => {
        setShowPlate(false)
        setChanges({...changes, plate: newValue})
    }

    const onBackClicked = () => {
        navigator(-1)
    }
    //
    const updateProfile = (e) => {
        e.stopPropagation()
        if (loading)
            return
        setLoading(true)

        addOrEditTruck(changes).then(r => {
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
            <Toolbar
                rightChild={<ToolbarDefaultRight onClick={onBackClicked}/>}
                children={<Typography color={'primary'}>افزودن وسیله نقلیه</Typography>}
            />
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
                                width={'100%'} mt={4}>{driver.vehicles ? 'ویرایش وسیله نقلیه' : 'افزودن وسیله نقلیه' }</Typography>
                    <Typography fontWeight={"bold"} variant={"caption"} color={'text.primary'} textAlign={"right"}
                                dir={'rtl'}
                                width={'100%'}>برای فعالیت در آی‌بار باید حداقل یک وسیله نقیله ثبت شده داشته
                        باشید</Typography>

                    <Typography
                        mt={2}
                        textAlign={"right"}
                        variant={"caption"}
                        color={'text.secondary'}
                        width={'100%'}>نوع کشنده</Typography>
                    <Select
                        size={"small"}
                        dir={'rtl'}
                        fullWidth={true}
                        name={"truck"}
                        defaultValue={driver.vehicles[0]?.trailerType?.trailerId ?? -1}
                        onChange={onTruckChanged}
                    >
                        {truckTypeList && truckTypeList.map(item => {
                            return (
                                <MenuItem value={item.typeId}>{item.name}</MenuItem>
                            )
                        })}
                    </Select>

                    <Typography
                        mt={2}
                        textAlign={"right"}
                        variant={"caption"}
                        color={'text.secondary'}
                        width={'100%'}>نوع بارگیر</Typography>
                    <Select
                        size={"small"}
                        dir={'rtl'}
                        fullWidth={true}
                        name={"trailer"}
                        defaultValue={driver.vehicles[0]?.trailer?.trailerId ?? -1}
                        onChange={onTrailerChanged}
                    >
                        {trailerTypeList && trailerTypeList?.map(item => {
                            return (
                                <MenuItem value={item.trailerId}>{item.name}</MenuItem>
                            )
                        })}
                    </Select>

                    <Typography
                        mt={2}
                        textAlign={"right"}
                        variant={"caption"}
                        color={'text.secondary'}
                        width={'100%'}>تناژ</Typography>

                    <Box width={'100%'} position={'relative'}>
                        <TextField

                            size={"small"}
                            name="capacity"
                            onChange={onCapacityChanged}
                            placeholder={"مثال: 5"}
                            dir={'rtl'}
                            sx={{
                                textAlign: 'right',
                                width: '100%',
                            }}
                            type={'tel'}
                            variant={"outlined"}
                            value={changes?.capacity ?? ''}/>

                        <Stack px={2}
                               position={"absolute"}
                               left={0}
                               top={0}
                               bottom={0}
                               direction={"row"}
                               alignItems={"center"}>
                            <Typography fontWeight={"bold"} variant={'body1'}>تن</Typography>
                        </Stack>
                    </Box>

                    <Typography
                        mt={2}
                        textAlign={"right"}
                        variant={"caption"}
                        color={'text.secondary'}
                        width={'100%'}>پلاک خودرو</Typography>

                    <Stack
                        onClick={() => {
                            setShowPlate(true)
                        }}
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
                            {getPlateString(changes?.plate) ?? ''}
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
                        >افزودن خودرو</Button>
                    </Box>


                    <PlateBottomSheet open={showPlate}
                                      initialPlate={changes.plate ?? ''}
                                      onClose={() => {
                                          setShowPlate(false)
                                      }}
                                      onConfirmClicked={onPlateChanged}/>

                </Box> : null
            }
            <Loading isLoading={loading}/>
        </>

    );
}

function getPlateString(plateNumber) {
    console.log('plate', plateNumber?.replace(/\D/g, ""))
    const plateChar =
        plateNumber?.replace(/[0-9]/g, '') ?? ''

    const lastValue =
        plateNumber?.replace(/\D/g, "").slice(5, 7) ?? ''
    const firstValue =
        plateNumber?.replace(/\D/g, "").slice(0, 2) ?? ''
    const secondValue =
        plateNumber?.replace(/\D/g, "").slice(2, 5) ?? ''

    const finalValue = 'ایران ' + lastValue + ' - ' + secondValue + ' ' + plateChar + ' ' + firstValue
    return (finalValue)
}
