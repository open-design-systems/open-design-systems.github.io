import "./globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import logo from "../assets/logo.png";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <TooltipProvider delayDuration={0}>
        <div className="flex min-h-screen flex-col space-y-6 p-8">
          <div className="pb-6">
            <img
              src={logo}
              alt="Open Design System"
              className="mx-auto aspect-auto w-32 h-32"
              loading="lazy"
            />
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
      <footer className="bg-muted py-6 w-full">
        <div className="container max-w-7xl flex items-center justify-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} OpenDS Studio, Inc. Made with{" "}
            <span className="text-red-500">❤️</span> by the{" "}
            <a
              href="https://opends.studio"
              className="font-bold hover:underline"
            >
              OpenDS.studio
            </a>{" "}
            team
          </p>
        </div>
      </footer>
    </div>
  );
}
