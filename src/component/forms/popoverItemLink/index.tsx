import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './style.module.scss';

interface PopoverLink {
  title: string;
  onclick?: () => void;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  suffix?: ReactNode;
}

// 当个popover的link设置
export function PopoverItemLink(props: { linkItem: PopoverLink }) {
  const { linkItem } = props;
  return (
    <div onClick={linkItem?.onclick} className={classNames(styles.item, styles['text-hover'])}>
      {linkItem.suffix && linkItem.suffix}
      <span>{linkItem.title}</span>
      {linkItem.Icon && <linkItem.Icon />}
    </div>
  );
}

interface IProps {
  contentLinks: PopoverLink[];
  width?: number;
  footer?: ReactNode;
}
export function PoverItemLinksContent({ contentLinks, width = 150, footer }: IProps) {
  return (
    <div style={{ width: width ? width : 150 }} className={classNames(styles['opetate-content'])}>
      {contentLinks.map(item => (
        <PopoverItemLink linkItem={item} />
      ))}
      {footer && footer}
    </div>
  );
}
