import React, {useEffect, useState} from "react";
import IconRotatePhone from "../../assets/images/ic_rotatie_phone.webp";
import Box from "@mui/material/Box";
import useWindowDimensions from "../../utils/getWindowDimensions";
import {Typography} from "@mui/material";

export default function LandscapeDisablerContainer({children}) {

    const {height, width} = useWindowDimensions();
    const [isLandscape, setIsLandscape] = useState(false);
    useEffect(() => {
        if (width > height) {
            setIsLandscape(true);
        } else setIsLandscape(false)
    }, [width, height])
    return (
            isLandscape ? <Box onClick={(e)=>{
                e.stopPropagation()
            }} sx={{
                bgcolor: 'white',
                position: "fixed",
                left : 0,
                right : 0,
                top : 0,
                bottom :-100,
                zIndex: "100000"
            }}>
                <img src={IconRotatePhone} alt="" style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    position: "absolute",
                    left: "50%",
                    top: "50vh",
                    transform: "translate(-50%, -120%)"
                }}/>
                <Typography fontWeight={"bold"} color={"red"} sx={{
                    position: "absolute",
                    top: "50vh",
                    left: "50vw",
                    transform: "translate(-50%,-20%)"
                }}>لطفا گوشی خود را عمودی نگه دارید</Typography>
            </Box> : null
    )
}
