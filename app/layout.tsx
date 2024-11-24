"use client"
import React, { useEffect } from 'react'

// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { Provider } from 'react-redux';
import store from '@/store/store';
import { usePathname } from 'next/navigation';
import ReqNoAuth from '@/components/protectRoute/reqNoAuth';
import ReqAuth from '@/components/protectRoute/reqAuth';

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

// export const metadata: Metadata = {
//   title: "Todo app",
//   description: "NextJS TODO APP .",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  const noAuthReq = ['/auth/login']

  const pathName = usePathname()


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-indigo-950`}
      >
        <Provider store={store}>


          {noAuthReq.includes(pathName) ? (
            <ReqNoAuth>
              {children}
            </ReqNoAuth>
          ) : (
            <ReqAuth>
              <Navbar />
              <div className="flex w-screen h-screen">
                <div className='h-screen fixed pb-5 pt-16 w-full px-5 '>
                  <div className='h-full flex flex-col overflow-y-auto pt-5'>
                    {children}
                  </div>
                </div>
              </div>
            </ReqAuth>
          )}
        </Provider>


      </body>
    </html >
  );
}
