import React from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';

type type = 'default' | 'danger' | 'primary' | 'text';

interface Props {
  type: type;
  title: string;
}

export default function Itag({ type, title }: Props) {
  return <span className={classNames(styles.wrap, styles[type])}>{title}</span>;
}
