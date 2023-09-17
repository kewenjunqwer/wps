import React, { useContext, useState } from 'react';

import { List, Modal } from 'antd';
import { MYFillItem } from '../../../../modal/form';
import { MyFillItem } from '../myFIllItem';
import { fillFormContext } from '../../../../context/myFillForm';

interface Props {
  forms: MYFillItem[];
}

export default function MyFillFormList(props: Props) {
  const [isShowdelModal, setIsShowDelModal] = useState<boolean>(false);
  const [operateForm, setOperateForm] = useState<MYFillItem>();
  const { _deleteMyFillForm } = useContext(fillFormContext);

  const formItemPopoverConfiguration = {
    ksform: {
      title: '表单',
      formItemSet: (item: MYFillItem) => [
        {
          draft: true,
          popoverContent: [
            {
              title: '移除',
              onclick: () => {
                setIsShowDelModal(true);
              },
            },
          ],
          btnOperate: {
            btnTitle: '继续填写',
            onclick: () => {
              window.open(`https://f.wps.cn/w/${item.share_id}`);
            },
          },
        },
        {
          draft: false,
          popoverContent: [
            {
              title: '移除',
              onclick: () => {
                setIsShowDelModal(true);
              },
            },
          ],
          btnOperate: {
            btnTitle: '查看填写',
            onclick: () => {
              window.open(`https://f.wps.cn/ksform/w/write-list/${item.share_id}`);
            },
          },
        },
      ],
    },
    form_v2: {
      title: '接龙',
      formItemSet: (item: MYFillItem) => [
        {
          draft: true,
          popoverContent: [
            {
              title: '移除',
              onclick: () => {
                setIsShowDelModal(true);
              },
            },
          ],
          btnOperate: {
            btnTitle: '继续填写',
            onclick: () => {
              window.open(`https://f.wps.cn/w/${item.share_id}`);
            },
          },
        },
        {
          draft: false,
          popoverContent: [
            {
              title: '移除',
              onclick: () => {
                setIsShowDelModal(true);
              },
            },
          ],
          btnOperate: {
            btnTitle: '查看填写',
            onclick: () => {
              window.open(`https://f.wps.cn/ksform/w/write-list/${item.share_id}`);
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <List dataSource={props.forms} renderItem={cur => <MyFillItem
        operateIconClick={(item: MYFillItem) => {
          setOperateForm(item);
        }}
        title={formItemPopoverConfiguration[cur.kind].title}
        formItemSet={formItemPopoverConfiguration[cur.kind]
          .formItemSet(cur)
          .find((ele: any) => ele.draft === cur.draft)}
        key={cur.share_id}
        item={cur}
      />} >

      </List>
      {/* {props.forms.map(cur => (
        
      ))} */}
      <Modal
        centered={true}
        destroyOnClose={true}
        okText={'确认删除'}
        onCancel={() => {
          setIsShowDelModal(false);
        }}
        onOk={() => {
          if (operateForm) {
            _deleteMyFillForm({ shareId: operateForm?.share_id as string, _t: Date.now() });
          }
          setIsShowDelModal(false);
        }}
        cancelText={'取消'}
        title={'移除填写入口'}
        open={isShowdelModal}
        okButtonProps={{ type: 'primary', danger: true }}
      >
        <div>{`「${operateForm?.title}」移除后，此表单填写入口将不在列表中展示`}</div>
      </Modal>
    </div>
  );
}
