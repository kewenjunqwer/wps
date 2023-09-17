import { useContext, useState } from 'react';
import { tagContext } from '../../../context/tag';
import styles from './style.module.scss';
import CreateTag from '../../tagcomponent/createTag';
import { PopoverItemLink } from '../popoverItemLink';
import { ReactComponent as AddIcon } from '../../../assets/form/add.svg';
import { ReactComponent as ArrowRigthIcon } from '../../../assets/form/add.svg';
import { Popover } from 'antd';
import classNames from 'classnames';
import { formContext } from '../../../context/form';
import { FormKinds, IForm } from '../../../modal/form';

// 右侧弹出创建tag标签的选项

interface Props {
  form: IForm

}

export function FormPopoVerCreateTag({ form }: Props) {
  const { tags } = useContext(tagContext);
  const [isOpen, setIsopen] = useState<boolean>(false);
  const { _createTagToForm } = useContext(formContext)

  const content = (
    <div
      onClick={e => {
        e.stopPropagation();
      }}
      style={{ width: 200, padding: 12 }}
    >
      {
        form.tag_ids && <PopoverItemLink linkItem={{ title: "取消标签", onclick: () => { } }}></PopoverItemLink>
      }
      {/* 标签列表和给form新增或修改一个标签 */}
      {tags.map(item => (
        <div className={classNames(styles.item, styles['text-hover'])}>
          <PopoverItemLink linkItem={{
            onclick: () => { _createTagToForm({ item_id: form.item_id, tag_id: item.tag_id, kind: form.kind, _t: Date.now() }) },
            style: { justifyContent: 'flex-start' },
            suffix: <div style={{ backgroundColor: item.color }} className={styles.banner}></div>,
            title: item.tag_name
          }}></PopoverItemLink>

        </div>
      ))}
      {
        <CreateTag
          oncancel={() => {
            setIsopen(false);
          }}
          onclick={() => {
            setIsopen(true);
          }}
          placement="left"
        >
          <PopoverItemLink linkItem={{ title: '新建标签', suffix: <AddIcon /> }}></PopoverItemLink>
        </CreateTag>
      }
    </div>
  );

  return (
    <Popover
      open={isOpen}
      onOpenChange={open => setIsopen(open)}
      arrow={false}
      placement="left"
      content={content}
      trigger="hover"
      destroyTooltipOnHide={true}
    >
      <div
        onMouseEnter={() => {
          setIsopen(true);
        }}
        onClick={e => e.stopPropagation()}
      >
        <PopoverItemLink linkItem={form.tag_ids ? { title: "修改标签" } : { title: '添加标签', Icon: ArrowRigthIcon }}></PopoverItemLink>
      </div>
    </Popover>
  );
}
