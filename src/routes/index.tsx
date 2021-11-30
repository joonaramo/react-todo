import React from 'react';
import { useRoutes } from 'react-router';
import { About } from '../components/About';
import { Landing } from '../components/Landing';
import { TaskBoard } from '../components/TaskBoard';

export const AppRoutes = () => {
  const routes = [
    {
      path: '/',
      element: <Landing />,
      children: [
        { path: '', element: <TaskBoard /> },
        {
          path: 'about',
          element: <About />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return <>{element}</>;
};
