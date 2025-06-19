import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Casino Client",
  description: "Modern casino client with Hero UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="casino-dark">
      <body suppressHydrationWarning className={inter.className}>
          <main className="casino-dark text-foreground bg-background min-h-screen">
          <Providers>
            {children}
          </Providers>
          </main>
      </body>
    </html>
  );
}
