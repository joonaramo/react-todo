import { format, formatDistanceToNow } from 'date-fns';
import React from 'react';
import { ITask } from '../../types';

interface Props {
  task: ITask;
  reversed: boolean;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export const TimelineItem = ({ task, reversed }: Props) => {
  return (
    <div
      className={classNames(
        reversed ? 'flex-row-reverse' : '',
        'mb-8 flex justify-between items-center w-full'
      )}
    >
      <div className='order-1 w-4/12'></div>
      <div className='z-20 flex items-center order-1 bg-gray-800 shadow-xl p-4 h-8 rounded-full'>
        <p className='mx-auto font-semibold text-sm lg:text-md text-white'>
          {format(new Date(task.date), 'dd.M.yyyy')}
        </p>
      </div>
      <div className='order-1 break-words bg-gray-400 rounded-lg shadow-xl w-4/12 p-4'>
        <h3 className='mb-3 font-bold text-gray-800 text-xl'>{task.title}</h3>
        {task.tag && (
          <div className='w-full flex items-center text-sm leading-snug tracking-wide text-gray-900 text-opacity-100'>
            <span
              className={classNames(
                task.tag.color,
                'w-2.5 h-2.5 mr-4 rounded-full'
              )}
              aria-hidden='true'
            />
            <span>{task.tag.name}</span>
          </div>
        )}
        {task.notificationDate && (
          <p>
            Notification{' '}
            {formatDistanceToNow(new Date(task.notificationDate), {
              addSuffix: true,
            })}
          </p>
        )}
      </div>
    </div>
  );
};
