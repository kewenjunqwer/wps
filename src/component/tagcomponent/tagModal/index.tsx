import { useState, Ref, useEffect } from 'react';
import styles from './style.module.scss';
import { Button, Input, InputRef } from 'antd';
import { ReactComponent as CheckIcon } from '../../../assets/form/checked.svg';
import { TagColorList } from '../tagcolor';

interface Props {
  oncancel?: () => void; // 取消按钮执行的函数
  defaultInputValue?: string; // 初始input框的值
  onOk?: () => void; // 确定按钮执行的函数
  disabledBtn?: boolean; //是否禁用确定按钮
  onchange?: (value: string) => void; //输入框变化执行的hi掉
  ref?: Ref<InputRef> | undefined;
  selectColorChange: (color: string) => void; // 选择颜色变化执行的回调
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
  const [activeColor, setActiveColor] = useState<string>(bgColors[0]);
  useEffect(() => {
    props.selectColorChange(activeColor);
  }, [activeColor, props]);

  return (
    <div className={styles['tag-create']}>
      <div>
        <div className={styles.title}>标签名称</div>
        <div className={styles['input-wrap']}>
          <Input
            ref={props.ref}
            defaultValue={props?.defaultInputValue}
            onChange={e => {
              props.onchange && props.onchange(e.target.value);
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
          onClick={props.onOk}
          style={{ marginLeft: 8 }}
          className={props.disabledBtn ? styles['btn-confirm'] : ''}
          type="primary"
          disabled={props.disabledBtn}
        >
          确认
        </Button>
      </div>
    </div>
  );
}
