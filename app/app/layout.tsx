import "./globals.css";
import { Montserrat } from "next/font/google";
import CustomProviders from "@/app/components/CustomProviders";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer.component";

const mainFont = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Hermes Notes",
  description: "Effortlessly Create, Edit, and Export Markdown Files",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mainFont.className}>
        <CustomProviders>
          <div className="min-h-screen flex flex-col dark:bg-slate-800">
            <Header />

            <div className="flex-1 flex flex-col sm:flex-row px-4">
              <div className="container max-w-screen-xl mx-auto">
                {children}
              </div>
            </div>

            <Footer />
          </div>
        </CustomProviders>
      </body>
    </html>
  );
}
