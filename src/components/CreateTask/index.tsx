import React, { FormEvent, useState } from 'react';
import { editList } from '../../services/list';
import { createTask } from '../../services/task';
import { ITask, ITaskList, Tag } from '../../types';
import { DatePicker } from './DatePicker';
import { TagSelector } from './TagSelector';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  setTaskLists: React.Dispatch<React.SetStateAction<ITaskList[]>>;
  listId: number;
}

export const CreateTask = ({
  setOpen,
  setTasks,
  setTaskLists,
  listId,
}: Props) => {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState<Tag | null>(null);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [notificationDate, setNotificationDate] = useState<Date>(
    new Date(Date.now())
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let date;

    // If checkbox is checked, give a notification date to a task
    if (notificationEnabled) {
      date = new Date(notificationDate);
      notificationDate.setSeconds(0);
    }
    const data = await createTask({
      date: new Date(Date.now()),
      notificationDate: date,
      title,
      tag,
      listId,
    });
    setTasks((allTasks) => [...allTasks, data]);
    setTaskLists((taskLists) => {
      const copy = [...taskLists];
      const index = copy.findIndex((l) => l.id === listId);
      // Add new task id to order state and persist into API
      copy.splice(index, 1, {
        ...taskLists[index],
        order: [...taskLists[index].order, data.id],
      });
      editList(listId, {
        order: [...taskLists[index].order, data.id],
      });
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
            Add notification
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
