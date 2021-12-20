import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { editList } from '../../services/list';
import { editTask } from '../../services/task';
import { ITask, ITaskList } from '../../types';
import { TaskList } from '../TaskList';

interface Props {
  taskLists: ITaskList[];
  filteredTasks: ITask[];
  tasks: ITask[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  setTaskLists: React.Dispatch<React.SetStateAction<ITaskList[]>>;
}

/**
 * Reorder array
 */
const reorder = (list: ITask[], startIndex: any, endIndex: any) => {
  let result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const moveTask = (
  list: ITask[],
  taskToMove: ITask,
  dInd: any,
  destination: any
) => {
  const destinationList = list.filter((task) => task.listId === dInd);
  taskToMove.listId = dInd;

  destinationList.splice(destination.index, 0, taskToMove);
  const allTasks = list
    .filter((task) => task.listId !== dInd)
    .concat(destinationList);
  return allTasks;
};

export const DragDrop = ({
  filteredTasks,
  setFilteredTasks,
  tasks,
  setTaskLists,
  setTasks,
  taskLists,
}: Props) => {
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

      // If tasks were filtered by text when reordering, we have to include the filtered out tasks as well
      let hits = 0;
      const allReordered = [
        ...tasks
          .filter((task) => task.listId === sInd)
          .map((task) => {
            if (reordered.includes(task)) {
              hits++;
              return reordered[hits - 1];
            }
            return task;
          }),
      ];

      // Final order of all tasks
      const order = allReordered.map((t) => t.id);

      // Update order to state
      setTaskLists((taskLists) => {
        const copy = [...taskLists];
        const taskListIndex = copy.findIndex((l) => l.id === sInd);
        copy.splice(taskListIndex, 1, {
          ...taskLists[taskListIndex],
          order,
        });
        return copy;
      });

      // Persist information to API
      await editList(sInd, { order });
    } else {
      // Move task to other list
      let tasks = filteredTasks.filter((task) => task.listId === sInd);
      const taskToMove = tasks[source.index];
      const movedTasks = moveTask(filteredTasks, taskToMove, dInd, destination);

      // Update state
      setFilteredTasks(movedTasks);

      // Update order on tasklists
      const taskList = taskLists.find((l) => l.id === sInd);
      const destinationTaskList = taskLists.find((l) => l.id === dInd);
      destinationTaskList?.order.splice(destination.index, 0, taskToMove.id);

      // Update state
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

      // Make API calls for changes to persist
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
    <div className='flex flex-1 overflow-x-scroll mt-8'>
      <DragDropContext onDragEnd={onDragEnd}>
        {taskLists.map((list) => (
          <Droppable key={list.id} droppableId={list.id.toString()}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <TaskList
                  taskList={list}
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
  );
};
