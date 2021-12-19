/* This example requires Tailwind CSS v2.0+ */
import { RadioGroup } from '@headlessui/react';
import { useEffect } from 'react';

interface Props {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const colors = [
  'pink-500',
  'purple-500',
  'blue-500',
  'green-500',
  'yellow-500',
];

export const ColorSelector = ({ color, setColor }: Props) => {
  useEffect(() => {
    setColor(colors[0]);
  }, [setColor]);

  return (
    <RadioGroup value={color} onChange={setColor}>
      <RadioGroup.Label className='block text-sm font-medium text-gray-700'>
        Color
      </RadioGroup.Label>
      <div className='mt-4 flex items-center space-x-3'>
        {colors.map((color) => (
          <RadioGroup.Option
            key={color}
            value={color}
            className={({ active, checked }) =>
              classNames(
                'ring-' + color,
                active && checked ? 'ring ring-offset-1' : '',
                !active && checked ? 'ring-2' : '',
                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
              )
            }
          >
            <RadioGroup.Label as='p' className='sr-only'>
              {color}
            </RadioGroup.Label>
            <span
              aria-hidden='true'
              className={classNames(
                'bg-' + color,
                'h-8 w-8 border border-black border-opacity-10 rounded-full'
              )}
            />
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};
