import { Input, InputRef, Modal, Popover } from 'antd';
import { CollectState, IForm } from '../../../modal/form';
import { FormItem } from '../formItem';
import { useContext, useEffect, useRef, useState } from 'react';
import { formContext } from '../../../context/form';
import CreateTag, { FormPopoVerCreateTag } from '../createTag';
import ShareForm from '../shareForm';

interface IProps {
  forms: IForm[];
}
export function FormsList({ forms = [] }: IProps) {
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
              onclick: (e: { stopPropagation: () => void }) => {
                e.stopPropagation();
              },
              node: <FormPopoVerCreateTag></FormPopoVerCreateTag>,
            },
            {
              title: '打印表单',
              onclick: () => {},
            },
            {
              title: '模板分享',
              onclick: () => {},
              node: <ShareForm item={item}></ShareForm>,
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
              onclick: (e: { stopPropagation: () => void }) => {
                e.stopPropagation();
              },
              node: <FormPopoVerCreateTag></FormPopoVerCreateTag>,
            },
            {
              title: '打印表单',
              onclick: () => {},
            },
            {
              title: '模板分享',
              onclick: () => {},
              node: <ShareForm item={item}></ShareForm>,
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
              onclick: (e: { stopPropagation: () => void }) => {
                e.stopPropagation();
              },
              node: CreateTag,
            },
            {
              title: '打印表单',
              onclick: () => {},
            },
            {
              title: '模板分享',
              onclick: () => {},
              node: <ShareForm item={item}></ShareForm>,
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
              onclick: (e: { stopPropagation: () => void }) => {
                e.stopPropagation();
              },
              node: <FormPopoVerCreateTag></FormPopoVerCreateTag>,
            },
            {
              title: '打印接龙',
              onclick: () => {},
            },
            {
              title: '模板分享',
              onclick: () => {},
              node: <ShareForm item={item}></ShareForm>,
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
              onclick: (e: { stopPropagation: () => void }) => {
                e.stopPropagation();
              },
              node: <FormPopoVerCreateTag></FormPopoVerCreateTag>,
            },
            {
              title: '打印接龙',
              onclick: () => {},
            },
            {
              title: '模板分享',
              onclick: () => {},
              node: <ShareForm item={item}></ShareForm>,
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
              onclick: (e: { stopPropagation: () => void }) => {
                e.stopPropagation();
              },
              node: <FormPopoVerCreateTag></FormPopoVerCreateTag>,
            },
            {
              title: '打印接龙',
              onclick: () => {},
            },
            {
              title: '模板分享',
              onclick: () => {},
              node: <ShareForm item={item}></ShareForm>,
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

  const { _updateForm, _renameForm } = useContext(formContext);
  console.log('form', formName);

  const inputRef = useRef<InputRef | null>(null);

  return (
    <>
      {forms.map(cur => (
        <FormItem
          title={formItemPopoverConfiguration[cur.kind].title}
          formItemSet={formItemPopoverConfiguration[cur.kind]
            .formItemSet(cur)
            .find((ele: any) => ele.expire === cur.expire && ele.type === cur.type)}
          key={cur.item_id}
          item={cur}
        ></FormItem>
      ))}
      {/* 重命名 */}
      <Modal
        destroyOnClose={true}
        okText={'确定'}
        onCancel={() => {
          setIsShoWRename(false);
        }}
        onOk={() => {
          _renameForm(
            { name: formName, title: formName, _t: Date.now() },
            operateForm?.item_id as string
          );
          setIsShoWRename(false);
        }}
        cancelText={'取消'}
        title={'重命名'}
        open={isShoWRename}
        okButtonProps={{
          disabled: formName === operateForm?.title || formName === '' ? true : false,
        }}
      >
        <Input
          value={formName}
          ref={inputRef}
          defaultValue={operateForm?.title}
          onChange={e => {
            setFormName(e.target.value);
          }}
        ></Input>
      </Modal>
      {/* 是否修改当前表单 */}
      <Modal
        destroyOnClose={true}
        okText={'继续'}
        onCancel={() => {
          setIsShowModifyModal(false);
        }}
        onOk={() => {
          window.open(
            ` https://f.wps.cn/ksform/m/create/${operateForm?.item_id}?entrance=index_v3_modify#routePromt`
          );
          setIsShowModifyModal(false);
        }}
        cancelText={'取消'}
        title={'提示'}
        open={isShowModifyModal}
      >
        <div>{formName}</div>
        <div>
          {`此表单正在收集中，修改后，正在填写的用户将重新填写被修改过的题目，已经收集上来的数据不受影响，是否继续？`}
        </div>
      </Modal>
      {/*继续或者停止收集的modal框*/}
      <Modal
        destroyOnClose={true}
        okText={'确认'}
        onCancel={() => {
          setIsShowCollectModal(false);
        }}
        onOk={() => {
          const option = {
            setting: {
              baseSetting: { stopTime: operateForm?.expire === CollectState.COLLECT ? -1 : 0 },
            },
            _t: Date.now(),
          };
          _updateForm(option, operateForm?.item_id as string);
          setIsShowCollectModal(false);
        }}
        cancelText={'取消'}
        title={operateForm?.expire === CollectState.COLLECT ? '停止收集' : '继续收集'}
        open={isShowCollectModal}
      >
        <div>
          {operateForm?.expire === CollectState.COLLECT
            ? ' 停止收集后你的表单将无法填写，是否确认停止？'
            : '表单一开启，可邀请好友继续填写'}
        </div>
      </Modal>
    </>
  );
}
