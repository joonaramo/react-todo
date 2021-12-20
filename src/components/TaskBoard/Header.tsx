import {
  PlusIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from '@heroicons/react/solid';
import React from 'react';
import { Tag } from '../../types';
import { TagSelector } from '../CreateTask/TagSelector';

interface Props {
  searchValue: string;
  sortDirection: 'ASC' | 'DESC';
  tag: Tag | null;
  setTag: React.Dispatch<React.SetStateAction<Tag | null>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  sort: (direction: 'ASC' | 'DESC') => void;
}

export const Header = ({
  searchValue,
  sortDirection,
  tag,
  setTag,
  setModalOpen,
  setSearchValue,
  sort,
}: Props) => {
  return (
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
          onClick={() => (sortDirection === 'ASC' ? sort('DESC') : sort('ASC'))}
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
  );
};
