"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Header from "@/components/app/layout/Header";
import Footer from "@/components/app/layout/Footer";
import { Source_Sans_3 } from "next/font/google";
const source_sans_3 = Source_Sans_3({
  subsets: ["latin"],
});

export default function ClientLayout({ children }) {
  return (
    <AppRouterCacheProvider>
      <div className={source_sans_3.className}>
        <Header />
        {children}
        <Footer />
      </div>
    </AppRouterCacheProvider>
  );
}
