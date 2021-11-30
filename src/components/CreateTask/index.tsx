import React, { FormEvent, useState } from 'react';
import { ITask, ITaskList, Tag } from '../../types';
import { TagSelector } from './TagSelector';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<ITaskList[]>>;
  idx: number;
}

export const CreateTask = ({ setOpen, setTasks, idx }: Props) => {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState<Tag | null>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTasks((allTasks) => {
      const copy = [...allTasks];
      copy[idx].tasks = [
        {
          date: '11 Sep',
          id: Math.floor(Math.random() * (1000 - 10 + 1)) + 10,
          title,
          tag,
        },
        ...copy[idx].tasks,
      ];
      return copy;
    });
    setOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='mt-2'>
        <label
          htmlFor='title'
          className='block text-sm font-medium text-gray-700'
        >
          Title
        </label>
        <div className='mt-1'>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
            placeholder='My Task'
          />
        </div>
      </div>
      <div className='mt-2'>
        <TagSelector tag={tag} setTag={setTag} />
      </div>
      <div className='mt-5 sm:mt-6'>
        <button
          type='submit'
          className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
        >
          Submit
        </button>
      </div>
    </form>
  );
};
