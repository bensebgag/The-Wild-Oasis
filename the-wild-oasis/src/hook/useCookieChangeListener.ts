import { useEffect } from "react";

export function useCookieChangeListener(callback: () => void) {
  useEffect(() => {
    const handleCookieChange = () => {
      callback();
    };

    document.cookie = `${document.cookie}; SameSite=Strict`;
    window.addEventListener("storage", handleCookieChange);

    return () => {
      window.removeEventListener("storage", handleCookieChange);
    };
  }, [callback]);
}
