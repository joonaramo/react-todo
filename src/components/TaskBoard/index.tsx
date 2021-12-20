import { Dialog } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useNotification } from '../../hooks/useNotification';
import { editList, getLists } from '../../services/list';
import { editTask } from '../../services/task';
import { ITask, ITaskList, Tag } from '../../types';
import { CreateList } from '../CreateList';
import { Modal } from '../Modal';
import { Notification } from '../Notification';
import { DragDrop } from './DragDrop';
import { Header } from './Header';

interface Props {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export const TaskBoard = ({ tasks, setTasks }: Props) => {
  const [taskLists, setTaskLists] = useState<ITaskList[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [tag, setTag] = useState<Tag | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [modalOpen, setModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const task = useNotification(tasks, setShowNotification);

  useEffect(() => {
    // Fetch task lists and all tasks when component is mounted
    const fetchLists = async () => {
      const lists = await getLists();
      setTaskLists(lists);
    };
    fetchLists();
  }, []);

  useEffect(() => {
    // Filter and sort tasks whenever tag, search value or sorting direction is changed
    const sorted = taskLists
      .map((l) => l.order.map((o) => tasks.find((t) => t.id === o)))
      .flat();

    const filtered = sorted.filter((task) => {
      // If task matches filter criteria, return true. Otherwise return false
      if (
        (task?.tag?.id === tag?.id || tag === null) &&
        task?.title.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    setFilteredTasks(filtered as ITask[]);
  }, [tag, searchValue, tasks, taskLists]);

  const sort = (direction: 'ASC' | 'DESC') => {
    const sorted = tasks.sort((a, b) =>
      sortDirection === 'ASC'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const orders = taskLists.map((l) => {
      const tasks = sorted.filter((t) => t.listId === l.id);
      return tasks.map((t) => t.id);
    });
    const sortedLists = taskLists.map((l, idx) => {
      editList(l.id, { order: orders[idx] });
      return {
        ...l,
        order: orders[idx],
      };
    });
    setTaskLists(sortedLists);
    setFilteredTasks(sorted);
    setSortDirection(direction);
  };

  const closeNotification = async () => {
    if (task) {
      const taskIndex = tasks.findIndex((t) => t.id === task?.id);
      const copy = [...tasks];
      copy.splice(taskIndex, 1, {
        ...task,
        notificationRead: true,
      });
      setTasks(copy);
      await editTask(task.id, { ...task, notificationRead: true });
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
            New Task List
          </Dialog.Title>
          <CreateList setTasks={setTaskLists} setOpen={setModalOpen} />
        </>
      </Modal>
      <Header
        searchValue={searchValue}
        setModalOpen={setModalOpen}
        setSearchValue={setSearchValue}
        setTag={setTag}
        sort={sort}
        sortDirection={sortDirection}
        tag={tag}
      />
      {taskLists.length > 0 ? (
        <DragDrop
          filteredTasks={filteredTasks}
          tasks={tasks}
          setFilteredTasks={setFilteredTasks}
          setTaskLists={setTaskLists}
          setTasks={setTasks}
          taskLists={taskLists}
        />
      ) : (
        <div className='mt-8 text-center'>
          <p className='text-2xl'>You haven't created any task lists yet.</p>
          <button
            onClick={() => setModalOpen(true)}
            type='button'
            className='inline-flex items-center mt-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
            New List
          </button>
        </div>
      )}
      {showNotification && (
        <Notification
          onClose={closeNotification}
          task={task}
          setShowNotification={setShowNotification}
        />
      )}
    </>
  );
};
