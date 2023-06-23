import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "../styles/global.scss";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
