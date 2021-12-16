import axios from 'axios';
import { ITaskList } from '../types';
import { API_URL } from '../utils/constants';

export const getLists = async (): Promise<ITaskList[]> => {
  const { data } = await axios.get(`${API_URL}/lists`);
  return data;
};

export const createList = async (listData: object): Promise<ITaskList> => {
  const { data } = await axios.post(`${API_URL}/lists`, listData);
  return data;
};

export const editList = async (
  listId: number,
  listData: object
): Promise<ITaskList> => {
  const { data } = await axios.patch(`${API_URL}/lists/${listId}`, listData);
  return data;
};

export const deleteList = async (listId: number): Promise<ITaskList[]> => {
  const { data } = await axios.delete(`${API_URL}/lists/${listId}`);
  return data;
};
