import "./App.css";
import { DesignSystem } from "./components/design-system";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <div className="pb-6">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] hidden md:block">
          Open Design System v0.1
        </h1>
        <h2 className="text-center text-lg font-light text-foreground">
          Making a cross platform design system has never been so simple
        </h2>
      </div>
      <DesignSystem />
    </ThemeProvider>
  );
}

export default App;
