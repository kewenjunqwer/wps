import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './style.module.scss';

interface PopoverLink {
  title: string;
  onclick?: () => void; // 点击事件
  Icon?: ReactNode; // 文字右侧节点
  suffix?: ReactNode; //文字左侧节点

  style?: object; // 自定义设置样式
}

// 当个popover的link设置
export function PopoverItemLink(props: { linkItem: PopoverLink }) {
  const { linkItem } = props;

  return (
    <div
      style={linkItem?.style}
      onClick={() => {
        linkItem.onclick && linkItem.onclick();
      }}
      className={classNames(styles.item, styles['text-hover'])}
    >
      {linkItem.suffix && linkItem.suffix}
      <span>{linkItem.title}</span>
      {linkItem.Icon && linkItem.Icon}
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
