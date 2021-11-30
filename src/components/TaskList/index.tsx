import { Dialog } from '@headlessui/react';
import React, { useState } from 'react';
import { ITask, ITaskList } from '../../types';
import { Modal } from '../Modal';
import { CreateTask } from '../CreateTask';
import { ListItem } from './ListItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Props {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITaskList[]>>;
  title: string;
  idx: number;
}

export const TaskList = ({ tasks, setTasks, title, idx }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <>
          <Dialog.Title
            as='h3'
            className='text-center text-lg leading-6 font-medium text-gray-900'
          >
            New To-Do Item
          </Dialog.Title>
          <CreateTask idx={idx} setTasks={setTasks} setOpen={setModalOpen} />
        </>
      </Modal>
      <div className='bg-gray-100 rounded-lg px-3 py-3 column-width min-h-full mr-4'>
        <h2>{title}</h2>
        <button
          onClick={() => setModalOpen(true)}
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
        {tasks.map((task, index) => (
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
                <ListItem idx={idx} setTasks={setTasks} task={task} />
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </>
  );
};
