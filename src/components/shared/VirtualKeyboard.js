import React, {PureComponent, useEffect, useState} from 'react';
import {Grid, Stack, Typography, useTheme} from "@mui/material";
import {BackspaceOutlined} from "@mui/icons-material";

function VirtualKeyboard({maxLength, onValueChanged}) {
    const [value, setValue] = useState('')
    const onKeyPressed = (char) => {
        let newValue = value
        if (char !== 'back') {
            if (maxLength) {
                if (maxLength > newValue.length)
                    newValue = newValue + char
            } else {
                newValue = newValue + char
            }
        } else {
            console.log('e' , value )
            if (newValue.length > 0)
                newValue = newValue.slice(0, value.length - 1)
        }
        setValue(newValue)
    }
    useEffect(()=>{
        onValueChanged(value)
    },[value])
    return (
        <>
            <Grid container position={"fixed"} bottom={0} left={0} right={0} paddingX={5} marginTop={1}
                  paddingBottom={4}>
                <Grid item xs={4}>
                    <Typography onClick={() => {
                        onKeyPressed(1)
                    }} fontFamily={'Roboto'} textAlign={"center"} variant={"h4"}>1</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography  onClick={() => {
                        onKeyPressed(2)
                    }} fontFamily={'Roboto'} textAlign={"center"} variant={"h4"}>2</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography  onClick={() => {
                        onKeyPressed(3)
                    }} fontFamily={'Roboto'} textAlign={"center"} variant={"h4"}>3</Typography>
                </Grid>
                <Grid item xs={4} marginTop={4}>
                    <Typography  onClick={() => {
                        onKeyPressed(4)
                    }} fontFamily={'Roboto'} textAlign={"center"} variant={"h4"}>4</Typography>
                </Grid>
                <Grid item xs={4} marginTop={4}>
                    <Typography  onClick={() => {
                        onKeyPressed(5)
                    }} fontFamily={'Roboto'} textAlign={"center"} variant={"h4"}>5</Typography>
                </Grid>
                <Grid item xs={4} marginTop={4}>
                    <Typography  onClick={() => {
                        onKeyPressed(6)
                    }} fontFamily={'Roboto'} textAlign={"center"} variant={"h4"}>6</Typography>
                </Grid>
                <Grid item xs={4} marginTop={4}>
                    <Typography onClick={() => {
                        onKeyPressed(7)
                    }} fontFamily={'Roboto'} textAlign={"center"} variant={"h4"}>7</Typography>
                </Grid>
                <Grid item xs={4} marginTop={4}>
                    <Typography  onClick={() => {
                        onKeyPressed(8)
                    }} fontFamily={'Roboto'} textAlign={"center"} variant={"h4"}>8</Typography>
                </Grid>
                <Grid item xs={4} marginTop={4}>
                    <Typography  onClick={() => {
                        onKeyPressed(9)
                    }} fontFamily={'Roboto'} textAlign={"center"} variant={"h4"}>9</Typography>
                </Grid>
                <Grid item xs={4} marginTop={4}>
                    <Typography  textAlign={"center"} variant={"h4"}/>
                </Grid>
                <Grid item xs={4} marginTop={4}>
                    <Typography   onClick={() => {
                        onKeyPressed(0)
                    }} fontFamily={'Roboto'} textAlign={"center"} variant={"h4"}>0</Typography>
                </Grid>
                <Grid item xs={4} marginTop={4}>

                    <Stack   justifyContent={"center"} alignItems={"center"} sx={{
                        marginTop: '4px',
                    }} onClick={() => {

                    }} color="inherit">
                        {<BackspaceOutlined onClick={() => {
                            onKeyPressed('back')
                        }} sx={{fontSize: '24px'}}/>}
                    </Stack>
                </Grid>
            </Grid>

        </>)
}

export default VirtualKeyboard;