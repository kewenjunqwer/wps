import React from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';

interface Props {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  bgColor: string;
  isShowIcom?: boolean;
  onClick?: (color: string) => void;
}
export function TagColor(props: Props) {
  const { Icon } = props;
  return (
    <div
      onClick={() => {
        props.onClick && props.onClick(props.bgColor);
      }}
      className={classNames(styles['tag-wrap'], styles._rfcsf)}
    >
      <div className={styles['content']} style={{ background: props.bgColor }}></div>
      {props.isShowIcom && <Icon className={styles.icon}></Icon>}
    </div>
  );
}

interface Iprops {
  baColors: string[];
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onclick: (color: string) => void;
  activeColor: string;
}

export function TagColorList(props: Iprops) {
  const { baColors, Icon } = props;
  return (
    <div className={styles['tags-list']}>
      {baColors?.map(item => (
        <TagColor
          key={item}
          bgColor={item}
          Icon={Icon}
          onClick={props.onclick}
          isShowIcom={props.activeColor === item}
        ></TagColor>
      ))}
    </div>
  );
}
