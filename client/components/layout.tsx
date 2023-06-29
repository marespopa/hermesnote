import Header from "./Header";
import Footer from "./Footer";
import type { ReactNode } from "react";
import { Montserrat } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const font = Montserrat({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`${font.className} wrapper`}>
      <style jsx global>{`
        #__next {
          height: 100vh;
        }
      `}</style>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
