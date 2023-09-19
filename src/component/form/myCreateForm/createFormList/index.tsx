import { Input, InputRef, List, Modal } from 'antd';
import { CollectState, FormState, IForm } from '../../../../modal/form';
import { FormItem } from '../createFormItem';
import { useContext, useEffect, useRef, useState } from 'react';
import { formContext } from '../../../../context/form';
import ShareForm from '../../../formcomponent/shareForm';
import { FormPopoVerCreateTag } from '../../../formcomponent/formPopoVerCreateTag';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './style.module.scss';
import { tagContext } from '../../../../context/tag';

interface IProps {
  forms: IForm[];
}
export function FormsList({ forms = [] }: IProps) {
  const { _createDulicate, printForm, _deleteForm, hasMore, loadMore } = useContext(formContext);

  const { selectTags } = useContext(tagContext);
  const [isShoWRename, setIsShoWRename] = useState<boolean>(false);
  const [formName, setFormName] = useState<string>('');
  const [isShowModifyModal, setIsShowModifyModal] = useState<boolean>(false);
  const [isShowCollectModal, setIsShowCollectModal] = useState<boolean>(false);
  const [isShowDelModal, setIsShowDelModal] = useState<boolean>(false);
  const [operateForm, setOperateForm] = useState<IForm>();

  useEffect(() => {
    setFormName(operateForm?.title as string);
  }, [operateForm]);

  // 配置所有不同表单的弹出操作项
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
              node: <FormPopoVerCreateTag key={item.item_id} form={item} />,
            },
            {
              title: '打印表单',
              onclick: () => {
                console.log('333333');
                printForm({ id: item.item_id, is_print: false, _t: Date.now(), kind: item.kind });
              },
            },
            {
              title: '模板分享',
              onclick: () => {},
              node: <ShareForm key={item.item_id} item={item}></ShareForm>,
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
              node: <FormPopoVerCreateTag key={item.item_id} form={item} />,
            },
            {
              title: '打印表单',
              onclick: () => {
                console.log('333333');
                printForm({ id: item.item_id, is_print: false, _t: Date.now(), kind: item.kind });
              },
            },
            {
              title: '模板分享',
              onclick: () => {},
              node: <ShareForm key={item.item_id} item={item}></ShareForm>,
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
              node: <FormPopoVerCreateTag key={item.item_id} form={item} />,
            },
            {
              title: '打印表单',
              onclick: () => {
                console.log('333333');
                printForm({ id: item.item_id, is_print: false, _t: Date.now(), kind: item.kind });
              },
            },
            {
              title: '模板分享',
              onclick: () => {},
              node: <ShareForm key={item.item_id} item={item}></ShareForm>,
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
              node: <FormPopoVerCreateTag key={item.item_id} form={item} />,
            },
            {
              title: '打印接龙',
              onclick: () => {
                console.log('333333');
                printForm({ id: item.item_id, is_print: false, _t: Date.now(), kind: item.kind });
              },
            },
            {
              title: '模板分享',
              onclick: () => {},
              node: <ShareForm key={item.item_id} item={item}></ShareForm>,
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
              node: <FormPopoVerCreateTag key={item.item_id} form={item} />,
            },
            {
              title: '打印接龙',
              onclick: () => {
                printForm({ id: item.item_id, is_print: false, _t: Date.now(), kind: item.kind });
              },
            },
            {
              title: '模板分享',
              onclick: () => {
                printForm({ id: item.item_id, is_print: false, _t: Date.now(), kind: item.kind });
              },
              node: <ShareForm key={item.item_id} item={item}></ShareForm>,
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
              node: <FormPopoVerCreateTag form={item} />,
            },
            {
              title: '打印接龙',
              onclick: () => {
                printForm({ id: item.item_id, is_print: false, _t: Date.now(), kind: item.kind });
              },
            },
            {
              title: '模板分享',
              onclick: () => {},
              node: <ShareForm key={item.item_id} item={item}></ShareForm>,
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
  const inputRef = useRef<InputRef | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={ref}
        className={styles.box}
        id="scrollableDiv"
        style={{
          height: 'calc(100vh - 356px)',
          overflowY: 'auto',
        }}
      >
        <InfiniteScroll
          dataLength={forms.length}
          next={() => {
            loadMore(selectTags);
          }}
          hasMore={hasMore}
          loader={<div></div>}
          scrollableTarget="scrollableDiv"
          scrollThreshold={0.8}
        >
          <List
            dataSource={forms}
            rowKey={'item_id'}
            renderItem={cur => (
              <li key={cur.item_id}>
                <FormItem
                  ondelete={() => {
                    setIsShowDelModal(true);
                  }}
                  operateIconClick={(item: IForm) => {
                    setOperateForm(item);
                  }}
                  title={formItemPopoverConfiguration[cur.kind].title}
                  formItemSet={formItemPopoverConfiguration[cur.kind]
                    .formItemSet(cur)
                    .find((ele: any) => ele.expire === cur.expire && ele.type === cur.type)}
                  item={cur}
                ></FormItem>
              </li>
            )}
          ></List>
        </InfiniteScroll>
      </div>

      {/* 重命名 */}
      <Modal
        centered={true}
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
        centered={true}
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
        centered={true}
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
      {/*       
      删除弹出框 */}
      <Modal
        centered={true}
        destroyOnClose={true}
        okText={'确认删除'}
        onCancel={() => {
          setIsShowDelModal(false);
        }}
        onOk={() => {
          if (operateForm) {
            _deleteForm({
              args_str: [{ id: operateForm?.item_id, kind: operateForm?.kind }],
              _t: Date.now(),
            });
          }
          setIsShowDelModal(false);
        }}
        cancelText={'取消'}
        title={operateForm?.type === FormState.DRAFT ? '删除草稿' : '删除表单'}
        open={isShowDelModal}
        okButtonProps={{ type: 'primary', danger: true }}
      >
        <div>
          {operateForm?.type === FormState.DRAFT
            ? `【${operateForm.title}】, 删除后，可通过【回收站】找回`
            : '删除后，可通过【回收站】找回'}
        </div>
      </Modal>
    </>
  );
}
