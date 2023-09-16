import { useContext, useState } from 'react';

import { Popover } from 'antd';
import TagModal from '../tagModal';
import classNames from 'classnames';
import { ReactComponent as AddIcon } from '../../../assets/form/add.svg';
import { ReactComponent as ArrowRigthIcon } from '../../../assets/form/arrow.svg';
import { PopoverItemLink } from '../popoverItemLink';
import { tagContext } from '../../../context/tag';

import styles from './style.module.scss';
export default function CreateTag() {
  const [isOpen, setIsopen] = useState<boolean>(false);

  return (
    <>
      <Popover
        open={isOpen}
        onOpenChange={open => setIsopen(open)}
        trigger={'click'}
        arrow={false}
        placement="left"
        content={
          <TagModal
            onOk={() => {
              setIsopen(false);
            }}
            oncancel={() => {
              setIsopen(false);
            }}
          ></TagModal>
        }
      >
        <div className={classNames(styles['item'], styles['text-hover'])}>
          <AddIcon className={classNames(styles['text-active'], styles['addIcon'])}></AddIcon>
          <span className={styles['text-active']}>新建标签</span>
        </div>
      </Popover>
    </>
  );
}

// 右侧弹出创建tag标签的选项
export function FormPopoVerCreateTag() {
  const { tags } = useContext(tagContext);
  const [isOpen, setIsopen] = useState<boolean>(false);
  const content = (
    <div style={{ width: 200, padding: 12 }}>
      {tags.map(item => (
        <div className={styles.item}>
          <div style={{ backgroundColor: item.color }} className={styles.banner}></div>
          <span>{item.tag_name}</span>
        </div>
      ))}
      {<CreateTag></CreateTag>}
    </div>
  );
  return (
    <Popover
      onOpenChange={open => setIsopen(open)}
      arrow={false}
      placement="left"
      content={content}
      trigger="hover"
    >
      <div onClick={e => e.stopPropagation()}>
        <PopoverItemLink linkItem={{ title: '添加标签', Icon: ArrowRigthIcon }}></PopoverItemLink>
      </div>
    </Popover>
  );
}
