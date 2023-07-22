import React from "react";
import {ColorModeContext, ColorModeDispatchContext} from "../providers/ColorModeProvider";

function useDispatchColorMode() {
    return React.useContext(ColorModeDispatchContext);
}


function useColorMode() {
    return React.useContext(ColorModeContext);
}

export {useDispatchColorMode, useColorMode}
