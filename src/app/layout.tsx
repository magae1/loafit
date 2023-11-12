import { ReactNode } from "react";
import { Metadata } from "next";

import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/redux/ReduxProvider";

export const metadata: Metadata = {
  title: "로아핏",
  description: "로스트아크 유저에게 딱 맞는 사이트, 로아핏",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
