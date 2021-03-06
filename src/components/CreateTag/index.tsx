import React, { FormEvent, useState } from 'react';
import { createTag } from '../../services/tag';
import { Tag } from '../../types';
import { ColorSelector } from './ColorSelector';

type Color =
  | 'pink-500'
  | 'purple-500'
  | 'blue-500'
  | 'green-500'
  | 'yellow-500';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

export const CreateTag = ({ setOpen, setTags }: Props) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState<Color>('pink-500');
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = await createTag({
      name,
      color: `bg-${color}`,
    });
    setTags((tags) => [...tags, data]);
    setOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='mt-2'>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700'
        >
          Name
        </label>
        <div className='mt-1'>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
            placeholder='My Task'
          />
        </div>
      </div>
      <div className='mt-2'>
        <ColorSelector color={color} setColor={setColor} />
      </div>
      <div className='mt-5 sm:mt-6'>
        <button
          type='submit'
          className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
        >
          Submit
        </button>
      </div>
    </form>
  );
};
