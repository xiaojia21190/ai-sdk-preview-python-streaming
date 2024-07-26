import "./globals.css";
import { Inter } from "next/font/google";
import { LogoNext, LogoPython } from "./icons";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Examples",
  description:
    "Examples of using Vercel AI SDK in a Next.js application, powered by Python runtime.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Link href="/">
          <div className="border-b py-3 px-2 flex flex-row gap-2">
            <LogoNext />
            <div className="text-sm text-zinc-500">+</div>
            <LogoPython />
          </div>
        </Link>
        {children}
      </body>
    </html>
  );
}
