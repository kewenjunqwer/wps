import { Popover } from 'antd';
import styles from './style.module.scss';
import { createContext, useContext, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as ArrowIcon } from '../../../../assets/form/arrow-down-big.svg';
import { tagContext } from '../../../../context/tag';
import { ReactComponent as CheckIcon } from '../../../../assets/form/checked.svg';
import { TagList } from '../../../tagcomponent/tagItem';
import CreateTag from '../../../tagcomponent/createTag';
import { formContext } from '../../../../context/form';

interface UserContext {
  tagOpen?: boolean;
  setTagOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const tagOpenContext = createContext<UserContext>({
  tagOpen: false,
  setTagOpen: () => {},
});

export default function TagPopover() {
  const [tagOpen, setTagOpen] = useState<boolean>(false);
  const { tags, selectTags, setSeletcTags } = useContext(tagContext);
  const { getForms } = useContext(formContext);

  const popoverContent = () => {
    return (
      <div className={styles['tag-content']}>
        <div
          onClick={() => {
            setSeletcTags([]);
            getForms();
            setTagOpen(false);
          }}
          className={classNames(styles.top, styles['text-hover'])}
        >
          <span>显示全部</span>
          <CheckIcon className={styles['text-active']}></CheckIcon>
        </div>
        <div className={styles['gap-line']}></div>
        {/* 显示已创建的标签列表 */}
        <div className={styles.list}>
          <TagList tagList={tags} />
        </div>
        <div className={styles['gap-line']}> </div>
        <CreateTag isActiveHighlighted={true} placement="left"></CreateTag>
      </div>
    );
  };

  return (
    <tagOpenContext.Provider value={{ tagOpen, setTagOpen }}>
      <Popover
        className={styles['popover']}
        arrow={false}
        content={popoverContent()}
        open={tagOpen}
        placement="bottom"
        trigger={'click'}
        onOpenChange={open => {
          setTagOpen(open);
          if (!open) {
            getForms(selectTags);
          }
        }}
      >
        <div
          className={
            tagOpen ? classNames(styles['tag-wrap'], styles['text-active']) : styles['tag-wrap']
          }
        >
          <span className={styles.title}>
            {selectTags.length > 0 ? `已选择${selectTags.length}个标签` : '标签'}
          </span>
          <ArrowIcon className={tagOpen ? styles['tag-close'] : styles['tag-open']}></ArrowIcon>
        </div>
      </Popover>
    </tagOpenContext.Provider>
  );
}
