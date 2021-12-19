import { Dialog } from '@headlessui/react';
import {
  PlusIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { editList, getLists } from '../../services/list';
import { editTask, getAllTasks } from '../../services/task';
import { ITask, ITaskList, Tag } from '../../types';
import { CreateList } from '../CreateList';
import { TagSelector } from '../CreateTask/TagSelector';
import { Modal } from '../Modal';
import { TaskList } from '../TaskList';

export const TaskBoard = () => {
  const [taskLists, setTaskLists] = useState<ITaskList[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [tag, setTag] = useState<Tag | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch task lists and all tasks when component is mounted
    const fetchLists = async () => {
      const lists = await getLists();
      setTaskLists(lists);
    };
    fetchLists();

    const fetchTasks = async () => {
      const tasks = await getAllTasks();
      setTasks(tasks);
    };
    fetchTasks();
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
    const sorted = filteredTasks.sort((a, b) =>
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

  /**
   * Reorder array
   */
  const reorder = (list: ITask[], startIndex: any, endIndex: any) => {
    let result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /**
   * Function that is called whenever draggable element is finished dragging
   * If draggable is dragged into different droppable area, it will be moved to another array of tasks
   * Otherwise it is reordered within the same array
   */
  const onDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      // Reorder tasks in given list
      const reordered = reorder(
        filteredTasks.filter((task) => task.listId === sInd),
        source.index,
        destination.index
      );
      const order = reordered.map((t) => t.id);
      // Combine tasks of the given list with all the other tasks
      const allTasks = filteredTasks
        .filter((task) => task.listId !== sInd)
        .concat(reordered);
      setFilteredTasks(allTasks);
      await editList(sInd, { order });
    } else {
      const list = filteredTasks.filter((task) => task.listId === sInd);
      const taskToMove = list[source.index];
      const destinationList = filteredTasks.filter(
        (task) => task.listId === dInd
      );
      taskToMove.listId = dInd;

      destinationList.splice(destination.index, 0, taskToMove);
      const allTasks = filteredTasks
        .filter((task) => task.listId !== dInd)
        .concat(destinationList);

      setFilteredTasks(allTasks);

      const taskList = taskLists.find((l) => l.id === sInd);
      const destinationTaskList = taskLists.find((l) => l.id === dInd);

      destinationTaskList?.order.splice(destination.index, 0, taskToMove.id);

      setTaskLists((taskLists) => {
        const copy = [...taskLists];
        const taskListIndex = copy.findIndex((l) => l.id === sInd);
        copy.splice(taskListIndex, 1, {
          ...taskLists[taskListIndex],
          order: taskList!.order.filter((o) => o !== taskToMove.id),
        });
        const destinationTaskListIndex = copy.findIndex((l) => l.id === dInd);
        copy.splice(destinationTaskListIndex, 1, {
          ...taskLists[destinationTaskListIndex],
          order: destinationTaskList!.order,
        });
        return copy;
      });

      await editList(taskList!.id, {
        order: taskList?.order.filter((o) => o !== taskToMove.id),
      });
      await editList(destinationTaskList!.id, {
        order: destinationTaskList?.order,
      });
      await editTask(taskToMove.id, {
        listId: dInd,
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
            New Task List
          </Dialog.Title>
          <CreateList setTasks={setTaskLists} setOpen={setModalOpen} />
        </>
      </Modal>
      <div className='flex flex-wrap lg:justify-between xl:justify-start'>
        <div className='flex justify-center lg:justify-start w-full lg:w-1/2'>
          <button
            onClick={() => setModalOpen(true)}
            type='button'
            className='inline-flex mr-8 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
            New List
          </button>
          <input
            type='text'
            name='title'
            id='title'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='mr-8 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md'
            placeholder='Search...'
          />
        </div>
        <div className='flex w-full lg:w-1/3 justify-center mt-5 lg:mt-0'>
          <button
            onClick={() =>
              sortDirection === 'ASC' ? sort('DESC') : sort('ASC')
            }
            type='button'
            className='inline-flex items-center p-2 mr-4 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            {sortDirection === 'ASC' ? (
              <SortDescendingIcon className='h-5 w-5' aria-hidden='true' />
            ) : (
              <SortAscendingIcon className='h-5 w-5' aria-hidden='true' />
            )}
          </button>
          <TagSelector
            absolute={true}
            showLabel={false}
            tag={tag}
            setTag={setTag}
          />
        </div>
      </div>
      {taskLists.length > 0 ? (
        <div className='flex flex-1 overflow-x-scroll mt-8'>
          <DragDropContext onDragEnd={onDragEnd}>
            {taskLists.map((list) => (
              <Droppable key={list.id} droppableId={list.id.toString()}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TaskList
                      id={list.id}
                      title={list.title}
                      order={list.order}
                      tasks={filteredTasks}
                      setTasks={setTasks}
                      setTaskLists={setTaskLists}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
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
    </>
  );
};
