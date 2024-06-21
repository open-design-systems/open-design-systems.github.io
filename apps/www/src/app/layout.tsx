import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export const metadata: Metadata = {
  title: "Open Design System - v0.1",
  description:
    "Open Design System is the sane way to maintain a Design System for multi-platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <TooltipProvider delayDuration={0}>
            <div className="flex min-h-screen flex-col space-y-6 p-8">
              <div className="pb-6">
                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] hidden md:block">
                  Open Design System v0.1
                </h1>
                <h2 className="text-center text-lg font-light text-foreground">
                  Making a cross platform design system has never been so simple
                </h2>
              </div>
              {children}
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
