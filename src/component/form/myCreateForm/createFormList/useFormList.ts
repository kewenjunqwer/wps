import { useContext, useEffect, useState } from 'react';
import { CollectState, IForm } from '../../../../modal/form';
import { formContext } from '../../../../context/form';

export function useFormList() {
  const { operateForm, _createDulicate } = useContext(formContext);
  const [isShoWRename, setIsShoWRename] = useState<boolean>(false);
  const [formName, setFormName] = useState<string>('');
  const [isShowModifyModal, setIsShowModifyModal] = useState<boolean>(false);
  const [isShowCollectModal, setIsShowCollectModal] = useState<boolean>(false);

  useEffect(() => {
    setFormName(operateForm?.title as string);
  }, [operateForm]);

  const formItemPopoverConfiguration = {
    // 表单的配置项
    ksform: {
      title: '表单',
      formItemSet: (item: IForm) => [
        {
          type: 'Release',
          expire: 0,
          popoverContent: [
            {
              title: '重命名',
              onclick: () => {
                setIsShoWRename(true);
              },
            },
            {
              title: '填写表单',
              onclick: () => {
                window.open(
                  `https://f.wps.cn/ksform/w/write/${item.share_id}?entrance=index_v3#routePromt`
                );
              },
            },
            {
              title: '修改表单',
              onclick: () => {
                if (item.expire === CollectState.COLLECT) {
                  setIsShowModifyModal(true);
                } else {
                  window.open(
                    ` https://f.wps.cn/ksform/m/create/${operateForm?.item_id}?entrance=index_v3_modify#routePromt`
                  );
                }
              },
            },
            {
              title: '创建副本',
              onclick: () => {
                _createDulicate({
                  args_str: [{ id: item.item_id, kind: item.kind }],
                  _t: Date.now(),
                });
              },
            },
            {
              title: '停止收集',
              onclick: () => {
                setIsShowCollectModal(true);
              },
            },
            {
              title: '设置',
              onclick: () => {
                window.open(
                  `https://f.wps.cn/ksform/m/setting/${item.item_id}?entrance=index_v3_modify`
                );
              },
            },
            {
              title: '添加标签',
              onclick: () => {},
              isPopover: true,
            },
            {
              title: '打印表单',
              onclick: () => {},
            },
            {
              title: '模板分享',
              onclick: () => {},
            },
            {
              title: '文件管理',
              onclick: () => {},
            },
          ],
          btnOperate: {
            btnTitle: '邀请填写',
            onclick: () => {
              window.open(
                `https://f.wps.cn/ksform/m/share/${item.item_id}?entrance=index_v3&position=index`
              );
            },
          },
        },
        {
          type: 'Release',
          expire: -1,
          popoverContent: [
            {
              title: '重命名',
              onclick: () => {
                setIsShoWRename(true);
              },
            },
            {
              title: '修改表单',
              onclick: () => {
                if (item.expire === CollectState.COLLECT) {
                  setIsShowModifyModal(true);
                } else {
                  window.open(
                    ` https://f.wps.cn/ksform/m/create/${operateForm?.item_id}?entrance=index_v3_modify#routePromt`
                  );
                }
              },
            },
            {
              title: '创建副本',
              onclick: () => {
                _createDulicate({
                  args_str: [{ id: item.item_id, kind: item.kind }],
                  _t: Date.now(),
                });
              },
            },
            {
              title: '继续收集',
              onclick: () => {
                setIsShowCollectModal(true);
              },
            },
            {
              title: '设置',
              onclick: () => {
                window.open(
                  `https://f.wps.cn/ksform/m/setting/${item.item_id}?entrance=index_v3_modify`
                );
              },
            },
            {
              title: '添加标签',
              onclick: () => {},
              isPopover: true,
            },
            {
              title: '打印表单',
              onclick: () => {},
            },
            {
              title: '模板分享',
              onclick: () => {},
            },
            {
              title: '文件管理',
              onclick: () => {},
            },
          ],
          btnOperate: {
            btnTitle: '查看结果',
            onclick: () => {
              window.open(`https://f.wps.cn/new-form-result?from=direct&id=${item.item_id}`);
            },
          },
        },
        {
          type: 'Draft',
          expire: 0,
          popoverContent: [
            {
              title: '重命名',
              onclick: () => {
                setIsShoWRename(true);
              },
            },

            {
              title: '创建副本',
              onclick: () => {
                _createDulicate({
                  args_str: [{ id: item.item_id, kind: item.kind }],
                  _t: Date.now(),
                });
              },
            },
            {
              title: '添加标签',
              onclick: () => {},
              isPopover: true,
            },
            {
              title: '打印表单',
              onclick: () => {},
            },
            {
              title: '模板分享',
              onclick: () => {},
            },
            {
              title: '文件管理',
              onclick: () => {},
            },
          ],
          btnOperate: {
            btnTitle: '继续编辑',
            onclick: () => {
              window.open(
                `https://f.wps.cn/new-form-create?from=direct&type=edit&id=${item.item_id}&entrance=index_v3_continue#data`
              );
            },
          },
        },
      ],
    },

    form_v2: {
      title: '接龙',
      formItemSet: (item: IForm) => [
        {
          type: 'Release',
          expire: 0,
          popoverContent: [
            {
              title: '重命名',
              onclick: () => {
                setIsShoWRename(true);
              },
            },
            {
              title: '填写接龙',
              onclick: () => {
                window.open(
                  `https://f.wps.cn/ksform/w/write/${item.share_id}?entrance=index_v3#routePromt`
                );
              },
            },
            {
              title: '修改接龙',
              onclick: () => {
                if (item.expire === CollectState.COLLECT) {
                  setIsShowModifyModal(true);
                } else {
                  window.open(
                    ` https://f.wps.cn/ksform/m/create/${operateForm?.item_id}?entrance=index_v3_modify#routePromt`
                  );
                }
              },
            },
            {
              title: '创建副本',
              onclick: () => {
                _createDulicate({
                  args_str: [{ id: item.item_id, kind: item.kind }],
                  _t: Date.now(),
                });
              },
            },
            {
              title: '停止收集',
              onclick: () => {
                setIsShowCollectModal(true);
              },
            },
            {
              title: '设置',
              onclick: () => {
                window.open(
                  `https://f.wps.cn/ksform/m/setting/${item.item_id}?entrance=index_v3_modify`
                );
              },
            },
            {
              title: '添加标签',
              onclick: () => {},
              isPopover: true,
            },
            {
              title: '打印接龙',
              onclick: () => {},
            },
            {
              title: '模板分享',
              onclick: () => {},
            },
            {
              title: '文件管理',
              onclick: () => {},
            },
          ],
          btnOperate: {
            btnTitle: '邀请填写',
            onclick: () => {
              window.open(
                `https://f.wps.cn/ksform/m/share/${item.item_id}?entrance=index_v3&position=index`
              );
            },
          },
        },
        {
          type: 'Release',
          expire: -1,
          popoverContent: [
            {
              title: '重命名',
              onclick: () => {
                setIsShoWRename(true);
              },
            },
            {
              title: '修改接龙',
              onclick: () => {
                if (item.expire === CollectState.COLLECT) {
                  setIsShowModifyModal(true);
                } else {
                  window.open(
                    ` https://f.wps.cn/ksform/m/create/${operateForm?.item_id}?entrance=index_v3_modify#routePromt`
                  );
                }
              },
            },
            {
              title: '创建副本',
              onclick: () => {
                _createDulicate({
                  args_str: [{ id: item.item_id, kind: item.kind }],
                  _t: Date.now(),
                });
              },
            },
            {
              title: '继续收集',
              onclick: () => {
                setIsShowCollectModal(true);
              },
            },
            {
              title: '设置',
              onclick: () => {
                window.open(
                  `https://f.wps.cn/ksform/m/setting/${item.item_id}?entrance=index_v3_modify`
                );
              },
            },
            {
              title: '添加标签',
              onclick: () => {},
              isPopover: true,
              popoverContent: () => {
                return;
              },
            },
            {
              title: '打印接龙',
              onclick: () => {},
            },
            {
              title: '模板分享',
              onclick: () => {},
            },
            {
              title: '文件管理',
              onclick: () => {},
            },
          ],
          btnOperate: {
            btnTitle: '查看结果',
            onclick: () => {
              window.open(`https://f.wps.cn/new-form-result?from=direct&id=${item.item_id}`);
            },
          },
        },
        {
          type: 'Draft',
          expire: 0,
          popoverContent: [
            {
              title: '重命名',
              onclick: () => {
                setIsShoWRename(true);
              },
            },

            {
              title: '创建副本',
              onclick: () => {
                _createDulicate({
                  args_str: [{ id: item.item_id, kind: item.kind }],
                  _t: Date.now(),
                });
              },
            },
            {
              title: '添加标签',
              onclick: () => {},
              isPopover: true,
            },
            {
              title: '打印接龙',
              onclick: () => {},
            },
            {
              title: '模板分享',
              onclick: () => {},
            },
            {
              title: '文件管理',
              onclick: () => {},
            },
          ],
          btnOperate: {
            btnTitle: '继续编辑',
            onclick: () => {
              window.open(
                `https://f.wps.cn/new-form-create?from=direct&type=edit&id=${item.item_id}&entrance=index_v3_continue#data`
              );
            },
          },
        },
      ],
    },
  };
  return {
    isShoWRename,
    setIsShoWRename,
    formName,
    setFormName,
    formItemPopoverConfiguration,
    operateForm,
    setIsShowModifyModal,
    isShowModifyModal,
    isShowCollectModal,
    setIsShowCollectModal,
  };
}
