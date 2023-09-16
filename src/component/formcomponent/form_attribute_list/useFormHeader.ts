import { useContext, useState } from 'react';
import { FormKinds } from '../../../modal/form';
import { formContext } from '../../../context/form';
import { useSearchParams } from 'react-router-dom';
enum StarType {
  ALL = 'ALL',
  STARED = 'stared',
}

type Iscene = 'newform' | 'exam' | 'form_v2_vote';

export function useFormHeader() {
  const [formType, setFormType] = useState<FormKinds>('all');
  const [formTypeSelectOpen, setFormTypeSelectOpen] = useState<boolean>(false);
  const [starType, setStarType] = useState<null | true>(null);
  const { _getFormMyCreate } = useContext(formContext);
  const [searchParams, _] = useSearchParams();
  const sidebar = searchParams.get('sidebar');
  const scene = searchParams.get('scene') as Iscene;

  // form下拉的select选项
  const formTypeoptions: { value: string; label: string; type: FormKinds }[] = [
    {
      value: 'all',
      label: 'all',
      type: 'all',
    },
    {
      value: 'ksform',
      label: 'ksform',
      type: 'ksform',
    },
    {
      value: 'form_v2',
      label: 'form_v2',
      type: 'form_v2',
    },
  ];

  const sceneRealatedkind = {
    newform: ['form_v2', 'form', 'ksform'],
    exam: ['exam'],
    form_v2_vote: ['form_v3_vote', 'form_v2_vote'],
  };

  const getSceneRealatedkind = () => {
    if (scene) {
      return sceneRealatedkind[scene];
    } else {
      return [];
    }
  };
  // 显示星标Pover的下拉选项
  const starLinks = [
    {
      title: '显示全部',
      onclick: () => {
        setStarType(null);
        _getFormMyCreate({
          kind: getSceneRealatedkind() as FormKinds[],
          limit: 12,
          star: null,
          start: 0,
          _t: 1694681444793,
        });
      },
      type: StarType.ALL,
    },
    {
      title: '仅显示星标',
      onclick: () => {
        setStarType(true);
        _getFormMyCreate({
          kind: getSceneRealatedkind() as FormKinds[],
          limit: 12,
          star: true,
          start: 0,
          _t: 1694681657370,
        });
      },
      type: StarType.STARED,
    },
  ];

  return {
    formTypeSelectOpen,
    setFormTypeSelectOpen,
    formTypeoptions,
    starLinks,
    starType,
    formType,
    setFormType,
  };
}
