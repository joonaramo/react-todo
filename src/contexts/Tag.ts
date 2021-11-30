import React from 'react';
import { Tag } from '../types';
export interface ITagContext {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}
export const TagContext = React.createContext<ITagContext | null>(null);
