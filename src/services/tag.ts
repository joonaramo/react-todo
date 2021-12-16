import axios from 'axios';
import { Tag } from '../types';
import { API_URL } from '../utils/constants';

export const getTags = async (): Promise<Tag[]> => {
  const { data } = await axios.get(`${API_URL}/tags`);
  return data;
};

export const createTag = async (tagData: object): Promise<Tag> => {
  const { data } = await axios.post(`${API_URL}/tags`, tagData);
  return data;
};
