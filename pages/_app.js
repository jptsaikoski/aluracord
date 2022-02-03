import appConfig from "../config.json";
import Head from "next/head";

function GlobalStyle() {
  return (
    <style global jsx>{`
      @font-face {
        font-family: Chicago;
        src: url(sysfont.woff2);
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        font-family: "Chicago", sans-serif !important;
      }
      body {
      }
      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
      ::-webkit-scrollbar {
        width: 20px;
      }
      ::-webkit-scrollbar-track {
        border: 1px solid ${appConfig.theme.colors.neutrals[400]};
        background-color: ${appConfig.theme.colors.neutrals[200]};
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        border: 1px solid ${appConfig.theme.colors.neutrals[500]};
        background-color: ${appConfig.theme.colors.neutrals[400]};
        box-shadow: inset 2px 2px 1px 0px rgba(255, 255, 255, 0.4),
          inset -2px -2px 1px 0px rgba(0, 0, 0, 0.16);
      }

      ::-webkit-scrollbar-button {
        display: none;
        background-color: ${appConfig.theme.colors.neutrals[200]};
        border: 1px solid ${appConfig.theme.colors.neutrals[400]};
        box-shadow: inset 2px 2px 1px 0px rgba(255, 255, 255, 0.4),
          inset -2px -2px 1px 0px rgba(0, 0, 0, 0.16);
      }
    `}</style>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>{appConfig.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/static/images/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
