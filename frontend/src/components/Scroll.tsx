import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Scroll = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      document
        .querySelector("#scroll-target")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
  }, [pathname, search]);

  return null;
};
