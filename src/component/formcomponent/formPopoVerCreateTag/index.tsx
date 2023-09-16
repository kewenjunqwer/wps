import { useContext, useState } from 'react';
import { tagContext } from '../../../context/tag';
import styles from './style.module.scss';
import CreateTag from '../../tagcomponent/createTag';
import { PopoverItemLink } from '../popoverItemLink';
import { ReactComponent as AddIcon } from '../../../assets/form/add.svg';
import { ReactComponent as ArrowRigthIcon } from '../../../assets/form/add.svg';
import { Popover } from 'antd';

// 右侧弹出创建tag标签的选项
export function FormPopoVerCreateTag() {
  const { tags } = useContext(tagContext);
  const [isOpen, setIsopen] = useState<boolean>(false);

  const content = (
    <div
      onClick={e => {
        e.stopPropagation();
      }}
      style={{ width: 200, padding: 12 }}
    >
      {tags.map(item => (
        <div className={styles.item}>
          <div style={{ backgroundColor: item.color }} className={styles.banner}></div>
          <span>{item.tag_name}</span>
        </div>
      ))}
      {
        <CreateTag
          oncancel={() => {
            setIsopen(false);
          }}
          onclick={() => {
            setIsopen(true);
          }}
          placement="left"
        >
          <PopoverItemLink linkItem={{ title: '新建标签', suffix: <AddIcon /> }}></PopoverItemLink>
        </CreateTag>
      }
    </div>
  );
  return (
    <Popover
      open={isOpen}
      onOpenChange={open => setIsopen(open)}
      arrow={false}
      placement="left"
      content={content}
      trigger="hover"
    >
      <div
        onMouseEnter={() => {
          setIsopen(true);
        }}
        onClick={e => e.stopPropagation()}
      >
        <PopoverItemLink linkItem={{ title: '添加标签', Icon: ArrowRigthIcon }}></PopoverItemLink>
      </div>
    </Popover>
  );
}
