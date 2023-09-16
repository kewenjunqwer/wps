import { Popover } from 'antd';
import styles from './style.module.scss';
import { ReactNode, createContext, useImperativeHandle, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as ArrowIcon } from '../../../assets/form/arrow-down-big.svg';

interface Iprops {
  content: ReactNode;
  title: string;
  openChangeClose?: () => void;
  onOpen?: () => void;
}

interface UserContext {
  tagOpen?: boolean;
  setTagOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const tagOpenContext = createContext<UserContext>({
  tagOpen: false,
  setTagOpen: () => {},
});

export default function TAG_Popover({ title, content, openChangeClose, onOpen }: Iprops) {
  const [tagOpen, setTagOpen] = useState<boolean>(false);

  return (
    <tagOpenContext.Provider value={{ tagOpen, setTagOpen }}>
      <Popover
        className={styles['popover']}
        arrow={false}
        content={content}
        open={tagOpen}
        placement="bottom"
        trigger={'click'}
        onOpenChange={open => {
          setTagOpen(open);
          if (open) {
            onOpen && onOpen();
          } else {
            openChangeClose && openChangeClose();
          }
        }}
      >
        <div
          className={
            tagOpen ? classNames(styles['tag-wrap'], styles['text-active']) : styles['tag-wrap']
          }
        >
          <span className={styles.title}>{title}</span>
          <ArrowIcon className={tagOpen ? styles['tag-close'] : styles['tag-open']}></ArrowIcon>
        </div>
      </Popover>
    </tagOpenContext.Provider>
  );
}
