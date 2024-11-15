import React from 'react'

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Todo app",
  description: "NextJS TODO APP .",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-indigo-950`}
      >
        <Navbar />
        <div className="flex w-screen h-screen">
          <div className='h-screen fixed pb-5 pt-16 w-full px-5 '>
            <div className='h-full flex flex-col overflow-y-auto pt-5'>
              {children}
            </div>
          </div>
        </div>


      </body>
    </html >
  );
}
