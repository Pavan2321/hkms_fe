import { useState, useEffect } from "react";

export const useLoader = () => {
  const [loading, setLoading] = useState(true);

  // Function to stop loader after a minimum 2 seconds delay
  const stopLoader = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay
  };

  useEffect(() => {
    // Automatically stop loader after 2 seconds if not stopped already
    const loaderTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Ensure loader is visible for at least 2 seconds

    return () => clearTimeout(loaderTimeout); // Clean up the timeout
  }, []);

  return { loading, stopLoader };
};
