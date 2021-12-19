import { Dialog } from '@headlessui/react';
import { PencilIcon, XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { deleteList } from '../../services/list';
import { ITask, ITaskList } from '../../types';
import { CreateTask } from '../CreateTask';
import { EditList } from '../EditList';
import { Modal } from '../Modal';
import { ListItem } from './ListItem';

interface Props {
  setTaskLists: React.Dispatch<React.SetStateAction<ITaskList[]>>;
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  title: string;
  id: number;
  order: number[];
}

export const TaskList = ({
  setTaskLists,
  title,
  id,
  tasks,
  setTasks,
  order,
}: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const removeList = async () => {
    if (window.confirm('Do you really want to delete this list?')) {
      await deleteList(id);
      setTaskLists((taskLists) => taskLists.filter((t) => t.id !== id));
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
            {editing ? 'Edit Task List' : 'New To-Do Item'}
          </Dialog.Title>
          {editing ? (
            <EditList
              listTitle={title}
              listId={id}
              setTaskLists={setTaskLists}
              setOpen={setModalOpen}
            />
          ) : (
            <CreateTask
              listId={id}
              setTasks={setTasks}
              setTaskLists={setTaskLists}
              setOpen={setModalOpen}
            />
          )}
        </>
      </Modal>
      <div className='bg-gray-100 rounded-lg px-3 py-3 column-width min-h-full mr-4'>
        <div className='flex justify-between'>
          <h2>{title}</h2>
          <div>
            <button
              onClick={() => {
                setEditing(true);
                setModalOpen(true);
              }}
              className='text-blue-500 ml-3'
            >
              <PencilIcon className='h-5 w-5' />
            </button>
            <button onClick={() => removeList()} className='text-red-500 ml-3'>
              <XIcon className='h-5 w-5' />
            </button>
          </div>
        </div>
        <button
          onClick={() => {
            setEditing(false);
            setModalOpen(true);
          }}
          className='flex w-full justify-center bg-green-100 text-green-500 text-2xl shadow rounded py-2 mt-3'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 4v16m8-8H4'
            />
          </svg>
        </button>
        {tasks
          .filter((task) => task.listId === id)
          .map((task, index) => (
            <Draggable
              key={task.id}
              draggableId={task.id.toString()}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <ListItem
                    id={id}
                    setTaskLists={setTaskLists}
                    setTasks={setTasks}
                    order={order}
                    task={task}
                  />
                </div>
              )}
            </Draggable>
          ))}
      </div>
    </>
  );
};
