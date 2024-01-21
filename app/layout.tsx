import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import Backdrop from "@/components/UI/Modals/Backdrop";
import { Providers } from "@/redux/provider";
import CartDrawer from "@/components/Cart/CartDrawer";
import Modals from "@/components/UI/Modals/Modals";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teetasse",
  description: "Der online Tee-Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col h-screen">
            <NavBar />
            <div className="grow">{children}</div>
            <Footer />
          </div>
          <Modals />
        </Providers>
      </body>
    </html>
  );
}
