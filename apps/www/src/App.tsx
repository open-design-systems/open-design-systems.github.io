import { useEffect } from "react";
import RootLayout from "./app/layout";
import Page from "./app/page";
import useAnalytics from "./lib/analytics";

function App() {
  const { initialize } = useAnalytics();

  useEffect(() => {
    initialize();
  }, []);

  return (
    <RootLayout>
      <Page />
    </RootLayout>
  );
}

export default App;
