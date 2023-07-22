import fontIranSans from '../assets/fonts/IRANSansWeb_FaNum.woff';
import {blue, indigo} from "@mui/material/colors";

const {amber, grey} = require("@mui/material/colors");


export const getDesignTokens = (mode) => ({
            palette: {
                mode,
                ...(mode === 'light'
                    ? {
                        // palette values for light mode
                        primary: {
                            main : '#3D5CFF'
                        },
                        divider: '#D9D9D9',

                        background: {
                            default: '#ffffff',
                            defaultSecondary: grey[200],
                            paper: grey[100],
                            bottomSheet: 'white',
                            button: '#3D5CFF',
                            input: '#ffffff',
                            toolbar: '#ffffff',
                            icon: '#FFD148',
                            red:'#FF494E',
                            blue:'#368AF6'

                        },
                        text: {
                            primary: '#1F1F39',
                            secondary: '#858597',
                            button: '#ffffff',
                            blue:'#008CE3'
                        },
                    }
                    : {
                        // palette values for dark mode
                        primary: amber,
                        divider: '#7A7A7A',
                        background: {
                            default: '#1d242c',
                            defaultSecondary: '#181D27',
                            paper: '#242B34',
                            bottomSheet: '#222731',
                            button: '#FBD131',
                            input: '#222731',
                            toolbar: '#242B34',
                            icon: '#171D27',
                            red:'#FF494E',
                            blue:'#368AF6'
                        },
                        text: {
                            primary: '#fff',
                            secondary: grey[400],
                            button: '#000',
                            blue:'#008CE3'
                        },
                    }),
            },
            typography: {
                fontFamily: 'Iransans, Arial',
                fontSize: 12,
            },
            shape: {
                borderRadius: 6
            },
            spacing: [0, 8, 12, 16, 24, 32, 56, 64, 72, 96, 120],
            components: {
                MuiCssBaseline: {
                    styleOverrides: `
        @font-face {
          font-family: 'iransans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Iransans'), local('Iransans-Regular'), url(${fontIranSans}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `
                },

            },



            breakpoints: {
                values: {
                    xs: 0,
                    sm: 450,
                    md: 900,
                    lg: 1200,
                    xl: 1536,
                },
            },
        }
    )
;

