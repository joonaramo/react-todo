import { RadioGroup } from '@headlessui/react';
type Color =
  | 'pink-500'
  | 'purple-500'
  | 'blue-500'
  | 'green-500'
  | 'yellow-500';

interface Props {
  color: Color;
  setColor: React.Dispatch<React.SetStateAction<Color>>;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const colors: Color[] = [
  'pink-500',
  'purple-500',
  'blue-500',
  'green-500',
  'yellow-500',
];

const ringColors = {
  'pink-500': 'ring-pink-500',
  'purple-500': 'ring-purple-500',
  'blue-500': 'ring-blue-500',
  'green-500': 'ring-green-500',
  'yellow-500': 'ring-yellow-500',
};

const bgColors = {
  'pink-500': 'bg-pink-500',
  'purple-500': 'bg-purple-500',
  'blue-500': 'bg-blue-500',
  'green-500': 'bg-green-500',
  'yellow-500': 'bg-yellow-500',
};

export const ColorSelector = ({ color, setColor }: Props) => {
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
                ringColors[color],
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
                bgColors[color],
                'h-8 w-8 border border-black border-opacity-10 rounded-full'
              )}
            />
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};
