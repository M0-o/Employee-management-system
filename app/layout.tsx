import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/nav/navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Employee Management System",
  description:
    "An employee management System with modern UI and a plethora of features",
  openGraph: {
    title: "Employee Management System",
    description: "An employee management System with modern UI and a plethora of features",
    url: defaultUrl,
    siteName: "Employee Management System",
    images: [
      {
        url: "@/static/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Employee Management System Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Employee Management System",
    description: "An employee management System with modern UI and a plethora of features",
    images: ["@/static/og-image.png"],
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <div className="container mx-auto py-4 px-6">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
