import { useEffect, useState } from 'react';
import { ITask } from '../types';

export const useNotification = (
  tasks: ITask[],
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [date, setDate] = useState(Date.now());
  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    // Update date every second
    const interval = setInterval(() => setDate(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // If task is found with a date same than less than the current one, show notification
    const task = tasks.find((t) => {
      if (
        t.notificationDate &&
        new Date(t.notificationDate).getTime() <= date &&
        !t.notificationRead
      ) {
        return true;
      }
      return false;
    });
    setTask(task);
    setShowNotification(true);
  }, [date, tasks, setShowNotification]);

  return task;
};
