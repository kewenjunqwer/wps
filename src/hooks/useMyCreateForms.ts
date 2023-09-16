import { useState, useCallback, useEffect, useMemo } from 'react';
import {
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
  createDuplicate,
  createShareForm,
  deleteForm,
  getFormMyCreate,
  getFormMyFill,
  getFormsByTag,
  renameForm,
  starForm,
  updateForm,
} from '../server/formApi';
import { message } from 'antd';
import { useSearchParams } from 'react-router-dom';
type Iscene = 'newform' | 'exam' | 'form_v2_vote' | 'all';
const _forms = [
  {
    item_id: '20230914145317908107605',
    title: '3653-副本',
    contact_group_id: '',
    create_ts: 1694674399000000000,
    modified_ts: 1694674399000000000,
    type: 'Draft',
    edit_version: 0,
    version: 3,
    kind: 'ksform',
    star: false,
    count: 0,
    share_id: '',
    expire: 0,
    start_at: 0,
    end_at: 0,
    species: '',
    hide_company_certification: false,
    tag_ids: '',
    max_write_times: -1,
    solitarie_config: {
      solitaire_open: false,
      solitaire_authority: '',
      solitaire_defaultNameList_open: false,
    },
    solitarie_statistics: {
      total: 0,
    },
    file_id: '0',
    file_name: '',
    is_link: 0,
    user_id: '282737023',
  },
  {
    item_id: '64a7c2cf99e44523a181531752805af5',
    title: '2-副本-副本',
    contact_group_id: '',
    create_ts: 1694655604000000000,
    modified_ts: 1694655618000000000,
    type: 'Release',
    edit_version: 0,
    version: 8,
    kind: 'form_v2',
    star: false,
    count: 0,
    share_id: 'BwvDouAD',
    expire: 0,
    start_at: 0,
    end_at: 0,
    species: '',
    hide_company_certification: false,
    tag_ids: '',
    max_write_times: -1,
    solitarie_config: {
      solitaire_open: true,
      solitaire_authority: 'participant',
      solitaire_defaultNameList_open: false,
    },
    solitarie_statistics: {
      total: 0,
    },
    file_id: '0',
    file_name: '',
    is_link: 0,
    user_id: '282737023',
  },
];

export function useForms() {
  const [forms, setForms] = useState<IForm[]>([]);
  const [error, setError] = useState<string>('');
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [activeFormIds, setActiveFormIds] = useState<{ id: string; kind: FormKinds }[]>([]);
  const [searchParams, _] = useSearchParams();
  const [isStarForm, setIsStarForm] = useState<null | true>(null);

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
        setForms(data);
      } else {
        setError(result);
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
        setForms(data);
      } else {
        setError(result);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);


  // 获取forms数据
  const getForms = useCallback(
    (tag_ids?: string[]) => {
      const sidebar = searchParams.get('sidebar');
      console.log(sidebar);
      // 如果根据标签获取数据
      if (tag_ids && tag_ids.length > 0) {
        _getFormByTag({
          kind: curFormKind as FormKinds[],
          limit: 12,
          star: isStarForm,
          tag_ids,
          _t: Date.now(),
          start: 0,
        });
      } else {
        const option = {
          limit: 10,
          start: 0,
          kind: curFormKind as FormKinds[],
          _t: Date.now(),
          star: isStarForm,
        };
        if (sidebar === 'mycreate' || sidebar === null) {
          _getFormMyCreate(option);
        }
      }
    },
    [_getFormByTag, _getFormMyCreate, curFormKind, isStarForm, searchParams]
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
    setIsStarForm,
    _getFormMyCreate,
    _getFormMyFill,
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
  };
}
