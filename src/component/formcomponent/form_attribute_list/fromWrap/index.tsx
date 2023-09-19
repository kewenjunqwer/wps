import classNames from 'classnames';
import styles from './style.module.scss';
import { Checkbox } from 'antd';

export default function FormWrap() {
  return (
    <div className={styles.wrap}>
      <></>
      <Checkbox className={styles.checkbox} />
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={classNames(styles['left-1'])}></div>
          {/* 标签操作 */}
          <div className={classNames(styles['item-wrap'], styles['left-2'])}></div>
          <div className={classNames(styles['item-wrap'], styles['left-3'])}></div>
          <div className={classNames(styles['item-wrap'], styles['left-4'])}></div>
          {/* 星标操作 */}
          <div className={classNames(styles['item-wrap'], styles['left-5'])}></div>
        </div>
        <div className={styles.right}></div>
      </div>
      <div className={styles.line}></div>
    </div>
  );
}
