import React, { FormEvent, useState } from 'react';
import { editTask } from '../../services/task';
import { ITask, Tag } from '../../types';
import { DatePicker } from '../CreateTask/DatePicker';
import { TagSelector } from '../CreateTask/TagSelector';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  task: ITask;
  id: number;
}

export const EditTask = ({ setOpen, setTasks, task, id }: Props) => {
  const [title, setTitle] = useState(task.title);
  const [tag, setTag] = useState<Tag | null>(task.tag);

  const [notificationEnabled, setNotificationEnabled] =
    useState<boolean>(false);
  const [notificationDate, setNotificationDate] = useState<Date>(
    new Date(task.notificationDate || Date.now())
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let date;
    let notificationRead;
    // If checkbox is checked, give a notification date to a task
    if (notificationEnabled) {
      date = new Date(notificationDate);
      notificationDate.setSeconds(0);
    }
    if (notificationEnabled) {
      notificationRead = false;
    }
    const data = await editTask(task.id, {
      date: new Date(Date.now()),
      notificationDate: date,
      notificationRead,
      title,
      tag,
    });
    setTasks((allTasks) => {
      const listTasks = allTasks.filter((t) => t.listId === id);
      const index = listTasks.findIndex((t) => t.id === task.id);
      listTasks.splice(index, 1, data);
      const tasks = allTasks.filter((t) => t.listId !== id).concat(listTasks);
      return tasks;
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
      <div className='relative flex items-start mt-2'>
        <div className='flex items-center h-5'>
          <input
            id='notificationEnabled'
            name='notificationEnabled'
            checked={notificationEnabled}
            onChange={() => setNotificationEnabled(!notificationEnabled)}
            type='checkbox'
            className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
          />
        </div>
        <div className='ml-3 text-sm'>
          <label
            htmlFor='notificationEnabled'
            className='font-medium text-gray-700'
          >
            {!!task.notificationDate ? 'Edit notification' : 'Add notification'}
          </label>
        </div>
      </div>
      {notificationEnabled && (
        <>
          <div className='mt-2'>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700'
            >
              Notification date
            </label>
            <div className='mt-1'>
              <DatePicker
                date={notificationDate}
                setDate={setNotificationDate}
              />
            </div>
          </div>
          <div className='mt-2'>
            <label
              htmlFor='hours'
              className='block text-sm font-medium text-gray-700'
            >
              Notification time
            </label>
            <div className='flex mt-1'>
              <input
                type='number'
                name='hours'
                id='hours'
                value={`${
                  notificationDate.getHours() < 10 ? 0 : ''
                }${notificationDate.getHours()}`}
                onChange={(e) => {
                  const prevDate = new Date(notificationDate);
                  prevDate.setHours(e.target.valueAsNumber);
                  setNotificationDate(prevDate);
                }}
                className='shadow-sm text-center focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                placeholder='My Task'
              />
              <input
                type='number'
                name='minutes'
                id='minutes'
                value={`${
                  notificationDate.getMinutes() < 10 ? 0 : ''
                }${notificationDate.getMinutes()}`}
                onChange={(e) => {
                  const prevDate = new Date(notificationDate);
                  prevDate.setMinutes(e.target.valueAsNumber);
                  setNotificationDate(prevDate);
                }}
                className='shadow-sm text-center focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                placeholder='My Task'
              />
            </div>
          </div>
        </>
      )}
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
