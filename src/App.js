import './App.css';
import {useMemo} from "react";
import {getDesignTokens} from "./utils/MaterialPalette";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";

import {Toaster} from "react-hot-toast";
import {useColorMode} from "./hooks/ColorModeHooks";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/auth/Login";
import ConsumeOtp from "./pages/auth/ConsumeOtp";
import Home from "./pages/home/Home";
import CargoDetail from "./pages/cargodetail/CargoDetail";
import CargoHistory from "./pages/cargohistory/CargoHistory";
import Notifications from "./pages/notifications/Notifications";
import Profile from "./pages/profile/Profile";
import TransactionHistory from "./pages/profile/TransactionHistory";
import EditProfile from "./pages/profile/EditProfile";
import {ProtectedRoute} from "./pages/protected/ProtectedRoute";
import LandscapeDisablerContainer from "./components/shared/LandscapeDisbalerContainer";
import TruckList from "./pages/truck/TruckList";
import AddNewTruck from "./pages/truck/AddNewTruck";
import OrderDetail from "./pages/orderdetail/OrderDetail";

function App() {

    const colorMode = useColorMode();

    const theme = useMemo(
        () =>
            createTheme(getDesignTokens(colorMode ? colorMode : 'light'))
        ,
        [colorMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container

                maxWidth="sm"
                sx={{
                    position: 'relative',
                    paddingX: '0',
                    // minHeight: '100vh',
                }}
            >
                <LandscapeDisablerContainer/>
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/verify' element={<ConsumeOtp/>}/>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/orders/:id' element={<OrderDetail/>}/>
                    <Route path='/cargos/:id' element={<CargoDetail/>}/>
                    <Route path='/history' element={<CargoHistory/>}/>
                    <Route path='/notifications' element={<Notifications/>}/>
                    <Route path='/account' element={<Profile/>}/>
                    <Route path='/transaction-history' element={<TransactionHistory/>}/>
                    <Route path='/account/edit' element={<EditProfile/>}/>
                    <Route path='/trucks/add' element={<AddNewTruck/>}/>
                    <Route exact path='/trucks' element={<TruckList/>}/>
                    <Route
                        path={"/"}
                        element={<Navigate to="/home"/>}
                    />
                </Routes>
                <ProtectedRoute/>
                <Toaster position={"bottom-center"} containerStyle={{marginBottom: "100px", direction: "rtl"}}/>

            </Container>
        </ThemeProvider>
    );
}

export default App;
