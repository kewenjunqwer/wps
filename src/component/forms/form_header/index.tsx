import { useContext } from 'react';
import styles from './style.module.scss';
import { Checkbox, Popover, Select } from 'antd';

import { ReactComponent as CheckIcon } from '../../../assets/form/checked.svg';
import { ReactComponent as AddIcon } from '../../../assets/form/add.svg';
import classNames from 'classnames';
import { useFormHeader } from './useFormHeader';
import TAG_Popover from '../popover';
import { FomTitle } from '../../../modal/form';
import { formContext } from '../../../context/form';
import { tagContext } from '../../../context/tag';
import { TagList } from '../tag';
import TagModal from '../tagModal';
import { ReqTagCreate } from '../../../modal/tag';

enum StarType {
  ALL = 'ALL',
  STARED = 'stared',
}
export default function FormHeader() {
  const {
    formTypeSelectOpen,
    setFormTypeSelectOpen,
    formTypeoptions,
    starLinks,
    starType,
    formType,
    setFormType,
  } = useFormHeader();
  const { activeFormIds, selecAllForm, forms } = useContext(formContext);
  const { tags, _createTags } = useContext(tagContext);

  const renderformSelectDropdown = () => {
    return (
      <div className={styles['select-drop-wrap']}>
        <div className={styles.list}>
          {formTypeoptions.map((item, index) => (
            <div
              key={index.toString + item.label}
              onClick={() => {
                setFormType(item.type);
              }}
              className={styles.item}
            >
              <div className={styles.text}>{FomTitle[item.type]}</div>

              <div className={styles.icon}>
                {item.type === formType && (
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ksapc-select-dropdown-item-check"
                  >
                    <path
                      d="M6.43367 9.92139L12.6563 3.69873L13.5756 4.61797L6.43367 11.7599L1.9743 7.30051L2.89354 6.38127L6.43367 9.92139Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 头部各个标签的popover内容
  const popoverContent = {
    createTagContent: () => {
      return (
        <TagModal
          onOK={(option: ReqTagCreate) => {
            _createTags(option);
          }}
          oncancel={() => {}}
        />
      );
    },
    tagContent: () => {
      return (
        <div className={styles['tag-content']}>
          <div className={classNames(styles.top, styles['text-hover'])}>
            <span>显示全部</span>
            <CheckIcon className={styles['text-active']}></CheckIcon>
          </div>
          <div className={styles['gap-line']}></div>
          {/* 显示已创建的标签列表 */}
          <div>
            <TagList tagList={tags} />
          </div>

          <Popover
            trigger={'click'}
            arrow={false}
            placement="leftBottom"
            content={popoverContent.createTagContent()}
          >
            <div className={classNames(styles['top'], styles.bottom)}>
              <AddIcon className={classNames(styles['text-active'], styles['addIcon'])}></AddIcon>
              <span className={styles['text-active']}>新建标签</span>
            </div>
          </Popover>
        </div>
      );
    },
    starContent: () => {
      return (
        <div className={styles['star-content']}>
          {starLinks.map(item => (
            <div
              key={item.title}
              onClick={item.onclick}
              className={classNames(styles['item'], styles.flex_bt_center, styles['text-hover'])}
            >
              <span>{item.title}</span>
              {starType === item.type && <CheckIcon></CheckIcon>}
            </div>
          ))}
        </div>
      );
    },
  };

  return (
    <div className={styles['form-header']}>
      <div className={styles['form-header-list']}>
        <Checkbox
          checked={activeFormIds.length === forms.length}
          onChange={e => {
            selecAllForm(e.target.checked);
          }}
          style={{ display: activeFormIds.length > 0 ? 'block' : 'none' }}
        />
        <div className={styles['wrap']}>
          <div className={styles.left}>
            <div className={classNames(styles['left-1'])}>
              <div className={styles['select-wrap']}>
                <Select
                  // suffixIcon={}
                  open={formTypeSelectOpen}
                  onClick={() => {
                    setFormTypeSelectOpen(!formTypeSelectOpen);
                  }}
                  placement="topLeft"
                  dropdownRender={renderformSelectDropdown}
                  className={styles.select}
                  style={{ width: 100 }}
                  size="large"
                  bordered={false}
                  value={FomTitle[formType]}
                ></Select>
              </div>
            </div>
            <div className={classNames(styles['item-wrap'], styles['left-2'])}>
              <TAG_Popover content={popoverContent.tagContent()} title={'标签'}></TAG_Popover>
            </div>
            <div className={classNames(styles['item-wrap'], styles['left-3'])}>
              <div className={styles.title}>收集状态</div>
            </div>
            <div className={classNames(styles['item-wrap'], styles['left-4'])}>
              <div className={styles.title}>时间</div>
            </div>
            <div className={classNames(styles['item-wrap'], styles['left-5'])}>
              <TAG_Popover
                content={popoverContent.starContent()}
                title={starType === StarType.ALL ? '星标' : '仅显示星标'}
              ></TAG_Popover>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      </div>
    </div>
  );
}
