import { ReactNode } from 'react';
import styles from './style.module.scss';

interface IProps {
  title: string;
  imgUrl: string;
  footer?: ReactNode;
}

export default function Empty(props: IProps) {
  return (
    <div className={styles['empty-wrap']}>
      <div className={styles['img-warp']}>
        <img className={props.imgUrl} src={props.imgUrl} alt="" />
      </div>
      <div className={styles.title}>{props.title}</div>
      {/* footer 未react节点 */}
      <div className={styles.footer}>{props?.footer}</div>
    </div>
  );
}
