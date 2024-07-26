import "./globals.css";
import { LogoNext, LogoPython } from "./icons";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Vercel AI SDK and FastAPI Examples",
  description:
    "Examples of using Vercel AI SDK in a Next.js application, powered by FastAPI.",
  openGraph: {
    title: "Vercel AI SDK and FastAPI Examples",
    description:
      "Examples of using Vercel AI SDK in a Next.js application, powered by FastAPI.",
    type: "website",
    images: [
      {
        url: "/og?title=Vercel AI SDK and FastAPI Examples",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/og?title=Vercel AI SDK and FastAPI Examples",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
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
