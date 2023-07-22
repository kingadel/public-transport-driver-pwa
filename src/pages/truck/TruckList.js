import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


export default function TruckList() {
    const navigator = useNavigate()
    const [loading, setLoading] = useState(false)
    const [driverInfo, setDriverInfo] = useState()


    useEffect(() => {
        if (loading)
            return
        setLoading(true)
        setLoading(false)
    }, [])

    useEffect(() => {
        console.log(driverInfo)
    }, [driverInfo])


    return (
        <></>
    );
}