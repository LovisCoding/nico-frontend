// src/pages/_app.js
import '../styles/globals.css'
import 'react-medium-image-zoom/dist/styles.css'

import {createTheme, CssBaseline, ThemeProvider} from "@mui/material"; // chemin relatif correct


const theme = createTheme({
    typography: {
        fontFamily: 'Freight, Arial',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'Freight';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'), local('Raleway-Regular'), url('/freight-big-pro.ttf') format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
        },
    },
})
export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Component {...pageProps} />
        </ThemeProvider>
    )

}
