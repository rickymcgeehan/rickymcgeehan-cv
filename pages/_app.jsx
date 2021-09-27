import Head from 'next/head';
import Script from 'next/script';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../util/theme';
import createEmotionCache from '../util/createEmotionCache';
import '../styles/global.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => (
    <>
        <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Script src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js" />
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    </>
);

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.objectOf(PropTypes.any),
    pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default App;
