import { ReactNode } from "react";
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
import "dayjs/locale/ko";
dayjs.locale("ko");
dayjs.extend(relativeTime);

import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/redux/ReduxProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로아핏",
  description: "로스트아크 유저에게 딱 맞는 사이트, 로아핏",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ReduxProvider>
          <ThemeRegistry>
            <Header />
            {children}
            <Footer />
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
