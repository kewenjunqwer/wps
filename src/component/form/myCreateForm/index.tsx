import { useCallback, useContext, useMemo, useState } from 'react';
import styles from './style.module.scss';
import Empty from '../../empty';
import classNames from 'classnames';
import FormHeader from '../../formcomponent/formHeader';
import { FormsList } from './createFormList';
import FormAttribute from '../../formcomponent/form_attribute_list';
import { formContext } from '../../../context/form';
import { Button, Checkbox, Spin } from 'antd';
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import SelectForm from '../../formcomponent/form_attribute_list/formSelect';
import TagPopover from '../../formcomponent/form_attribute_list/tagPopover';
import StarPopover from '../../formcomponent/form_attribute_list/starPopover';

export default function MyCreateForm() {
  const {
    forms,
    _starForm,
    latestActiveForm,
    activeFormIds,
    _createDulicate,
    setActiveFormIds,
    _deleteForm,
    selecAllForm,
    isloading,
  } = useContext(formContext);

  const [isShowDelModal, setIsShowModal] = useState<boolean>(false);

  const rightOperates = useMemo(() => {
    return [
      {
        title: latestActiveForm?.star ? '取消星标' : '星标',
        iconHref: '/images/formOperate/star.svg',
        onclick: () => {
          _starForm({
            ids: activeFormIds?.map(item => item.id) as string[],
            _t: Date.now(),
            star: !latestActiveForm?.star,
          });
        },
      },
      {
        title: '创建副本',
        iconHref: '/images/formOperate/create.svg',
        onclick: () => {
          _createDulicate({ args_str: activeFormIds, _t: Date.now() });
        },
      },
      {
        title: '删除',
        iconHref: '/images/formOperate/delete.svg',
        onclick: () => {
          setIsShowModal(true);
        },
      },
    ];
  }, [_createDulicate, _starForm, activeFormIds, latestActiveForm?.star, setIsShowModal]);

  const delModalContent = useCallback(() => {
    if (activeFormIds.length === 1) {
      return <div>{`【${latestActiveForm?.title}】, 删除后，可通过【回收站】找回`}</div>;
    }
    if (activeFormIds.length > 1) {
      return <div>删除后将无法填写表单和查看表单填写记录，已删除表单可通过【回收站】找回</div>;
    }
  }, [activeFormIds.length, latestActiveForm?.title]);

  // 我创建的泪飙头部相关属性操作
  const Nodes = [
    <SelectForm />,
    <TagPopover />,
    <div className={styles.title}>收集状态</div>,
    <div className={styles.title}>时间</div>,
    <StarPopover />,
  ];

  return (
    <>
      {/* 头部 */}
      <FormHeader title="我创建的">
        {activeFormIds.length > 0 && (
          <div className={styles['operate-wrap']}>
            {rightOperates.map(item => (
              <div className={styles.item} onClick={item.onclick}>
                <img className={styles.img} src={item.iconHref} />
                {item.title}
              </div>
            ))}
            <div className={styles['gap-line']}></div>
            <div
              onClick={() => {
                setActiveFormIds([]);
              }}
              className={classNames(styles['item'], styles['complete'])}
            >
              完成
            </div>
          </div>
        )}
      </FormHeader>
      <Spin spinning={isloading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
        <div className={classNames(styles['form-wrap'], styles._flex, styles.flex_colum)}>
          {/* {!isloading && forms.length === 0 && (
              <div className={styles.empty}>
                <Empty
                  title={'暂无创建内容'}
                  imgUrl={'/images/empty.png'}
                  footer={
                    <Button
                      type="primary"
                      onClick={() => {
                        window.open('https://f.wps.cn/forms/templates?from=list&entrance=index_v3');
                      }}
                    >
                      新建表单
                    </Button>
                  }
                ></Empty>
              </div>
            )} */}
          {forms.length > 0 && (
            <div className={styles.form_list}>
              {/* 头部列表属性 */}
              <FormAttribute
                suffix={
                  activeFormIds?.length > 0 ? (
                    <Checkbox
                      checked={activeFormIds.length === forms.length}
                      onChange={e => {
                        selecAllForm(e.target.checked);
                      }}
                      className={styles.checkbox}
                    />
                  ) : null
                }
                Nodes={Nodes}
              ></FormAttribute>
              {/* 我创建的列表项 */}
              <FormsList forms={forms} />
            </div>
          )}

          <div className={classNames(styles.list, styles._flex, styles._rfcsf)}></div>
        </div>
      </Spin>
      <Modal
        centered={true}
        wrapClassName={styles.delModal}
        okText={'确认删除'}
        title="删除表单"
        open={isShowDelModal}
        cancelText={'取消'}
        onOk={() => {
          _deleteForm({ args_str: activeFormIds, _t: Date.now() });
        }}
        onCancel={() => {
          setIsShowModal(false);
        }}
      >
        {delModalContent()}
      </Modal>
    </>
  );
}
