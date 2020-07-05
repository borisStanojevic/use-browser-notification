import { useEffect, useRef } from "react";

const createNotification = (title, body, icon) => {
  if (!("Notification" in window))
    return alert("This browser does not support desktop notifications.");

  if (Notification.permission === "granted")
    return new Notification(title, { body, icon });

  if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted")
        return new Notification(title, { body, icon });
    });
  }

  return null;
};

const useBrowserNotification = () => {
  const notification = useRef(null);

  const showBrowserNotification = (title, body, icon) => {
    if (notification.current) notification.current.close();

    notification.current = createNotification(title, body, icon);
  };

  const hideBrowserNotification = () => {
    if (notification.current) {
      notification.current.close();
      notification.current = null;
    }
  };

  useEffect(() => {
    return () => {
      notification.current && notification.current.close();
    };
  }, []);

  return [showBrowserNotification, hideBrowserNotification];
};

export default useBrowserNotification;
