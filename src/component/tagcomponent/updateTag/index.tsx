import { PropsWithChildren, useContext, useState } from 'react';
import TagModal from '../tagModal';
import { tagContext } from '../../../context/tag';
import { TooltipPlacement } from 'antd/es/tooltip';
import { Itag } from '../../../modal/tag';

interface Props {
  placement: TooltipPlacement | undefined;
  activeTag: Itag;
  onok?: () => void;
  oncancel?: () => void;
}

// 该组件修改一个tag
export default function UpdateTag(props: PropsWithChildren<Props>) {
  const [tagName, setTagName] = useState<string>('');
  const { _updateTag } = useContext(tagContext);
  const [selectColor, setSelectColor] = useState<string>('');
  return (
    <>
      <TagModal
        selectColorChange={(color: string) => {
          setSelectColor(color);
        }}
        onchange={(value: string) => {
          setTagName(value);
        }}
        disabledBtn={tagName === '' || tagName === props.activeTag.tag_name}
        oncancel={props?.oncancel}
        onOk={() => {
          _updateTag({
            color: selectColor,
            tag_name: tagName,
            tag_id: props.activeTag.tag_id,
          });
          props.onok && props.onok();
        }}
      ></TagModal>
    </>
  );
}
