import { FC, ReactElement } from 'react';
import { Icon } from '@douyinfe/semi-ui';
import SunTips from '@/assets/svg/suntips.svg';
import Lightning from '@/assets/svg/lightning.svg';
import Warning from '@/assets/svg/warning.svg';
import { EmptyChatPlaceholderProps } from './EmptyChatPlaceholder';

const Examples = [
  'Explain quantum computing in simple terms',
  'Got any creative ideas for a 10 year old’s birthday?',
  'How do I make an HTTP request in Javascript?'
];

const EmptyChatPlaceholder: FC<EmptyChatPlaceholderProps> = function EmptyChatPlaceholder(props) {
  const { setValue } = props;

  const renderTipsButtons = (): ReactElement => (
    <ul className="flex flex-col gap-3.5">
      {Examples.map((v: string) => (
        <button
          key={v}
          type="button"
          onClick={() => setValue(v)}
          className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
        >
          {`"${v}" →`}
        </button>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col items-center text-sm h-full dark:bg-gray-800">
      <div className="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100">
        <h1 className="text-4xl font-semibold md:mt-[10vh] ml-auto mr-auto mb-8 sm:mb-16 hover:cursor-pointer mt-[12px]">
          Chat
        </h1>
        <div className="flex items-start text-center gap-3.5">
          <div className="flex flex-col gap-3.5 flex-1">
            <Icon svg={<SunTips />} />
            <h2 className="text-lg font-normal">Primjeri</h2>
            {renderTipsButtons()}
          </div>
          <div className="flex flex-col gap-3.5 flex-1">
            <Icon svg={<Lightning />} />
            <h2 className="text-lg font-normal">Mogucnosti</h2>
            <ul className="flex flex-col gap-3.5">
              <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                Pamti šta ste pisali
              </li>
              <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                Daje korisnicima mogucnost da se isprave kada zele
              </li>
              <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                Treniran da odbije ruzne zahtjeve
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3.5 flex-1">
            <Icon svg={<Warning />} />
            <h2 className="text-lg font-normal">Limiti</h2>
            <ul className="flex flex-col gap-3.5">
              <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                Može dati ne tacnu informaciju ( JAAKO RIJETKO )
              </li>
              <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                Ima znanje do 2023 godine, poslje NE!
              </li>
              <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
             
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-48 flex-shrink-0" />
    </div>
  );
};

export default EmptyChatPlaceholder;
