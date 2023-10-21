import { ReactNode } from "react";
import { Inter } from "next/font/google";

import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

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
