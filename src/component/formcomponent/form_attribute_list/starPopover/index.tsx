import { Popover } from 'antd';
import styles from './style.module.scss';
import { createContext, useContext, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as ArrowIcon } from '../../../../assets/form/arrow-down-big.svg';
import { formContext } from '../../../../context/form';
import { ReactComponent as CheckIcon } from '../../../../assets/form/checked.svg';

interface UserContext {
  tagOpen?: boolean;
  setTagOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const tagOpenContext = createContext<UserContext>({
  tagOpen: false,
  setTagOpen: () => {},
});

export default function StarPopover() {
  const [tagOpen, setTagOpen] = useState<boolean>(false);
  const { setIsStarForm, isStarForm, getForms } = useContext(formContext);

  const starLinks = [
    {
      title: '显示全部',
      onclick: () => {
        setIsStarForm(null);
        setTagOpen(false);
      },
      type: null,
    },
    {
      title: '仅显示星标',
      onclick: () => {
        setIsStarForm(true);
        setTagOpen(false);
      },
      type: true,
    },
  ];

  //点击星标弹出的内容
  const starContent = () => {
    return (
      <div className={styles['star-content']}>
        {starLinks.map(item => (
          <div
            key={item.title}
            onClick={item.onclick}
            className={classNames(styles['item'], styles.flex_bt_center, styles['text-hover'])}
          >
            <span>{item.title}</span>
            {isStarForm === item.type && <CheckIcon></CheckIcon>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <tagOpenContext.Provider value={{ tagOpen, setTagOpen }}>
      <Popover
        className={styles['popover']}
        arrow={false}
        content={starContent()}
        open={tagOpen}
        placement="bottom"
        trigger={'click'}
        onOpenChange={open => {
          setTagOpen(open);
        }}
      >
        <div
          className={
            tagOpen ? classNames(styles['tag-wrap'], styles['text-active']) : styles['tag-wrap']
          }
        >
          <span className={styles.title}>{isStarForm === null ? '星标' : '仅显示星标'}</span>
          <ArrowIcon className={tagOpen ? styles['tag-close'] : styles['tag-open']}></ArrowIcon>
        </div>
      </Popover>
    </tagOpenContext.Provider>
  );
}
