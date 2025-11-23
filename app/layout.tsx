import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Logo Generator",
  description: "Create beautiful logos instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
