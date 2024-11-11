import { useContext } from "react";
import { NotificationContext, NotificationContextProps } from "../NotifyContext";

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification deve ser usado dentro de um NotificationProvider');
  return context;
};