import styles from './style.module.scss';
import { Button, Checkbox, Popover } from 'antd';
import { useContext, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as StarIcon } from '../../../assets/form/star.svg';
import { ReactComponent as UnstarIcon } from '../../../assets/form/unstar.svg';
import { ReactComponent as OperateIcon } from '../../../assets/form/more.svg';
import { CollectState, IForm } from '../../../modal/form';
import { formatTimeRelative } from '../../../util';
import { formContext } from '../../../context/form';
import { PopoverItemLink, PoverItemLinksContent } from '../popoverItemLink';
import IconPopover from '../iconPopover';
import { set } from 'lodash';

interface Props {
  item: IForm;
  title: string;
  formItemSet: any;
}
export function FormItem({ item, title, formItemSet }: Props) {
  const { selectForm, activeFormIds, _starForm, setOperateForm } = useContext(formContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 找到当前formItem的操作弹出项
  const { popoverContent, btnOperate } = formItemSet;

  const operatePopoverContent = () => {
    if (formItemSet.popoverContent) {
      return (
        <div
          style={{ width: 144, padding: 12 }}
          onClick={() => {
            setIsOpen(false);
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
          <div className={styles['delete-wrap']}>删除</div>
        </div>
      );
    }
  };

  console.log('chongxin');
  return (
    <div className={classNames(styles['form-item'], styles['text-hover'])}>
      <div className={styles.top}>
        <Checkbox
          checked={activeFormIds?.map(item => item.id).includes(item.item_id)}
          onChange={e => {
            selectForm(item.item_id, e.target.checked, item.kind);
          }}
        ></Checkbox>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles['left-1']}>
              <div className={styles['type-info']}>
                <div className={styles['title']}>{title}</div>
                <div className={styles.index}>{item.title}</div>
              </div>
            </div>
            <div className={classNames(styles['item-wrap'], styles['left-2'])}>
              <div className={styles['tag-text-content']}></div>
            </div>
            <div className={classNames(styles['item-wrap'], styles['left-3'])}>
              <div className={styles['tag-text-content']}>
                <div className={styles.text}>
                  <span
                    className={
                      item.expire === CollectState.COLLECT
                        ? classNames(styles['collect-text'], styles.collect)
                        : classNames(styles['collect-text'], styles.unSelect)
                    }
                  >
                    {item.expire === CollectState.COLLECT
                      ? `正在收集 ${item.count}`
                      : `停止收集 ${item.count}`}
                  </span>
                </div>
              </div>
            </div>
            <div className={classNames(styles['item-wrap'], styles['left-4'])}>
              <div className={styles['tag-text-content']}>
                <span>{formatTimeRelative(item.create_ts)}</span>
                <span style={{ display: 'inline-block', marginLeft: 2 }} className={styles.puplish}>
                  发布
                </span>
              </div>
            </div>
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
              {/* <Popover
                className={styles['popover']}
                arrow={false}
                content={operatePopoverContent()}
                open={isOpen}
                trigger="click"
                onOpenChange={open => setIsOpen(open)}
                placement={'top'}
              >
                <div
                  onClick={() => {
                    setOperateForm(item);
                  }}
                  className={
                    isOpen
                      ? classNames(styles['tag-wrap'], styles['text-active'])
                      : styles['tag-wrap']
                  }
                >
                  <OperateIcon />
                </div>
              </Popover> */}
              <IconPopover
                onclick={() => {
                  setOperateForm(item);
                }}
                isClickHideenPopover={true}
                placement="top"
                Icon={OperateIcon}
                content={operatePopoverContent()}
              ></IconPopover>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.gap_line}></div>
    </div>
  );
}
