import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';

interface Props {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const DatePicker = ({ date, setDate }: Props) => {
  return (
    <div className='relative w-full'>
      <ReactDatePicker
        selected={date}
        onChange={(date) => setDate(date as Date)}
        dateFormat='MM/dd/yyyy HH:mm'
        // showTimeInput
        nextMonthButtonLabel='>'
        previousMonthButtonLabel='<'
        popperClassName='react-datepicker-right'
        customInput={<ButtonInput />}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className='flex items-center justify-between px-2 py-2'>
            <span className='text-lg text-gray-700'>
              {format(new Date(date), 'MMMM yyyy')}
            </span>

            <div className='space-x-2'>
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type='button'
                className={`
                                            ${
                                              prevMonthButtonDisabled &&
                                              'cursor-not-allowed opacity-50'
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
              >
                <ChevronLeftIcon className='w-5 h-5 text-gray-600' />
              </button>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type='button'
                className={`
                                            ${
                                              nextMonthButtonDisabled &&
                                              'cursor-not-allowed opacity-50'
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
              >
                <ChevronRightIcon className='w-5 h-5 text-gray-600' />
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

const ButtonInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <button
    onClick={onClick}
    ref={ref}
    type='button'
    className='inline-flex justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500'
  >
    {format(new Date(value), 'dd MMMM yyyy')}
  </button>
));
