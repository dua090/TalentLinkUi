import {
  useEffect,
  useState,
} from "react";

const useDarkMode = () => {

  const [
    darkMode,
    setDarkMode,
  ] = useState(false);

  useEffect(() => {

    const checkDarkMode = () => {

      const isDarkMode =
        document.documentElement.classList.contains(
          "dark"
        );

      setDarkMode(isDarkMode);
    };

    // INITIAL CHECK

    checkDarkMode();

    // OBSERVE CLASS CHANGES

    const observer =
      new MutationObserver(checkDarkMode);

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ["class"],
      }
    );

    return () =>
      observer.disconnect();

  }, []);

  return darkMode;
};

export default useDarkMode;