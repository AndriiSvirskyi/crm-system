import { createGlobalStyle } from "styled-components";
import type { AppProps } from "next/app";

const GlobalStyle = createGlobalStyle`
html{
  margin: 0;
  padding: 0;
  width: 100%;

}
body{
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
