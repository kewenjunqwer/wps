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
  const [searchParams, _] = useSearchParams();

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
        setMyFillForms(data);
      } else {
        setError(result);
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
  // 获取数据
  const getForms = useCallback(() => {
    const sidebar = searchParams.get('sidebar');
    console.log(sidebar);
    // 如果根据标签获取数据
    {
      const option = {
        limit: 10,
        start: 0,
        kind: curFormKind as FormKinds[],
        _t: Date.now(),
      };
      if (sidebar === 'mywrite') {
        _getFormMyFill(option);
      }
    }
  }, [_getFormMyFill, curFormKind, searchParams]);

  useEffect(() => {
    getForms();
  }, [getForms]);
  return {
    myFillForms,
    isloading,
    _deleteMyFillForm,
    _getFormMyFill,
  };
}
