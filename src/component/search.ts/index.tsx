import { Input, InputRef, List, Popover, Spin } from 'antd';
import { useCallback, useRef, useState } from 'react';
import styles from './style.module.scss';
import { debounce } from 'lodash';
import { useSearchForm } from '../../hooks/useSearchFroms';
import Empty from '../empty';
import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';
import { ReactComponent as SearchIcon } from '../../assets/header/search.svg';
import { formatTimeRelative, highlightKeywordsArray } from '../../util';
import { FormState } from '../../modal/form';

export default function SearchForm() {
  const { froms, _searchForms, isloading, loadMoreSearchForm, hasMore } = useSearchForm();
  const [searchContentOpen, setSearchContentOpen] = useState<boolean>(false);
  const intuRef = useRef<InputRef | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(
    debounce((value: string) => {
      if (intuRef.current) {
        _searchForms(value);
      }
    }, 300),
    []
  );

  const ref = useRef<HTMLDivElement>(null);
  // 加载更多
  const handleSscroll = () => {
    if (ref.current) {
      const CONTAINER_VIEW_HEIGHT = ref.current.clientHeight; // 滚动容器高度
      const contentScrollTop = ref.current.scrollTop;
      const scrollHeight = ref.current.scrollHeight;
      if (contentScrollTop + CONTAINER_VIEW_HEIGHT >= scrollHeight && hasMore) {
        loadMoreSearchForm(intuRef.current?.input?.value as string);
      }
    }
  };
  return (
    <Popover
      destroyTooltipOnHide={true}
      open={searchContentOpen}
      className={styles._rfcsf}
      placement="bottom"
      arrow={false}
      rootClassName={styles['search-content-popover']}
      content={
        <div className={styles['serch-wrap']}>
          <div
            className={styles.box}
            id="scrollableDiv1"
            style={{
              height: 200,
              overflow: 'auto',
            }}
            onScroll={handleSscroll}
            ref={ref}
          >
            <Spin
              wrapperClassName={styles.spin}
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              spinning={isloading}
            >
              {froms.length > 0 && (
                <List
                  dataSource={froms}
                  renderItem={item => (
                    <div
                      onClick={() => {
                        if (item.type === FormState.DRAFT) {
                          window.open(
                            `https://f.wps.cn/ksform/m/create/${item.item_id}?entrance=index_v3_continue#routePromt`
                          );
                        } else {
                          window.open(`https://f.wps.cn/ksform/m/result/${item.item_id}`);
                        }
                      }}
                      className={classNames(styles['text-hover'], styles._rsbc, styles.item)}
                    >
                      <div>
                        {highlightKeywordsArray(item.title, [
                          intuRef.current?.input?.value as string,
                        ]).map(item => {
                          if (item.highlight) {
                            return (
                              <span className={styles.highlight}>
                                {intuRef.current?.input?.value}
                              </span>
                            );
                          } else {
                            return <span>{item.data}</span>;
                          }
                        })}
                      </div>
                      <div className={styles.tip}>{formatTimeRelative(item.create_ts)} 发布</div>
                    </div>
                  )}
                ></List>
              )}
              {!isloading && froms.length === 0 && (
                <Empty imgUrl="/images/empty-search.png" title="暂无搜索结果"></Empty>
              )}
            </Spin>
          </div>
        </div>
      }
    >
      <Input
        allowClear={true}
        onChange={e => {
          if (!e.target.value) {
            setSearchContentOpen(false);
            return;
          }
          setSearchContentOpen(true);
          handleChange(e.target.value as string);
        }}
        ref={intuRef}
        placeholder="搜索表单"
        prefix={<SearchIcon style={{ color: '#0a6cff' }}></SearchIcon>}
      />
    </Popover>
  );
}
