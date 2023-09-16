import { Select } from 'antd';
import { ReactComponent as CheckIcon } from '../../../../assets/form/checked.svg';
import styles from '../style.module.scss';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PopoverItemLink } from '../../popoverItemLink';
import { ReactComponent as ArrowUp } from '../../../../assets/form/arrow-up.svg';
import { ReactComponent as ArrowDown } from '../../../../assets/form/arrow-down.svg';
import { useState } from 'react';

export default function SelectForm() {
  const [searchParams, _] = useSearchParams();
  const sidebar = searchParams.get('sidebar');
  const scene = searchParams.get('scene');
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
            linkItem={{
              title: item.title,
              onclick: () => {
                setIsOpen(false);
                navigate(`/?scene=${item.key}&sidebar=${sidebar}`);
              },
              Icon: scene === item.key ? CheckIcon : undefined,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Select
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        open={isOpen}
        placement="bottomLeft"
        dropdownRender={renderformSelectDropdown}
        className={styles.select}
        style={{ width: 120 }}
        size="large"
        suffixIcon={!isOpen ? <ArrowDown></ArrowDown> : <ArrowUp></ArrowUp>}
        bordered={false}
        value={selecetList.find(item => item.key === scene)?.title || '全部类型'}
      >
        232432434
      </Select>
    </>
  );
}
