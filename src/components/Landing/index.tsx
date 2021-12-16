import { MenuAlt2Icon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';

interface Props {}

export const Landing = (props: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className='min-h-full'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className='flex flex-col min-h-screen mx-4 md:ml-8 mr-4 pt-8 lg:pl-72'>
          <Outlet />
        </div>
      </div>
    </>
  );
};
