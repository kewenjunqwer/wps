import { PropsWithChildren, useContext, useLayoutEffect, useState } from 'react';
import TagModal from '../tagModal';
import { tagContext } from '../../../context/tag';
import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { PopoverItemLink } from '../../formcomponent/popoverItemLink';
import { ReactComponent as AddIcon } from '../../../assets/form/add.svg';
import styles from './style.module.scss';

interface Props {
  placement: TooltipPlacement | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger?: any | undefined;
  onclick?: () => void;
  oncancel?: () => void;
  isActiveHighlighted?: boolean; //点击之后是否高亮
}

// 该组件用于创建一个tag
export default function CreateTag(props: PropsWithChildren<Props>) {
  const [tagName, setTagName] = useState<string>('');
  const { _createTags } = useContext(tagContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectColor, setSelectColor] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (props.isActiveHighlighted) {
      if (!isOpen) {
        setIsActive(false);
      }
    }
  }, [isOpen, props.isActiveHighlighted]);
  return (
    <>
      <Popover
        destroyTooltipOnHide={true}
        arrow={false}
        open={isOpen}
        trigger={props.trigger ? props.trigger : 'click'}
        onOpenChange={open => setIsOpen(open)}
        content={
          <TagModal
            selectColorChange={(color: string) => {
              setSelectColor(color);
            }}
            onchange={(value: string) => {
              setTagName(value);
            }}
            disabledBtn={tagName === '' ? true : false}
            oncancel={() => {
              setIsOpen(false);
              props.oncancel && props.oncancel();
            }}
            onOk={() => {
              _createTags({
                color: selectColor,
                tag_name: tagName,
                _t: Date.now(),
              });
              setIsOpen(false);
              props.onclick && props.onclick();
            }}
          ></TagModal>
        }
        placement={props.placement}
      >
        <div
          onClick={() => {
            if (props.isActiveHighlighted) {
              setIsActive(!isActive);
            }
          }}
        >
          <div className={isActive ? styles.isActive : styles.default}>
            <PopoverItemLink
              linkItem={{
                style: { justifyContent: 'flex-start' },
                title: '新建标签',
                suffix: <AddIcon />,
              }}
            />
          </div>
        </div>
      </Popover>
    </>
  );
}
