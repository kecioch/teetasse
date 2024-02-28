import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import Modals from "@/components/UI/Modals/Modals";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import { getCategories } from "@/lib/services/category";
import AuthProvider from "@/components/Auth/Provider/AuthProvider";
import { ReduxProvider } from "@/redux/ReduxProvider";
config.autoAddCss = false; /* eslint-disable import/first */

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const categories = await getCategories();
  const keywords = ["Teetasse", "Tee", "Teeshop"];

  // ADD CATEGORIES & SUBCATEGORIES TO KEYWORDS ARRAY
  categories?.forEach((el) => {
    keywords.push(el.title);
    el.subs.forEach((el) => {
      keywords.push(el.title);
    });
  });

  return {
    title: {
      default: "Teetasse",
      template: "%s | Teetasse",
    },
    description:
      "Die Kunst des Teetrinkens - Erlesene Auswahl, unvergleichlicher Genuss!",
    keywords,
    authors: { name: "Kevin Cioch", url: "https://www.kevincioch.com" },
    openGraph: {
      title: "Teetasse",
      description:
        "Die Kunst des Teetrinkens - Erlesene Auswahl, unvergleichlicher Genuss!",
      siteName: "Teetasse",
      url: process.env.BASE_URL,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="de">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex-1 min-h-[40em] pb-8 flex flex-col justify-start">
              {children}
            </div>
            <Footer categories={categories} />
          </div>
          <ReduxProvider>
            <Modals data={{ categories }} />
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
