import React from "react";

export const ColorModeContext = React.createContext();
export const ColorModeDispatchContext = React.createContext();

function ColorModeProvider({children}) {
    const [state,setstate] = React.useState(null);
    return(
        <ColorModeContext.Provider value={state}>
            <ColorModeDispatchContext.Provider value={setstate} >
                {children}
            </ColorModeDispatchContext.Provider>
        </ColorModeContext.Provider>
    )
}

export {ColorModeProvider};
