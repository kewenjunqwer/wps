import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  CreateShareForm,
  FormKinds,
  IForm,
  ReqDelForm,
  ReqGetForm,
  ReqRename,
  ReqStarForm,
  UpdateForm,
} from '../modal/form';
import {
  createDuplicate,
  deleteForm,
  getFormMyCreate,
  getFormMyFill,
  renameForm,
  starForm,
  updateForm,
} from '../server/formApi';
import { message } from 'antd';
import { useSearchParams } from 'react-router-dom';

export function useForms() {
  const [forms, setForms] = useState<IForm[]>([]);
  const [error, setError] = useState<string>('');
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [activeFormIds, setActiveFormIds] = useState<{ id: string; kind: FormKinds }[]>([]);
  const [operateForm, setOperateForm] = useState<IForm>();
  const [searchParams, _] = useSearchParams();
  const sidebar = searchParams.get('sidebar');
  // 是否显示删除的modal框
  const [isShowDelModal, setIsShowModal] = useState<boolean>(false);
  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // 获取我创建的
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

  // 获取我填写的
  const _getFormMyFill = useCallback(async (options: ReqGetForm) => {
    setIsLoading(true);
    try {
      const { result, code, data } = await getFormMyFill(options);
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

  // 初始化
  const init = useCallback(() => {
    const option = { limit: 10, start: 0, kind: [], _t: Date.now() };
    if (sidebar === 'mycreate') {
      _getFormMyCreate(option);
    }
    if (sidebar === 'mywrite') {
      _getFormMyFill(option);
    }
  }, [_getFormMyCreate, _getFormMyFill, sidebar]);

  // 给选中的form进行标星
  const _starForm = useCallback(
    async (option: ReqStarForm) => {
      // 先改变状态
      const _newForm = forms.map(item => {
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
      const newForm = forms.filter(cur => !option.args_str.find(ele => ele.id === cur.item_id));
      console.log('new', newForm);
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
        const _ids = forms.map(item => {
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

        if (code === 0) {
          init();
        } else {
          //错误处理
          setError(result);
        }
        // 重新获取数据
      } catch (error) {
        console.log(error);
      } finally {
        init();
      }
    },
    [init]
  );

  // form 重新命名
  const _renameForm = useCallback(
    async (option: ReqRename, id: string) => {
      // 先更新状态
      const newForms = forms.map(item => {
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
      const newForms = forms.filter(item => {
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
        init();
      }
    },
    [forms, init]
  );

  // const _shareForm = useCallback(
  //   async (option: CreateShareForm) => {
  //     // 先更新状态

  //     try {
  //       const { code, result } = await forms(option, id);
  //       if (code !== 0) {
  //         setError(result);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       init();
  //     }
  //   },
  //   [forms, init]
  // );

  // 最新激活的formITEM
  const latestActiveForm = useMemo(() => {
    if (activeFormIds.length > 0) {
      const _latestActiveForm = forms.filter(
        item => item.item_id === activeFormIds[activeFormIds.length - 1].id
      );
      return _latestActiveForm[0];
    } else {
      return null;
    }
  }, [activeFormIds, forms]);

  // 刷新
  const refresh = useCallback(() => {
    init();
  }, [init]);

  // 初始获取数据
  useEffect(() => {
    setIsLoading(true);
    init();
  }, [init]);
  return {
    forms,
    isloading,
    activeFormIds,
    operateForm,
    _getFormMyCreate,
    _getFormMyFill,
    _starForm,
    _deleteForm,
    setActiveFormIds,
    selectForm,
    selecAllForm,
    latestActiveForm,
    _createDulicate,
    isShowDelModal,
    setIsShowModal,
    refresh,
    _renameForm,
    setOperateForm,
    _updateForm,
  };
}
