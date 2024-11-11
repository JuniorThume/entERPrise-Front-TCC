import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const duration = 5000; // 5 segundos
    const interval = 50; // Atualiza a cada 50ms
    const increment = (interval / duration) * 100; // Percentual de incremento por atualização

    const timer = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + increment;
        if (nextProgress >= 100) {
          clearInterval(timer);
          onClose();
        }
        return nextProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onClose]);


  return (
    <div className="flex flex-col border top-5 right-5 fixed border-red bg-white text-gray p-4 rounded shadow-lg">
      <p className='text-black'>{message}</p>
      <div className="h-1 mt-2 rounded">
        <div
          className="h-full bg-red rounded"
          style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
        ></div>
      </div>
      <button onClick={onClose} className="text-sm w-1/2 self-center justify-self-end text-gray my-3 border border-gray hover:text-red hover:border-red rounded transition">Entendi</button>
    </div>
  );
};

export default Notification;
