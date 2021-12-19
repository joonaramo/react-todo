import { Dialog } from '@headlessui/react';
import { PencilIcon, XIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { editList } from '../../services/list';
import { deleteTask } from '../../services/task';
import { ITask, ITaskList } from '../../types';
import { EditTask } from '../EditTask';
import { Modal } from '../Modal';

interface Props {
  task: ITask;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  setTaskLists: React.Dispatch<React.SetStateAction<ITaskList[]>>;
  id: number;
  order: number[];
}

export const ListItem = ({
  task,
  setTasks,
  setTaskLists,
  order,
  id,
}: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const removeTask = async () => {
    if (window.confirm('Do you really want to delete this task?')) {
      await deleteTask(task.id);
      setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
      const data = await editList(id, {
        order: order.filter((o) => o !== task.id),
      });
      setTaskLists((taskLists) => {
        const copy = [...taskLists];
        const index = copy.findIndex((l) => l.id === id);
        copy.splice(index, 1, data);
        return copy;
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
            id={id}
            task={task}
            setTasks={setTasks}
            setOpen={setModalOpen}
          />
        </>
      </Modal>
      <div className='bg-white shadow rounded px-3 pt-3 pb-5 border border-white mt-3'>
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
          <span className='text-sm text-gray-600'>
            {format(new Date(task.date), 'MMM d · HH:mm')}
          </span>
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
