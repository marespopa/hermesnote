import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Montserrat } from "next/font/google";
import CustomProviders from "@/app/components/CustomProviders";

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
          <div className="min-h-screen flex flex-col">
            <header className="bg-red-50">Header</header>

            <div className="flex-1 flex flex-col sm:flex-row">
              <main className="flex-1 bg-indigo-100">{children}</main>
            </div>

            <footer className="bg-gray-700">Footer</footer>
          </div>
        </CustomProviders>
      </body>
    </html>
  );
}
