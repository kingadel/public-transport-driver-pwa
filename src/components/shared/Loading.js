import {Controls, Player} from "@lottiefiles/react-lottie-player";
import LoadingAnimation from "../../assets/animations/loading_1.json";
import {Dialog, Modal} from "@mui/material";

function Loading({isLoading}) {

    return (
        isLoading ?
        <Dialog open={isLoading} PaperProps={{
            style: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
            },
        }} >
            <Player
                autoplay
                loop
                src={LoadingAnimation}
                style={{height: '100px', width: '150px'}}
            >
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']}/>
            </Player>
        </Dialog> : null

    )
}

export default Loading;