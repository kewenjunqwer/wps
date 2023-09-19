import { Select } from 'antd';
import { ReactComponent as CheckIcon } from '../../../../assets/form/checked.svg';
import styles from './style.module.scss';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PopoverItemLink } from '../../popoverItemLink';
import { ReactComponent as ArrowUp } from '../../../../assets/form/arrow-up.svg';
import { ReactComponent as ArrowDown } from '../../../../assets/form/arrow-down.svg';
import { useState } from 'react';
import classNames from 'classnames';

export default function SelectForm() {
  const [searchParams] = useSearchParams();
  const sidebar = searchParams.get('sidebar');
  const scene = searchParams.get('scene') || 'all';
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selecetList = [
    {
      title: '全部类型',
      key: 'all',
    },
    {
      title: '表单',
      key: 'newform',
    },
  ];

  const renderformSelectDropdown = () => {
    return (
      <div className={styles['select-drop-wrap']}>
        {selecetList.map(item => (
          <PopoverItemLink
            key={item.key}
            linkItem={{
              title: item.title,
              onclick: () => {
                setIsOpen(false);
                navigate(`/?scene=${item.key}&sidebar=${sidebar}`);
              },
              Icon:
                scene === item.key ? (
                  <CheckIcon style={{ color: '#0a6cff' }}></CheckIcon>
                ) : undefined,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={styles.wrap}>
        <span className={!isOpen ? styles.text : classNames(styles.text, styles.active)}>
          {selecetList.find(item => item.key === scene)?.title || '全部类型'}
        </span>

        <Select
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          onBlur={() => {
            setIsOpen(false);
          }}
          open={isOpen}
          placement="bottomLeft"
          dropdownRender={renderformSelectDropdown}
          popupMatchSelectWidth={false}
          // onDropdownVisibleChange={open => setIsOpen(open)}
          className={styles.select}
          style={{ width: 30 }}
          size="large"
          suffixIcon={
            !isOpen ? (
              <ArrowDown className={styles.icon}></ArrowDown>
            ) : (
              <ArrowUp className={styles.icon}></ArrowUp>
            )
          }
          bordered={false}
          value={''}
        ></Select>
      </div>
    </>
  );
}
