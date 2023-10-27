import "./globals.scss";
import MainPage from "./components/MainPage";

export const metadata = {
  title: "Hermes Notes",
  description: "Effortlessly Create, Edit, and Export Markdown Files",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainPage>{children}</MainPage>;
}
