import type { Metadata } from "next";
import { Holtwood_One_SC, Roboto } from "next/font/google";
import "./globals.css";

const holtwood = Holtwood_One_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-holtwood",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Mathis Jameau — Portfolio",
  description: "Portfolio de Mathis Jameau, développeur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${holtwood.variable} ${roboto.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
