import React from "react";
import {useNavigate} from "react-router-dom";
import iconIntroHeader from "../../assets/images/ic_intro_header.png";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {navigateTo} from "../../utils/Utils";


function IntroScreen() {
    const navigate = useNavigate();

    const gotoLoginScreen = () => {
        navigateTo(navigate, "login");
    }


    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column'},
                    alignItems: 'center',
                    overflow: 'hidden',
                    paddingX: '10px',
                    marginTop: 8
                }}
            >
                <img style={{
                    objectFit: "cover",
                    width: "200px",
                    height: "200px",
                    marginTop : '100px'
                }} src={iconIntroHeader} alt=""/>
                <Typography
                    sx={{
                        marginTop: 6,
                        fontWeight: 'bold'
                    }}
                    variant='h5'
                >عنوان</Typography>
                <Typography
                    variant='body1'
                    sx={{
                        marginTop: 3,
                        color: 'text.secondary'
                    }}
                >لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</Typography>


                {/*<IconButton sx={{*/}
                {/*    ml: 1,*/}
                {/*    marginTop: '24px'*/}
                {/*}} onClick={() => {*/}
                {/*    if (!colorMode)*/}
                {/*        setColorMode('dark')*/}
                {/*    else if (colorMode !== 'light')*/}
                {/*        setColorMode('light')*/}
                {/*    else*/}
                {/*        setColorMode('dark')*/}
                {/*}} color="inherit">*/}
                {/*    {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}*/}
                {/*</IconButton>*/}

                <Box position={"fixed"} left={0} right={0} bottom={0} gap={2} alignItems={"center"} display={"flex"}
                     flexDirection={"column"}>
                    {/*<Stack direction={'row'} alignItems={"center"}>*/}
                    {/*    <Typography variant={"caption"}>*/}
                    {/*        موافق شرایط استفاده از خدمات و حریم شخصی و قوانین جمهوری اسلامی ایران هستم</Typography>*/}
                    {/*    <Checkbox  defaultChecked*/}
                    {/*               sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}/>*/}
                    {/*</Stack>*/}
                    <Box width={'100%'} maxWidth={'440px'} px={3} pb={4} mt={4}>
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
                            onClick={() => {
                                gotoLoginScreen()
                            }}
                        >شروع</Button>
                    </Box>

                </Box>
            </Box>
        </>
    );
}


export default IntroScreen;

