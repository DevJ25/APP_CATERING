import type { Metadata } from "next";
import "./globals.css";
import NavbarComponent from "../components/NavComp";
import { ThemeModeScript } from "flowbite-react";
import Footers from "../components/footer";

export const metadata: Metadata = {
  title: "Catering Gourmet",
  description: "Creacion de una aplicacion web con React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeModeScript />

        <div className="">
          <NavbarComponent />
        </div>
        {children}
        <Footers />
      </body>
    </html>
  );
}
