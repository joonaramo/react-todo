import { Dialog, Menu, Transition } from '@headlessui/react';
import React, { Fragment, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ITagContext, TagContext } from '../../contexts/Tag';
import { Tag } from '../../types';
import { CreateTag } from '../CreateTag';
import { Modal } from '../Modal';

interface Props {}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export const Sidebar = (props: Props) => {
  const { tags, setTags } = useContext(TagContext) as ITagContext;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <>
          <Dialog.Title
            as='h3'
            className='text-center text-lg leading-6 font-medium text-gray-900'
          >
            New tag
          </Dialog.Title>
          <CreateTag setTags={setTags} setOpen={setModalOpen} />
        </>
      </Modal>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 flex z-40 lg:hidden'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    {/* <XIcon className='h-6 w-6 text-white' aria-hidden='true' /> */}
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-shrink-0 flex items-center px-4'>
                <img
                  className='h-8 w-auto'
                  src='https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg'
                  alt='Workflow'
                />
              </div>
              <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                <nav className='px-2'>
                  <div className='mt-8'>
                    <h3
                      className='px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'
                      id='mobile-tags-headline'
                    >
                      Tags
                    </h3>
                    <div
                      className='mt-1 space-y-1'
                      role='group'
                      aria-labelledby='mobile-tags-headline'
                    >
                      {tags.map((tag) => (
                        <button
                          key={tag.name}
                          className='w-full group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50'
                        >
                          <span
                            className={classNames(
                              tag.color,
                              'w-2.5 h-2.5 mr-4 rounded-full'
                            )}
                            aria-hidden='true'
                          />
                          <span className='truncate'>{tag.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className='hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100'>
        <div className='flex items-center flex-shrink-0 px-6'>
          {/* <img
            className='h-8 w-auto'
            src='https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg'
            alt='Workflow'
          /> */}
        </div>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className='mt-6 h-0 flex-1 flex flex-col overflow-y-auto'>
          {/* Navigation */}
          <nav className='px-3 mt-6'>
            <div className='space-y-1'>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive
                    ? 'bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                }
              >
                Home
              </NavLink>
              <NavLink
                to='/about'
                className={({ isActive }) =>
                  isActive
                    ? 'bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                }
              >
                About
              </NavLink>
            </div>
            <div className='mt-8'>
              {/* Secondary navigation */}
              <h3
                className='px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'
                id='desktop-tags-headline'
              >
                Tags
              </h3>
              <div
                className='mt-1 space-y-1'
                role='group'
                aria-labelledby='desktop-tags-headline'
              >
                {tags.map((tag) => (
                  <button
                    key={tag.name}
                    className='group w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50'
                  >
                    <span
                      className={classNames(
                        tag.color,
                        'w-2.5 h-2.5 mr-4 rounded-full'
                      )}
                      aria-hidden='true'
                    />
                    <span className='truncate'>{tag.name}</span>
                  </button>
                ))}
                <button
                  onClick={() => setModalOpen(true)}
                  className='group w-full flex items-center px-3 py-2 text-sm font-medium text-gray-500 rounded-md hover:text-gray-700 hover:bg-gray-50'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 4v16m8-8H4'
                    />
                  </svg>
                  <span className='ml-1'>New Tag</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
