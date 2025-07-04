import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./providers/AuthProvider";
import SWRProvider from "./providers/SWRProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <SWRProvider>{children}</SWRProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
