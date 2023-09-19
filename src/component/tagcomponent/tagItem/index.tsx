import { useContext, useState, useCallback } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';
import { Checkbox, Modal, Popover } from 'antd';
import { ITag } from '../../../modal/tage';
import { ReactComponent as OperateIcon } from '../../../assets/form/more.svg';
import { PopoverItemLink } from '../../formcomponent/popoverItemLink';
import { tagContext } from '../../../context/tag';
import UpdateTag from '../../tagcomponent/updateTag';

interface Props {
  item: ITag;
  onDelete: () => void;
  onSelect: () => void;
}

// 单个tagItem
export default function TagItem({ item, onDelete, onSelect }: Props) {
  const [isOperating, setIsOperating] = useState<boolean>(false); // 是否之正在操作
  const [isOPen, setIsOpen] = useState<boolean>(false);
  const { _selectTags, selectTags } = useContext(tagContext);
  const content = useCallback(() => {
    return (
      <div style={{ width: 150, padding: 16 }}>
        <div>
          <PopoverItemLink
            linkItem={{
              title: '修改标签',
              onclick: () => {
                setIsOperating(true);
              },
            }}
          ></PopoverItemLink>
        </div>
        <PopoverItemLink
          linkItem={{
            title: '删除',
            onclick: () => {
              onDelete();
              setIsOpen(false);
            },
          }}
        ></PopoverItemLink>
      </div>
    );
  }, [onDelete]);

  return (
    <div className={classNames(styles['tag-item'], styles._rsbc)}>
      <div className={styles['checkbox']}>
        <Checkbox
          checked={selectTags.includes(item.tag_id)}
          onChange={e => {
            _selectTags(item.tag_id, e.target.checked);
          }}
        />
      </div>
      <div className={classNames(styles['content'], styles.ellipsis)}>
        <div style={{ backgroundColor: item.color }} className={styles.banner}></div>
        <span>{item.tag_name}</span>
      </div>
      <div className={styles.operate}>
        <Popover
          className={styles['popover']}
          open={isOPen}
          trigger="click"
          placement={'right'}
          onOpenChange={open => setIsOpen(open)}
          arrow={false}
          content={
            isOperating ? (
              <UpdateTag
                onok={() => {
                  setIsOpen(false);
                  setIsOperating(false);
                }}
                oncancel={() => {
                  setIsOpen(false);
                  setIsOperating(false);
                }}
                placement={undefined}
                activeTag={item}
              />
            ) : (
              content()
            )
          }
        >
          <div>
            <OperateIcon onClick={onSelect} />
          </div>
        </Popover>
      </div>
    </div>
  );
}

interface TlistProps {
  tagList: ITag[];
}

export function TagList({ tagList }: TlistProps) {
  const [isShowDelModal, setIsShowModal] = useState<boolean>(false);
  const [activeTag, setIsAvtiveTag] = useState<ITag>();
  const { _delTags } = useContext(tagContext);
  // const { setTagOpen } = useContext(tagOpenContext);

  return (
    <>
      {tagList.map(item => (
        <TagItem
          onDelete={() => {
            setIsShowModal(true);
            // setTagOpen(false);
          }}
          onSelect={() => {
            setIsAvtiveTag(item);
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
