import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { NavigationBar } from "./components/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A Simple Login With Database",
  description: "Try to hack it",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        { children }
      </body>
    </html>
  );
}
