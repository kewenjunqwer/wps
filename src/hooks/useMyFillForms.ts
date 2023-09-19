import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormKinds, MYFillItem, ReqGetForm } from '../modal/form';
import { delMyfillForm, getFormMyFill } from '../server/formApi';
import { useSearchParams } from 'react-router-dom';
import { message } from 'antd';

type Iscene = 'newform' | 'exam' | 'form_v2_vote' | 'all';
const sceneRealatedkind = {
  newform: ['form_v2', 'form', 'ksform'],
  exam: ['exam'],
  form_v2_vote: ['form_v3_vote', 'form_v2_vote'],
  all: [],
};

export function useMyfillForms() {
  const [myFillForms, setMyFillForms] = useState<MYFillItem[]>([]);
  const [error, setError] = useState<string>('');
  const [isloading, setIsLoading] = useState<boolean>(true);
  // 开始获取数据
  const [start, setStart] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const [hasMore, setHasMore] = useState<boolean>(true); //是否有更多数据

  const limit = 12; // 每次加载得条数

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const curFormKind = useMemo(() => {
    const scene = searchParams.get('scene') as Iscene;
    // 可继续进行配置
    if (scene) {
      return sceneRealatedkind[scene];
    } else {
      return [];
    }
  }, [searchParams]);

  // 获取我填写的表单数据

  const _getFormMyFill = useCallback(async (options: ReqGetForm) => {
    setIsLoading(true);
    try {
      const { result, code, data } = await getFormMyFill(options);
      setIsLoading(false);
      if (code === 0) {
        return data;
      } else {
        setError(result);
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 删除我填写的数据
  const _deleteMyFillForm = useCallback(
    async (option: { shareId: string; _t: number }) => {
      const newForm = myFillForms?.filter(cur => cur.share_id !== option.shareId);
      setMyFillForms(newForm);
      try {
        delMyfillForm(option);
      } catch (error) {
        console.log(error);
      }
    },
    [myFillForms]
  );
  //  // 初始化获取数据
  const getForms = useCallback(async () => {
    const option = {
      limit,
      start: 0,
      kind: curFormKind as FormKinds[],
      _t: Date.now(),
    };
    const data = await _getFormMyFill(option);
    setMyFillForms(data as MYFillItem[]);
  }, [_getFormMyFill, curFormKind]);

  // 加载更多
  const loadMore = useCallback(async () => {
    const curStart = start + myFillForms.length;
    const data = await _getFormMyFill({
      start: curStart,
      kind: curFormKind as FormKinds[],
      limit,
      _t: Date.now(),
    });
    // 如果获取的个数小于limit则hasMor为false
    data && data?.length < limit && setHasMore(false);
    data && data.length > 0 && setMyFillForms(myFillForms.concat(data));
    setStart(curStart);
  }, [_getFormMyFill, curFormKind, myFillForms, start]);

  useEffect(() => {
    getForms();
  }, [getForms]);
  return {
    myFillForms,
    isloading,
    _deleteMyFillForm,
    _getFormMyFill,
    hasMore,
    loadMore,
    getForms,
  };
}
