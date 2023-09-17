import { useContext } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';
import FormHeader from '../../formcomponent/formHeader';
import FormAttribute from '../../formcomponent/form_attribute_list';
import SelectForm from '../../formcomponent/form_attribute_list/formSelect';

import MyFillFormList from './myFillFormList';
import { fillFormContext } from '../../../context/myFillForm';

export default function MyFillForm() {
  const { myFillForms } = useContext(fillFormContext);

  console.log(myFillForms);
  // 我创建的泪飙头部相关属性操作
  const Nodes = [
    <SelectForm />,
    null,
    <div className={styles.title}>来源</div>,
    <div className={styles.title}>提交状态</div>,
    <div className={styles.title}>事件</div>,
  ];

  return (
    <>
      {/* 头部 */}
      <FormHeader title="我创建的"></FormHeader>
      <div className={classNames(styles['form-wrap'], styles._flex, styles.flex_colum)}>
        <div className={styles['ksapc-loading']}>
          <div className={styles['ant-spin-container']}>
            {
              myFillForms.length > 0 && <>
                {/* 头部列表属性 */}
                <FormAttribute Nodes={Nodes}></FormAttribute>
                {/* 我创建的列表项 */}
                <MyFillFormList forms={myFillForms} />
                {/* <div className={classNames(styles.list, styles._flex, styles._rfcsf)}></div> */}
              </>
            }

          </div>
        </div>
      </div>
    </>
  )
}
