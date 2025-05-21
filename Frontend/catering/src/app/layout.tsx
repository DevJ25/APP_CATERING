import type { Metadata } from "next";
import "./globals.css";
import Component from "../components/NavComp";
import { ThemeModeScript } from "flowbite-react";

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
          <Component />
         
        </div>
        {children}
      </body>
    </html>
  );
}
