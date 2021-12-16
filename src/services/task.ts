import axios from 'axios';
import { ITask } from '../types';
import { API_URL } from '../utils/constants';

export const getTasks = async (listId: number): Promise<ITask[]> => {
  const { data } = await axios.get(`${API_URL}/lists/${listId}/tasks`);
  return data;
};

export const getAllTasks = async (): Promise<ITask[]> => {
  const { data } = await axios.get(`${API_URL}/tasks`);
  return data;
};

export const createTask = async (taskData: object): Promise<ITask> => {
  const { data } = await axios.post(`${API_URL}/tasks`, taskData);
  return data;
};

export const editTask = async (
  taskId: number,
  taskData: object
): Promise<ITask> => {
  const { data } = await axios.patch(`${API_URL}/tasks/${taskId}`, taskData);
  return data;
};

export const deleteTask = async (taskId: number): Promise<ITask[]> => {
  const { data } = await axios.delete(`${API_URL}/tasks/${taskId}`);
  return data;
};
