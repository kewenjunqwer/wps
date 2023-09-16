import styles from './style.module.scss';
import { Button, Checkbox } from 'antd';
import { useContext, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as StarIcon } from '../../../../assets/form/star.svg';
import { ReactComponent as UnstarIcon } from '../../../../assets/form/unstar.svg';
import { ReactComponent as OperateIcon } from '../../../../assets/form/more.svg';
import { CollectState, FormState, IForm } from '../../../../modal/form';
import { formatTimeRelative } from '../../../../util';
import { formContext } from '../../../../context/form';
import { PopoverItemLink } from '../../../formcomponent/popoverItemLink';
import IconPopover from '../../../formcomponent/iconPopover';
import Itag from '../../../itag';

interface Props {
  item: IForm; // 单个表单数据
  title: string;
  formItemSet: any; //当前表当所属的配置项
  operateIconClick: (item: IForm) => void; // 右侧三点操作符点击函数
  ondelete: () => void;
}
export function FormItem({ item, title, formItemSet, operateIconClick, ondelete }: Props) {
  const { selectForm, activeFormIds, _starForm } = useContext(formContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 找到当前formItem的操作弹出项
  const { popoverContent, btnOperate } = formItemSet;

  const operatePopoverContent = () => {
    if (formItemSet.popoverContent) {
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
          {/* <PoverItemLinksContent contentLinks={popoverContent} width={150} /> */}
          <div className={styles['gapline']}></div>
          <div onClick={ondelete} className={styles['delete-wrap']}>
            删除
          </div>
        </div>
      );
    }
  };
  return (
    <>
      <div className={classNames(styles.form, styles['text-hover'])}>
        <Checkbox
          checked={activeFormIds?.map(item => item.id).includes(item.item_id)}
          onChange={e => {
            selectForm(item.item_id, e.target.checked, item.kind);
          }}
          className={styles.checkbox}
        />
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
              <div className={styles.text}>
                {item.type === FormState.DRAFT ? (
                  <Itag type="text" title="未发布" />
                ) : item.expire === CollectState.COLLECT ? (
                  <Itag type="primary" title={`正在收集 ${item.count}`} />
                ) : (
                  <Itag type="primary" title={`停止收集 ${item.count}`} />
                )}
              </div>
            </div>
            <div className={classNames(styles['item-wrap'], styles['left-4'])}>
              <span>{formatTimeRelative(item.create_ts)}</span>
              <span style={{ display: 'inline-block', marginLeft: 2 }} className={styles.puplish}>
                发布
              </span>
            </div>
            {/* 星标操作 */}
            <div className={classNames(styles['item-wrap'], styles['left-5'])}>
              <div
                onClick={() => {
                  _starForm({ ids: [item.item_id], _t: Date.now(), star: !item.star });
                }}
              >
                {item?.star ? <StarIcon /> : <UnstarIcon className={styles['unstar']} />}
              </div>
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
