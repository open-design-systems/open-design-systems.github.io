import ReactGA from "react-ga4";
import { UaEventOptions } from "react-ga4/types/ga4";

export default function useAnalytics() {
  const initialize = () => {
    const isDev = import.meta.env.DEV;
    ReactGA.initialize(import.meta.env.VITE_GA_ID, { testMode: isDev });
  };
  const recordEvent = (payload: UaEventOptions) => {
    ReactGA.event(payload);
  };
  const recordPageview = (page: string) => {
    ReactGA.send({ hitType: "pageview", page });
  };

  return { initialize, recordEvent, recordPageview };
}
