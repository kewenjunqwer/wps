import { useContext, useEffect, useState, useCallback } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';
import { Checkbox, Modal, Popover } from 'antd';
import { ITag } from '../../../modal/tage';
import { ReactComponent as OperateIcon } from '../../../assets/form/more.svg';
import IconPopover from '../iconPopover';
import { PopoverItemLink } from '../popoverItemLink';
import TagModal from '../tagModal';
import { tagContext } from '../../../context/tag';
import { ReqTagUpdate } from '../../../modal/tag';

interface Props {
  item: ITag;
  onclick: () => void;
}

// 单个tagItem
export default function TagItem({ item, onclick }: Props) {
  // 是否打开修改tag信息的弹出框
  const [isShowEditTag, setIsShowEditTag] = useState<boolean>(false);
  // 当前点击的tagItem
  const { activeTag, _updateTag, setActiveTag } = useContext(tagContext);
  useEffect(() => {
    setIsShowEditTag(false);
  }, [activeTag]);

  const content = useCallback(() => {
    return (
      <div style={{ width: 150, padding: 16 }}>
        <Popover
          arrow={false}
          placement="right"
          open={isShowEditTag}
          trigger={'click'}
          onOpenChange={open => setIsShowEditTag(open)}
          content={
            <TagModal
              oncancel={() => {
                setIsShowEditTag(false);
              }}
              isUpdate={true}
              activeTag={activeTag}
              onOK={(option: ReqTagUpdate) => {
                setIsShowEditTag(false);
                _updateTag(option);
              }}
            ></TagModal>
          }
        >
          <PopoverItemLink
            linkItem={{
              title: '编辑',
              onclick: () => {
                setIsShowEditTag(!isShowEditTag);
              },
            }}
          ></PopoverItemLink>
        </Popover>
        <PopoverItemLink
          linkItem={{
            title: '删除',
            onclick: () => {
              onclick();
            },
          }}
        ></PopoverItemLink>
      </div>
    );
  }, [_updateTag, activeTag, isShowEditTag, onclick]);

  return (
    <div className={classNames(styles['tag-item'], styles._rsbc)}>
      <div className={styles['checkbox']}>
        <Checkbox />
      </div>
      <div className={classNames(styles['content'], styles.ellipsis)}>
        <div style={{ backgroundColor: item.color }} className={styles.banner}></div>
        <span>{item.tag_name}</span>
      </div>
      <div className={styles.operate}>
        <IconPopover
          onclick={() => {
            setActiveTag(item);
          }}
          placement="right"
          Icon={OperateIcon}
          content={content()}
        ></IconPopover>
      </div>
    </div>
  );
}

interface TlistProps {
  tagList: ITag[];
}

export function TagList({ tagList }: TlistProps) {
  const [isShowDelModal, setIsShowModal] = useState<boolean>(false);
  const { activeTag, _delTags } = useContext(tagContext);

  return (
    <>
      {tagList.map(item => (
        <TagItem
          onclick={() => {
            setIsShowModal(!isShowDelModal);
          }}
          key={item.tag_id}
          item={item}
        />
      ))}
      {/* 删除弹出框 */}
      <Modal
        title={'删除标签'}
        onCancel={() => {
          setIsShowModal(false);
        }}
        onOk={() => {
          _delTags({ tag_ids: [activeTag?.tag_id as string], _t: Date.now() });
          setIsShowModal(false);
        }}
        destroyOnClose={true}
        okText={'确定删除'}
        cancelText={'取消'}
        centered={true}
        open={isShowDelModal}
        okButtonProps={{ type: 'primary', danger: true }}
      >
        <div>{`确定要删除标签“${activeTag?.tag_name}”吗？`}</div>
      </Modal>
    </>
  );
}
