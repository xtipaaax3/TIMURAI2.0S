import React, {
  useCallback, useContext, useState, useRef 
} from 'react';
import {
  Icon, Modal, Popconfirm, Toast
} from '@douyinfe/semi-ui';
import classNames from 'classnames';
import TabItem from '@/components/tab-item';
import ApiKeyInput from '@/components/api-key-input';
import useIsMobile from '@/hooks/useIsMobile';
import { Store } from '@/pages/index';
import { ChatStoreProps } from '@/global';
import Moon from '@/assets/svg/moon.svg';
import Sun from '@/assets/svg/sun.svg';
import Add from '@/assets/svg/add.svg';
import Delete from '@/assets/svg/delete.svg';
import Key from '@/assets/svg/key.svg';
import { Mode, SideBarProps } from './Sidebar';

const commonCls = 'flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm';

export const Nav: React.FC<SideBarProps> = function Nav(props) {
  const {
    chatList, handleDeleteAll, apiKey, handleApiKeyChange 
  } = useContext<ChatStoreProps>(Store);

  const { onNewChat = () => {} } = props;

  const isMobile = useIsMobile();

  const apiKeyRef = useRef<any>();

  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window.matchMedia === 'function') {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return darkMode ? 'dark' : 'light';
    }
    return false; // 表示不支持暗色模式
  });

  const handleChangeMode = useCallback(() => {
    const html = document.getElementsByTagName('html')[0];
    if (mode === 'light') {
      setMode('dark');
      html.classList.remove('light');
      html.classList.add('dark');
      html.style.colorScheme = 'dark';
    } else {
      setMode('light');
      html.classList.remove('dark');
      html.classList.add('light');
      html.style.colorScheme = 'light';
    }
  }, [mode]);

  const handleInputKey = useCallback(() => {
    const preApiKey = apiKey;
    apiKeyRef.current = Modal.info({
      header: <div className="py-6 font-semibold">UNESI TIMUR-AI KLJUC</div>,
      style: { top: '100px', maxWidth: '100%' },
      bodyStyle: { marginLeft: 0 },
      content: <ApiKeyInput handleApiKeyChange={handleApiKeyChange} localApiKey={apiKey} />,
      okText: 'U redu',
      cancelText: 'Otkaži',
      onOk: () => {
        Toast.success('Uspješno!');
      },
      onCancel: () => {
        handleApiKeyChange(preApiKey);
        Toast.error('Otkazano!');
        apiKeyRef.current?.destroy();
      }
    });
  }, [apiKey, handleApiKeyChange]);

  return (
    <div className={`flex h-full w-full flex-1 items-start border-white/20 ${isMobile ? 'scrollbar-trigger' : ''}`}>
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        <button type="button" className={classNames(commonCls, 'mb-2 flex-shrink-0 border border-white/20')} onClick={onNewChat}>
          <Icon svg={<Add />} />
          NOVI CHAT
        </button>
        <div className="flex-col flex-1 overflow-y-auto border-b border-white/20 hidden-scroll-bar">
          <div className="flex flex-col gap-2 text-gray-100 text-sm">
            {chatList.length > 0 && chatList.map((chat) => <TabItem key={chat.chatId} chat={chat} />)}
          </div>
        </div>
        {chatList.length > 0 && (
          <Popconfirm
            title="Da li si siguran da želiš obrisati sve prethodne razgovore?"
            content="Svi razgovori nakon brisanja idu trajno i ne mogu se vratiti!"
            onConfirm={() => {
              handleDeleteAll();
              Toast.success('Uspješno!');
            }}
          >
            <button className={commonCls} type="button">
              <Icon svg={<Delete />} />
              Obriši sve razgovore
            </button>
          </Popconfirm>
        )}
        <button className={commonCls} type="button" onClick={handleInputKey}>
          <Icon svg={<Key />} />
          TIMUR AI KLJUC
        </button>
        {mode ? (
          <button className={commonCls} onClick={handleChangeMode} type="button">
            <Icon svg={mode === 'dark' ? <Sun /> : <Moon />} />
            {`${mode === 'dark' ? 'Svijetlo' : 'Tamno'}`}
          </button>
        ) : null}
      </nav>
    </div>
  );
};

const SideBar: React.FC<SideBarProps> = function SideBar({ onNewChat }) {
  return (
    <div className="hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
      <div className="flex h-full min-h-0 flex-col ">
        <Nav onNewChat={onNewChat} />
      </div>
    </div>
  );
};

export default SideBar;
