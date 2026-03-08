import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import Providers from "@/providers";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | TTS Dashboard",
    default: "TTS Dashboard",
  },
  description: "TTS Dashboard",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} font-sans antialiased`}>
        <Providers>
          <NextTopLoader color="var(--primary)" showSpinner={false} />
          <Toaster position="bottom-right" richColors />
          {children}
        </Providers>
      </body>
    </html>
  );
}
