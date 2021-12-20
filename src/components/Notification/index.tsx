import React from 'react';
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';
import { ITask } from '../../types';

interface Props {
  task?: ITask;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

export const Notification = ({ task, setShowNotification, onClose }: Props) => {
  if (!task) {
    return null;
  }
  return (
    <div className='fixed bottom-0 inset-x-0 pb-2 sm:pb-5'>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3'>
          <div className='flex items-center justify-between flex-wrap'>
            <div className='w-0 flex-1 flex items-center'>
              <span className='flex p-2 rounded-lg bg-indigo-800'>
                <SpeakerphoneIcon
                  className='h-6 w-6 text-white'
                  aria-hidden='true'
                />
              </span>
              <p className='ml-3 font-medium text-white truncate'>
                <span className='md:hidden'>{task.title}</span>
                <span className='hidden md:inline'>{task.title}</span>
              </p>
            </div>
            <div className='order-2 flex-shrink-0 sm:order-3 sm:ml-2'>
              <button
                onClick={() => {
                  onClose();
                  setShowNotification(false);
                }}
                type='button'
                className='-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white'
              >
                <span className='sr-only'>Dismiss</span>
                <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
