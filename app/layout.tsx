import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import { Providers } from "@/redux/provider";
import Modals from "@/components/UI/Modals/Modals";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import { getCategories } from "@/lib/services/category";
config.autoAddCss = false; /* eslint-disable import/first */

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teetasse",
  description: "Der online Tee-Shop",
  authors: { name: "Kevin Cioch", url: "https://www.kevincioch.com" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="de">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex-1 min-h-[40em] pb-8 flex flex-col justify-start">
              {children}
            </div>
            <Footer categories={categories} />
          </div>
          <Modals data={{ categories }} />
        </Providers>
      </body>
    </html>
  );
}
