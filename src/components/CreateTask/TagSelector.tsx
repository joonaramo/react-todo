import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Fragment, useContext } from 'react';
import { ITagContext, TagContext } from '../../contexts/Tag';
import { Tag } from '../../types';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  tag: Tag | null;
  setTag: React.Dispatch<React.SetStateAction<Tag | null>>;
  showLabel?: boolean;
  absolute?: boolean;
}

export const TagSelector = ({
  tag,
  setTag,
  showLabel = true,
  absolute = false,
}: Props) => {
  const { tags } = useContext(TagContext) as ITagContext;

  return (
    <Listbox value={tag} onChange={setTag}>
      {({ open }) => (
        <>
          {showLabel && (
            <Listbox.Label className='block text-sm font-medium text-gray-700'>
              Select Tag
            </Listbox.Label>
          )}
          <div
            className={classNames(showLabel ? 'mt-1' : '', 'relative w-full')}
          >
            <Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
              <div className='flex items-center'>
                <span
                  className={
                    tag?.color +
                    ' flex-shrink-0 inline-block h-2 w-2 rounded-full'
                  }
                />
                <span className='ml-3 block truncate'>
                  {tag?.name || 'No tag selected'}
                </span>
              </div>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <SelectorIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options
                className={classNames(
                  absolute ? 'absolute' : '',
                  ' z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
                )}
              >
                {tags.map((tag) => (
                  <Listbox.Option
                    key={tag.name}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={tag}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={
                              tag.color +
                              ' flex-shrink-0 inline-block h-2 w-2 rounded-full'
                            }
                            aria-hidden='true'
                          />
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {tag.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
                <Listbox.Option
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9'
                    )
                  }
                  value={null}
                >
                  {({ selected, active }) => (
                    <>
                      <div className='flex items-center'>
                        <span
                          className={
                            'flex-shrink-0 inline-block h-2 w-2 rounded-full'
                          }
                          aria-hidden='true'
                        />
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'ml-3 block truncate'
                          )}
                        >
                          No tag selected
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
