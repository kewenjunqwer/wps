import { useContext, useState } from 'react';
import styles from '../../style.module.scss';

import { List, Modal } from 'antd';
import { MYFillItem } from '../../../../modal/form';
import { MyFillItem } from '../myFIllItem';
import { fillFormContext } from '../../../../context/myFillForm';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  forms: MYFillItem[];
}

export default function MyFillFormList(props: Props) {
  const [isShowdelModal, setIsShowDelModal] = useState<boolean>(false);
  const [operateForm, setOperateForm] = useState<MYFillItem>();
  const { _deleteMyFillForm, hasMore, loadMore } = useContext(fillFormContext);

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
    <>
      <div
        className={styles.box}
        id="scrollableDiv2"
        style={{
          height: 'calc(100vh - 356px)',
          overflowY: 'auto',
        }}
      >
        <InfiniteScroll
          dataLength={MyFillFormList.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<div></div>}
          scrollableTarget="scrollableDiv2"
          scrollThreshold={0.5}
        >
          <List
            dataSource={props.forms}
            rowKey={'share_id'}
            renderItem={cur => (
              <li>
                <MyFillItem
                  operateIconClick={(item: MYFillItem) => {
                    setOperateForm(item);
                  }}
                  title={formItemPopoverConfiguration[cur.kind].title}
                  formItemSet={formItemPopoverConfiguration[cur.kind]
                    .formItemSet(cur)
                    .find((ele: any) => ele.draft === cur.draft)}
                  key={cur.share_id}
                  item={cur}
                />
              </li>
            )}
          ></List>
        </InfiniteScroll>
      </div>

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
    </>
  );
}
