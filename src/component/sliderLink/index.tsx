import styles from './style.module.scss';
import { ILink } from '../../modal/base';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

interface IProps {
  itemLink: ILink;
  active: boolean;
}

export default function SliderLink({ itemLink, active }: IProps) {
  const navgiate = useNavigate();

  return (
    <div
      onClick={() => {
        navgiate(`/forms/?sidebar=${itemLink.key}`);
      }}
      className={active ? classNames(styles.active, styles['item-link']) : styles['item-link']}
    >
      <img className={styles['link-left-icon']} src={itemLink.icon} alt="" />
      <h2 className={styles['link-title']}>{itemLink.title}</h2>
    </div>
  );
}
