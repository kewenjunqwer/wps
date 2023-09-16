import { Popover } from 'antd';
import styles from './style.module.scss';
import { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as ArrowIcon } from '../../../assets/form/arrow-down-big.svg';

interface Iprops {
  content: ReactNode;
  title: string;
}

export default function TAG_Popover(props: Iprops) {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const { content, title } = props;
  return (
    <Popover
      className={styles['popover']}
      arrow={false}
      content={content}
      open={isOpen}
      placement="bottom"
      trigger={'click'}
      onOpenChange={open => setIsopen(open)}
    >
      <div
        className={
          isOpen ? classNames(styles['tag-wrap'], styles['text-active']) : styles['tag-wrap']
        }
      >
        <span className={styles.title}>{title}</span>
        <ArrowIcon className={isOpen ? styles['tag-close'] : styles['tag-open']}></ArrowIcon>
      </div>
    </Popover>
  );
}
