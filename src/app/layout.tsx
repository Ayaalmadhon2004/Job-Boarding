"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./UI/Navbar/Navbar";
import { ReactNode } from "react";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
