import { ReactNode } from "react";
import { Inter } from "next/font/google";

import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
