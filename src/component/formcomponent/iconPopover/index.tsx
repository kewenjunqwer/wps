import { Popover } from 'antd';
import styles from './style.module.scss';
import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { TooltipPlacement } from 'antd/es/tooltip';
interface Iprops {
  content: ReactNode;
  onclick: () => void;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  placement: TooltipPlacement | undefined;
  isClickHideenPopover?: boolean;
}
export default function IconPopover(props: Iprops) {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const { content, Icon, placement } = props;
  return (
    <Popover
      destroyTooltipOnHide={true}
      className={styles['popover']}
      arrow={false}
      content={
        <div
          onClick={() => {
            if (props.isClickHideenPopover) {
              setIsopen(false);
            }
          }}
        >
          {content}
        </div>
      }
      open={isOpen}
      trigger="click"
      placement={placement}
      onOpenChange={open => setIsopen(open)}
    >
      <div
        onClick={props.onclick}
        className={
          isOpen ? classNames(styles['tag-wrap'], styles['text-active']) : styles['tag-wrap']
        }
      >
        <Icon />
      </div>
    </Popover>
  );
}
