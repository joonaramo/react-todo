import React from 'react';
import { ITask } from '../../types';
import { TimelineItem } from './TimelineItem';

interface Props {
  tasks: ITask[];
}

export const Timeline = ({ tasks }: Props) => {
  return (
    <>
      <h1 className='text-3xl'>Timeline</h1>
      <div className='container mt-6 bg-gray-200 mx-auto w-full h-full'>
        <div className='relative wrap overflow-hidden p-4 md:p-6 lg:p-10 h-full'>
          <div className='border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2'></div>
          {tasks
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((task, i) => (
              <TimelineItem task={task} reversed={i % 2 === 0} />
            ))}
        </div>
      </div>
    </>
  );
};
