import {Paper, Stack, Typography, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import { ReactComponent as IconAccount } from '../../assets/images/ic_nav_account.svg';
import { ReactComponent as IconAccountDisable } from '../../assets/images/ic_nav_account_outlined.svg';
import { ReactComponent as IconHomeDefault } from '../../assets/images/ic_nav_home_outline.svg';
import { ReactComponent as IconHome } from '../../assets/images/ic_nav_home.svg';
import { ReactComponent as IconCargoDefault } from '../../assets/images/ic_nav_cargos_outline.svg';
import { ReactComponent as IconCargo } from '../../assets/images/ic_nav_cargos.svg';
import {useNavigate} from "react-router-dom";


function Nav({currentPage}) {
    const theme = useTheme()
    return (
        <Paper sx={{ borderRadius: '0' , bgcolor:'background.default',position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            <Box p={1}  sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                overflow: 'hidden',
                justifyContent:'space-around',
                boxShadow : '6',
                paddingBottom: 3,
                paddingTop: 2
            }}>

                <NavItem page="account" currentPage={currentPage} name={"حساب کاربری"} iconActive={
                    <IconAccount fill={theme.palette.primary.main} height={'24px'} width={'24px'}/>
                } iconDefault={
                    <IconAccountDisable fill={theme.palette.text.secondary} height={'24px'} width={'24px'}/>
                }/>

                {/*<NavItem page="notifications" currentPage={currentPage} name={"اعلان‌ها"} iconActive={*/}
                {/*    <IconNotification fill={theme.palette.primary.main} height={'24px'} width={'24px'}/>*/}
                {/*} iconDefault={*/}
                {/*    <IconNotificationDefault fill={theme.palette.text.secondary} height={'24px'} width={'24px'}/>*/}
                {/*}/>*/}


                <NavItem page="home" currentPage={currentPage} name={"خانه"} iconActive={
                    <IconHome fill={theme.palette.primary.main} height={'24px'} width={'24px'}/>
                } iconDefault={
                    <IconHomeDefault fill={theme.palette.text.secondary} height={'24px'} width={'24px'}/>
                }/>

                <NavItem page="history" currentPage={currentPage} name={"بارهای من"} iconActive={
                    <IconCargo fill={theme.palette.primary.main} height={'24px'} width={'24px'}/>
                } iconDefault={
                    <IconCargoDefault fill={theme.palette.text.secondary} height={'24px'} width={'24px'}/>
                }/>



            </Box>
        </Paper>
    )
}

function NavItem({name, iconActive, iconDefault, page, currentPage}) {

    const navigate = useNavigate();

    const theme = useTheme()
    const GoTo = (page) => {
        if ((page) !== currentPage)
            navigate("/" + page);
    }

    const isActive = (page) => {
        return (currentPage.includes(page))
    }
    return (
        <Stack direction={"column"} gap={'4px'} alignItems={"center"} paddingBottom={2} onClick={() =>{GoTo(page)}}>

            {isActive(page) ?  iconActive : iconDefault }
            <Typography variant={"body1"} color={isActive(page) ? theme.palette.primary.main : theme.palette.text.secondary}>
                {name}
            </Typography>
        </Stack>
    )
}

export default Nav;