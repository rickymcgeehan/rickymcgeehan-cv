import { Children } from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import theme from '../util/theme';
import createEmotionCache from '../util/createEmotionCache';

class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <meta
                        name="description"
                        content="Ricky McGeehan's professional CV website."
                    />
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <meta name="format-detection" content="telephone=no" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
Document.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;

    // Could consider sharing the same emotion cache between all the SSR requests to speed up performance
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => {
            const injectEmotionCache = ({ Component, router, pageProps }) => (
                <App emotionCache={cache} {...{ Component, router, pageProps }} />
            );
            return injectEmotionCache;
        }
    });

    const initialProps = await NextDocument.getInitialProps(ctx);

    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
    };
};

export default Document;
