import React, { createContext, useState } from 'react';
import Notification from '../../components/Notification';


export interface NotificationContextProps {
  notify: (message: string) => void;
}

interface INotificationProvider {
  children: React.ReactNode
}

export const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: INotificationProvider) => {
  const [notification, setNotification] = useState<string | null>(null);

  const notify = (message: string) => {
    setNotification(message);
  };

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && <Notification message={notification} onClose={handleClose} />}
    </NotificationContext.Provider>
  );
};


