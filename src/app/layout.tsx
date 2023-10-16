import { ReactNode } from "react";
import { Inter } from "next/font/google";

import ThemeRegistry from "@/app/_components/ThemeRegistry";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ThemeRegistry>
          <Header />
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
