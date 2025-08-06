// app/layout.jsx
"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./UI/Navbar/Navbar";

export default function RootLayout({ children }) {
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
