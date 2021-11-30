import { Dialog } from '@headlessui/react';
import { PencilIcon, XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { ITask, ITaskList } from '../../types';
import { EditTask } from '../EditTask';
import { Modal } from '../Modal';

interface Props {
  task: ITask;
  setTasks: React.Dispatch<React.SetStateAction<ITaskList[]>>;
  idx: number;
}

export const ListItem = ({ task, setTasks, idx }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const removeTask = () => {
    if (window.confirm('Do you really want to delete this task?')) {
      setTasks((allTasks) => {
        const tasks = allTasks.map((t, index) => {
          if (index === idx) {
            return {
              ...t,
              tasks: t.tasks.filter((t) => t.id !== task.id),
            };
          }
          return t;
        });
        return tasks;
      });
    }
  };
  return (
    <>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <>
          <Dialog.Title
            as='h3'
            className='text-center text-lg leading-6 font-medium text-gray-900'
          >
            Edit To-Do Item
          </Dialog.Title>
          <EditTask
            idx={idx}
            task={task}
            setTasks={setTasks}
            setOpen={setModalOpen}
          />
        </>
      </Modal>
      <div className='bg-white shadow rounded px-3 pt-3 pb-5 border border-white mt-3 cursor-move'>
        <div className='flex justify-between'>
          <p className='text-gray-700 font-semibold font-sans tracking-wide text-sm'>
            {task.title}
          </p>
          <div>
            <button
              onClick={() => setModalOpen(true)}
              className='text-blue-500 ml-3'
            >
              <PencilIcon className='h-5 w-5' />
            </button>
            <button onClick={() => removeTask()} className='text-red-500 ml-3'>
              <XIcon className='h-5 w-5' />
            </button>
          </div>
        </div>
        <div className='flex mt-4 justify-between items-center'>
          <span className='text-sm text-gray-600'>Sep 14</span>
          <div
            className={
              task.tag?.color +
              ' px-3 h-6 rounded-full text-xs font-semibold flex items-center text-white'
            }
          >
            <span>{task.tag?.name}</span>
          </div>
        </div>
      </div>
    </>
  );
};
