import styles from './style.module.scss';
import { APPlicationLink } from '../../modal/base';
import classNames from 'classnames';

// 单个应用链接组件
interface Props {
  item: APPlicationLink;
}
export default function ApplicationLink({ item }: Props) {
  return (
    <div
      onClick={() => {
        window.open(item.href);
      }}
      className={classNames(styles['ksapc-app'], styles['text-hover'])}
    >
      <div className={styles['icon']}>
        {item.iconUrl}
      </div>
      <div className={styles['content']}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.subtitle}>{item.subtitle}</div>
      </div>
    </div>
  );
}
