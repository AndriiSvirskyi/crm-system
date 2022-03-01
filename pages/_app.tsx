import { createGlobalStyle, ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

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
  
#__next{
  width: 100%;
}
`;

const theme = {
  colors: {
    text: "#000000",
    background: "#FFFFFF",
    primary: "#D0D0D0",
    secondary: "#9C9C9C",
  },
  media: {
    phone: "(max-width:425px)",
    tablet: "(max-width:768px) and (min-width: 425px)",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
