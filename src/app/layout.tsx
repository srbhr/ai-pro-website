import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { geistMono, geistSans, sourceSerif } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Pro — essays on models, code & the stack",
  description:
    "Long-form essays, tutorials and teardowns on the models, the math and the production code that power modern AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sourceSerif.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
