import { message } from 'antd';
import { serchForm } from '../server/serchApi';
import { useCallback, useEffect, useState } from 'react';
import { IForm } from '../modal/form';

export function useSearchForm() {
  const [froms, setForms] = useState<IForm[]>([]);
  const [error, setError] = useState<string>('');
  const [isloading, setIsloading] = useState<boolean>(true);
  const [start, setStart] = useState<number>(0); // 从那条数据开始加载
  const [hasMore, setHasMore] = useState<boolean>(true); //是否有更多数据

  const limit = 10; // 每次加载得条数

  useEffect(() => {
    if (error) {
      message.error(error);
      setError('');
    }
  }, [error]);

  // 初始搜索数据
  const _searchForms = useCallback(
    async (keyword: string) => {
      setIsloading(true);
      try {
        const { code, data, result } = await serchForm({ limit, start, keyword, _t: Date.now() });
        setIsloading(false);
        if (code === 0) {
          setForms(data);
        } else {
          setError(result);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [start]
  );

  // 加载更多
  const loadMoreSearchForm = useCallback(
    async (keyword: string) => {
      const curStart = limit + froms.length;
      const { data, code, result } = await serchForm({
        start: curStart,
        limit,
        keyword,
        _t: Date.now(),
      });
      if (code === 0) {
        setForms(froms.concat(data));
        setStart(curStart);
        if (data.length < limit) {
          setHasMore(false);
        }
      } else {
        setError(result);
      }
    },
    [froms]
  );

  return {
    froms,
    _searchForms,
    isloading,
    hasMore,
    loadMoreSearchForm,
  };
}
