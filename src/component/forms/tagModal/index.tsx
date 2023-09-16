import { useState, useContext } from 'react';
import styles from './style.module.scss';
import { Button, Input } from 'antd';
import { TagColorList } from '../tagsquare';
import { ReactComponent as CheckIcon } from '../../../assets/form/checked.svg';
import { Itag } from '../../../modal/tag';
import { tagContext } from '../../../context/tag';

interface Props {
  oncancel?: () => void;
  activeTag?: Itag;
  isUpdate?: boolean;
  onOk?: () => void;
}

// tag标签颜色列表
const bgColors = [
  'rgb(143, 192, 255)',
  'rgb(253, 160, 160)',
  'rgb(255, 184, 155)',
  'rgb(252, 214, 137)',
  'rgb(165, 220, 137)',
  'rgb(119, 217, 184)',
  'rgb(165, 172, 255)',
  'rgb(205, 178, 255)',
  'rgb(255, 167, 211)',
  'rgb(208, 213, 219)',
];

export default function TagModal(props: Props) {
  const { _createTags, _updateTag } = useContext(tagContext);
  const [tagName, setTagName] = useState<string>(
    props?.isUpdate ? (props.activeTag?.tag_name as string) : ''
  );
  const [activeColor, setActiveColor] = useState<string>(bgColors[0]);

  const handleOk = () => {
    () => {
      const option = {
        tag_name: tagName,
        _t: Date.now(),
        color: activeColor,
        tag_id: props.activeTag?.tag_id as string,
      };
      if (props.isUpdate) {
        _updateTag(option);
      } else {
        _createTags(option);
      }
    };
    props.onOk && props.onOk();
  };

  return (
    <div className={styles['tag-create']}>
      <div>
        <div className={styles.title}>标签名称</div>
        <div className={styles['input-wrap']}>
          <Input
            value={tagName}
            onChange={e => {
              setTagName(e.target.value);
            }}
          />
        </div>
        <div className={styles.title}>颜色</div>
        <TagColorList
          onclick={(color: string) => {
            setActiveColor(color);
          }}
          activeColor={activeColor}
          baColors={bgColors}
          Icon={CheckIcon}
        ></TagColorList>
      </div>
      <div className={styles.footer}>
        <Button onClick={props?.oncancel}>取消</Button>
        <Button
          onClick={handleOk}
          style={{ marginLeft: 8 }}
          className={!tagName ? styles['btn-confirm'] : ''}
          type="primary"
        >
          确认
        </Button>
      </div>
    </div>
  );
}
