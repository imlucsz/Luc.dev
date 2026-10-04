import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PixelPet } from "@/components/PixelPet";
import { DesktopGoose } from "@/components/DesktopGoose";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucas Araujo de Souza | Backend Developer",
  description: "I'm a backend developer with experience in building scalable and maintainable applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.style.colorScheme="light"}else{document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark"}}catch(e){console.warn("Não foi possível ler a preferência de tema.",e)}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <LoadingScreen />
          <DesktopGoose />
          <PixelPet />
        </ThemeProvider>
      </body>
    </html>
  );
}
