import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ITaskList, ITask } from '../../types';
import { TaskList } from '../TaskList';

export const TaskBoard = () => {
  const [tasks, setTasks] = useState<ITaskList[]>([
    {
      title: 'To-Do',
      tasks: [],
    },
    {
      title: 'In Progress',
      tasks: [],
    },
    {
      title: 'Completed',
      tasks: [],
    },
  ]);

  const reorder = (list: ITask[], startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (
    source: any,
    destination: any,
    droppableSource: any,
    droppableDestination: any
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const reordered = reorder(
        tasks[sInd].tasks,
        source.index,
        destination.index
      );
      setTasks((allTasks) => {
        const copy = [...allTasks];
        copy[sInd].tasks = reordered;
        return copy;
      });
    } else {
      const result = move(
        tasks[sInd].tasks,
        tasks[dInd].tasks,
        source,
        destination
      );
      const newState = [...tasks];
      newState[sInd].tasks = result[sInd];
      newState[dInd].tasks = result[dInd];
      setTasks(newState);
    }
  };
  return (
    <>
      <h1 className='text-2xl'>To-Do List</h1>
      <div className='flex flex-1 overflow-x-scroll mt-8'>
        <DragDropContext onDragEnd={onDragEnd}>
          {tasks.map((task, idx) => (
            <Droppable key={idx} droppableId={idx.toString()}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <TaskList
                    idx={idx}
                    title={task.title}
                    tasks={task.tasks}
                    setTasks={setTasks}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </>
  );
};
