import { ReactNode, useContext } from 'react';
import styles from './style.module.scss';
import { Checkbox } from 'antd';

import classNames from 'classnames';

import { formContext } from '../../../context/form';
import TagPopover from './tagPopover';
import StarPopover from './starPopover';
import SelectForm from './formSelect';

interface Props {
  Nodes: ReactNode[];
  suffix?: ReactNode;
}

export default function FormHeader({ Nodes, suffix }: Props) {
  return (
    <>
      <div className={styles.container}>
        {suffix}
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={classNames(styles['left-1'])}>{Nodes[0]}</div>
            {/* 标签操作 */}
            <div className={classNames(styles['item-wrap'], styles['left-2'])}>{Nodes[1]}</div>
            <div className={classNames(styles['item-wrap'], styles['left-3'])}>{Nodes[2]}</div>
            <div className={classNames(styles['item-wrap'], styles['left-4'])}>{Nodes[3]}</div>
            {/* 星标操作 */}
            <div className={classNames(styles['item-wrap'], styles['left-5'])}>{Nodes[4]}</div>
          </div>
          <div className={styles.right}></div>
        </div>
        {/* <div className={styles.line}></div> */}
      </div>
    </>
  );
}
