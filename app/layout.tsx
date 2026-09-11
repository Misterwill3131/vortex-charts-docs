import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "VortexLIB — Documentation & Showcase Interactif",
  description:
    "Documentation officielle, démos interactives et référence technique de la bibliothèque graphique propriétaire VortexLIB (vortex-charts) pour VorteXbot.app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-[#020616] text-[#f4f7fa] antialiased selection:bg-[#38bdf8]/30 selection:text-[#38bdf8]">
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-1 flex max-w-7xl w-full mx-auto">
            <Sidebar />
            <main className="flex-1 min-w-0 p-6 sm:p-10">
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
