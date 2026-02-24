import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  // check if online

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });

    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });
  }, []);

  // * boolean value
  //return a boolean value
  return onlineStatus;
};

export default useOnlineStatus;

// to check if online or offline, there is a eventListener avaliable
