import styles from './style.module.scss';
import { Button } from 'antd';
import classNames from 'classnames';

import { ReactComponent as OperateIcon } from '../../../../assets/form/more.svg';
import { MYFillItem } from '../../../../modal/form';
import { formatTimeRelative } from '../../../../util';
import { PopoverItemLink } from '../../../formcomponent/popoverItemLink';
import IconPopover from '../../../formcomponent/iconPopover';
import Itag from '../../../itag';

interface Props {
  title: string;
  formItemSet: any;
  item: MYFillItem;
  operateIconClick: (item: MYFillItem) => void;
}
export function MyFillItem({ item, title, formItemSet, operateIconClick }: Props) {
  const { popoverContent, btnOperate } = formItemSet;

  const operatePopoverContent = () => {
    if (formItemSet && formItemSet.popoverContent) {
      return (
        <div
          style={{ width: 144, padding: 12 }}
          onClick={e => {
            // setIsOpen(false);
          }}
        >
          <div>
            {popoverContent.map((item: any) => {
              if (item.node) {
                return item.node;
              } else {
                return <PopoverItemLink linkItem={item} />;
              }
            })}
          </div>
        </div>
      );
    }
  };
  return (
    <>
      <div className={classNames(styles.form, styles['text-hover'])}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={classNames(styles['left-1'])}>
              <div className={styles['type-info']}>
                <div className={styles['collect-text']}>{title}</div>
                <div className={styles.index}>{item.title}</div>
              </div>
            </div>
            {/* 标签操作 */}
            <div className={classNames(styles['item-wrap'], styles['left-2'])}>
              <div className={styles['tag-text-content']}></div>
            </div>
            <div className={classNames(styles['item-wrap'], styles['left-3'])}>
              <div className={styles.text}>{item.user.nickname}</div>
            </div>
            <div className={classNames(styles['item-wrap'], styles['left-4'])}>
              {item.draft ? (
                <Itag type="text" title="未提交" />
              ) : (
                <Itag type="primary" title="已提交" />
              )}
            </div>
            {/* 星标操作 */}
            <div className={classNames(styles['item-wrap'], styles['left-5'])}>
              <span>{formatTimeRelative(item.create_ts)}</span>
              <span style={{ display: 'inline-block', marginLeft: 2 }} className={styles.puplish}>
                {item.draft ? '保存' : '提交'}
              </span>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.wrap}>
              <div className={styles.btns}>
                <Button onClick={btnOperate.onclick} className={styles['btn']} type="default">
                  {btnOperate?.btnTitle}
                </Button>
              </div>
              <IconPopover
                onclick={() => {
                  operateIconClick(item);
                }}
                isClickHideenPopover={true}
                placement="top"
                Icon={OperateIcon}
                content={operatePopoverContent()}
              ></IconPopover>
            </div>
          </div>
        </div>
        <div className={styles.gap_line}></div>
      </div>
    </>
  );
}
