import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';

interface Props {}

export const Landing = (props: Props) => {
  return (
    <>
      <div className='min-h-full'>
        <Sidebar />
        <div className='flex flex-col min-h-screen ml-8 mr-4 pt-8 lg:pl-72'>
          <Outlet />
        </div>
      </div>
    </>
  );
};
