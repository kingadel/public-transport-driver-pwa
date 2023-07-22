import React from "react";
import Box from "@mui/material/Box";

function Dialog({children}) {
    return (
        <Box
            position={"fixed"}
            display={"flex"}
            flexDirection={"column"}


            left={0}
            right={0}
            top={0}
            bottom={0}
            bgcolor={"#00000050"}
        ><Box display={"flex"}
              flexDirection={"column"}
              position={"fixed"}
              maxWidth={"400px"}
              width={}>
            {children}
        </Box>

            {/*display: flex;*/}
            {/*flex-direction: column;*/}
            {/*position: fixed;*/}
            {/*max-width: 400px;*/}
            {/*width: calc(var(--max-width) - 80px);*/}
            {/*max-height: 480px !important;*/}
            {/*overflow-y: scroll;*/}
            {/*background-color: var(--main-background);*/}
            {/*border-radius: 12px;*/}
            {/*justify-content: center;*/}
            {/*align-items: center;*/}
            {/*flex-shrink: 0;*/}
            {/*gap: 12px;*/}
            {/*top: 50%;*/}
            {/*transform: translate(-50%, -50%);*/}
            {/*left: 50%;*/}
            {/*padding: 20px 16px 16px;>*/}
        </Box>
    );
}


export default Dialog;

