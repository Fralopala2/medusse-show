import type { Metadata } from "next";
import { Outfit, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medusse IoT - Sistema de Monitoreo Ambiental",
  description:
    "Sistema IoT completo para monitoreo ambiental con ESP32, MQTT, InfluxDB, Grafana y Flutter. 18 tipos de sensores en tiempo real.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} ${dmSans.variable} ${geistMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
