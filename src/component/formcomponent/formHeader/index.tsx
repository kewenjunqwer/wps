import { PropsWithChildren } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';

import { ReactComponent as RefeshIcon } from '../../../assets/form/refresh.svg';

interface Props {
  title: string;
  refresh: () => void;
}

export default function FormHeader(props: PropsWithChildren<Props>) {
  return (
    <div className={classNames(styles['wrap'], styles.flex_bt_center)}>
      <div className={styles['title-wrap']}>
        <h2 className={styles['title']}>{props.title}</h2>
        <div className={classNames(styles['icon-wrap'], styles.flex_ac_jc)}>
          {/* 刷新 */}
          <RefeshIcon onClick={props.refresh} className={styles._cursor}></RefeshIcon>
        </div>
      </div>
      <div className={styles.right}></div>
      {props.children}
    </div>
  );
}
