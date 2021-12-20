import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router';
import { About } from '../components/About';
import { Landing } from '../components/Landing';
import { TaskBoard } from '../components/TaskBoard';
import { Timeline } from '../components/Timeline';
import { getAllTasks } from '../services/task';
import { ITask } from '../types';

export const AppRoutes = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getAllTasks();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);
  const routes = [
    {
      path: '/',
      element: <Landing />,
      children: [
        { path: '', element: <TaskBoard tasks={tasks} setTasks={setTasks} /> },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'timeline',
          element: <Timeline tasks={tasks} />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return <>{element}</>;
};
