import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  ADdTagREQ,
  CreateShareForm,
  FormKinds,
  GetFormsByTag,
  IForm,
  ReqDelForm,
  ReqGetForm,
  ReqRename,
  ReqStarForm,
  UpdateForm,
} from '../modal/form';
import {
  addTagToForm,
  cancelTagToForm,
  createDuplicate,
  createShareForm,
  deleteForm,
  getFormMyCreate,
  getFormsByTag,
  renameForm,
  starForm,
  updateForm,
} from '../server/formApi';
import { message } from 'antd';
import { useSearchParams } from 'react-router-dom';
type Iscene = 'newform' | 'exam' | 'form_v2_vote' | 'all';

export function useMyCreateForms() {
  const [forms, setForms] = useState<IForm[]>([]);
  const [error, setError] = useState<string>('');
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [activeFormIds, setActiveFormIds] = useState<{ id: string; kind: FormKinds }[]>([]);
  const [searchParams] = useSearchParams();
  const [isStarForm, setIsStarForm] = useState<null | true>(null);
  const [start, setStart] = useState<number>(0); // 从那条数据开始加载
  const [hasMore, setHasMore] = useState<boolean>(true); //是否有更多数据

  const limit = 12; // 每次加载得条数

  const curFormKind = useMemo(() => {
    const scene = searchParams.get('scene') as Iscene;
    const sceneRealatedkind = {
      newform: ['form_v2', 'form', 'ksform'],
      exam: ['exam'],
      form_v2_vote: ['form_v3_vote', 'form_v2_vote'],
      all: [],
    };
    if (scene) {
      return sceneRealatedkind[scene];
    } else {
      return [];
    }
  }, [searchParams]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // 获取我创建的全部
  const _getFormMyCreate = useCallback(async (options: ReqGetForm) => {
    setIsLoading(true);
    try {
      const { result, code, data } = await getFormMyCreate(options);
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

  // 根据标签获取form数据
  const _getFormByTag = useCallback(async (options: GetFormsByTag) => {
    setIsLoading(true);
    try {
      const { result, code, data } = await getFormsByTag(options);
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

  // 获取获取数据得参数信息
  const getOption = useCallback(
    (start = 0, tag_ids?: string[]) => {
      const option = {
        kind: curFormKind as FormKinds[],
        limit,
        star: isStarForm,
        tag_ids,
        _t: Date.now(),
        start,
      };
      return option;
    },
    [curFormKind, isStarForm]
  );

  // 获取参数信息初始化数据数据
  const getForms = useCallback(
    async (tag_ids?: string[]) => {
      // 如果标签存在，则根据标签信息获取对应得form数据
      if (tag_ids && tag_ids.length > 0) {
        const data = await _getFormByTag(getOption(0, tag_ids) as GetFormsByTag);
        data && setForms(data);
      } else {
        const data = await _getFormMyCreate(getOption(0) as ReqGetForm);
        data && setForms(data);
      }
    },
    [_getFormByTag, _getFormMyCreate, getOption]
  );

  // 加载更多
  const loadMore = useCallback(
    async (tag_ids?: string[]) => {
      const curStart = start + limit;
      let data: IForm[] = [];
      if (tag_ids && tag_ids.length > 0) {
        data = (await _getFormByTag(getOption(curStart, tag_ids) as GetFormsByTag)) as IForm[];
      } else {
        data = (await _getFormMyCreate(getOption(curStart) as ReqGetForm)) as IForm[];
      }
      data?.length < limit && setHasMore(false);
      data.length > 0 && setForms(forms.concat(data));
      setStart(curStart);
    },
    [_getFormByTag, _getFormMyCreate, forms, getOption, start]
  );

  // 给选中的form进行标星
  const _starForm = useCallback(
    async (option: ReqStarForm) => {
      // 先改变状态
      const _newForm = forms?.map(item => {
        if (option.ids.includes(item.item_id)) {
          return { ...item, star: option.star };
        } else {
          return item;
        }
      });
      setForms(_newForm);
      try {
        const { code, result } = await starForm(option);
        if (code !== 0) {
          setError(result);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [forms]
  );

  // 删除一个form
  const _deleteForm = useCallback(
    async (option: ReqDelForm) => {
      const newForm = forms?.filter(cur => !option.args_str.find(ele => ele.id === cur.item_id));
      setForms(newForm);
      try {
        deleteForm(option);
      } catch (error) {
        console.log(error);
      }
    },
    [forms]
  );

  // 选中一个form
  const selectForm = useCallback(
    (id: string, checked: boolean, kind: FormKinds) => {
      if (checked) {
        const _newActiveForm = [...activeFormIds, { id, kind }];
        setActiveFormIds(_newActiveForm);
      } else {
        const _newActiveForm = activeFormIds.filter(item => item.id !== id);
        setActiveFormIds(_newActiveForm);
      }
    },
    [activeFormIds]
  );

  // 全选 selectAllFrom
  const selecAllForm = useCallback(
    (checked: boolean) => {
      if (checked) {
        const _ids = forms?.map(item => {
          return { id: item.item_id, kind: item.kind };
        });
        setActiveFormIds(_ids);
      } else {
        console.log('没有全选', checked);
        setActiveFormIds([]);
      }
    },
    [forms]
  );

  // 创建一个副本
  const _createDulicate = useCallback(
    async (option: { args_str: { id: string; kind: FormKinds }[]; _t: number }) => {
      try {
        const { code, result } = await createDuplicate(option);
        if (code !== 0) {
          //错误处理
          setError(result);
        }
        // 重新获取数据
      } catch (error) {
        console.log(error);
      } finally {
        getForms();
      }
    },
    [getForms]
  );

  // form 重新命名
  const _renameForm = useCallback(
    async (option: ReqRename, id: string) => {
      // 先更新状态
      const newForms = forms?.map(item => {
        if (item.item_id === id) {
          return { ...item, title: option.title };
        } else {
          return item;
        }
      });
      setForms(newForms);
      try {
        const { code, result } = await renameForm(option, id);
        if (code !== 0) {
          setError(result);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [forms]
  );

  // 修改一个form表单
  const _updateForm = useCallback(
    async (option: UpdateForm, id: string) => {
      // 先更新状态
      const newForms = forms?.filter(item => {
        if (item.item_id === id) {
          return { ...item, ...option.setting };
        } else {
          return item;
        }
      });
      setForms(newForms);
      try {
        const { code, result } = await updateForm(option, id);
        if (code !== 0) {
          setError(result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        getForms();
      }
    },
    [forms, getForms]
  );

  // 创建一个分享链接
  const _shareForm = useCallback(async (option: CreateShareForm) => {
    // 先更新状态
    try {
      const { code, data } = await createShareForm(option);
      if (code === 0) {
        return data;
      } else {
        // 错误处理
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 答应表单
  const printForm = useCallback(
    async (option: CreateShareForm) => {
      try {
        const { code, data } = await createShareForm(option);
        if (code === 0) {
          window.open(`https://f.wps.cn/ts/${data.share_Id}?isPrintPage=true`);
        } else {
          setError(error);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [error]
  );

  // 给一个form打上标签
  const _createTagToForm = useCallback(
    async (option: ADdTagREQ) => {
      // 先更新状态
      const _newfroms = forms.map(item => {
        if (item.item_id === option.item_id) {
          return { ...item, tag_ids: option.tag_id };
        } else {
          return item;
        }
      });
      setForms(_newfroms);

      try {
        const { code, result } = await addTagToForm(option);
        if (code !== 0) {
          setError(result);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [forms]
  );

  // 给一个表当取消链接
  const _cancelTagToForm = useCallback(
    async (option: ADdTagREQ) => {
      // 先更新状态
      const _newfroms = forms.map(item => {
        if (item.item_id === option.item_id) {
          return { ...item, tag_ids: '' };
        } else {
          return item;
        }
      });
      setForms(_newfroms);
      try {
        const { code, result } = await cancelTagToForm(option);
        if (code !== 0) {
          setError(result);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [forms]
  );
  // 最新激活的formITEM
  const latestActiveForm = useMemo(() => {
    if (activeFormIds.length > 0) {
      const _latestActiveForm = forms?.filter(
        item => item.item_id === activeFormIds[activeFormIds.length - 1].id
      );
      return _latestActiveForm?.[0];
    } else {
      return null;
    }
  }, [activeFormIds, forms]);

  useEffect(() => {
    getForms();
  }, [getForms]);

  return {
    forms,
    isloading,
    activeFormIds,
    latestActiveForm,
    isStarForm,
    hasMore,
    setIsStarForm,
    _getFormMyCreate,
    _starForm,
    _deleteForm,
    setActiveFormIds,
    selectForm,
    selecAllForm,
    _createDulicate,
    _renameForm,
    _updateForm,
    _shareForm,
    printForm,
    _getFormByTag,
    getForms,
    _createTagToForm,
    loadMore,
    _cancelTagToForm,
  };
}
