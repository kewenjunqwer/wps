import React, { PropsWithChildren, useContext } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';

import { ReactComponent as RefeshIcon } from '../../../assets/form/refresh.svg';
import { formContext } from '../../../context/form';

interface Props {
  title: string;
}

export default function FormHeader(props: PropsWithChildren<Props>) {
  const { getForms } = useContext(formContext);

  return (
    <div className={classNames(styles['wrap'], styles.flex_bt_center)}>
      <div className={styles['title-wrap']}>
        <h2 className={styles['title']}>我创建的</h2>
        <div className={classNames(styles['icon-wrap'], styles.flex_ac_jc)}>
          {/* 刷新 */}
          <RefeshIcon
            onClick={() => {
              getForms();
            }}
            className={styles._cursor}
          ></RefeshIcon>
        </div>
      </div>
      <div className={styles.right}></div>
      {props.children}
    </div>
  );
}
