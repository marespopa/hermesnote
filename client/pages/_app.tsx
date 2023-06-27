import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "../styles/global.scss";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
