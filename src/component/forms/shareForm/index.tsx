import { Button, Input, Popover, Spin } from 'antd';
import React, { useState } from 'react';
import { PopoverItemLink } from '../popoverItemLink';
import { IForm } from '../../../modal/form';
import styles from './style.module.scss';
interface Props {
  item: IForm;
}

import { LoadingOutlined } from '@ant-design/icons';
import { createShareForm } from '../../../server/formApi';

export default function ShareForm({ item }: Props) {
  const [shareId, setShareId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleMouseEnter = async () => {
    try {
      const { code, data } = await createShareForm({
        id: item.item_id,
        is_print: false,
        _t: Date.now(),
        kind: item.kind,
      });
      if (code === 0) {
        setShareId(data.share_Id);
        setIsLoading(false);
      }
    } catch (error) {
      // 错误处理
    }
  };

  const popoverContent = (
    <div className={styles.content}>
      <Spin spinning={isLoading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
        {!isLoading && (
          <div>
            <div className={styles.text}>将表单作为模板分享，好友可编辑问题并发布新的表单</div>
            <div style={{ display: 'flex', width: 368 }}>
              <Input size="large" value={`https://f.wps.cn/ksform/ts/${shareId}`} />
              <Button
                size="large"
                onClick={() => {
                  navigator.clipboard.writeText(`https://f.wps.cn/ksform/ts/${shareId}`);
                }}
                type="primary"
              >
                复制链接
              </Button>
            </div>
          </div>
        )}
      </Spin>
    </div>
  );

  return (
    <>
      <Popover arrow={false} trigger={'hover'} placement="left" content={popoverContent}>
        <div onClick={e => e.stopPropagation()} onMouseEnter={handleMouseEnter}>
          <PopoverItemLink linkItem={{ title: '模板分享' }}></PopoverItemLink>
        </div>
      </Popover>
    </>
  );
}
