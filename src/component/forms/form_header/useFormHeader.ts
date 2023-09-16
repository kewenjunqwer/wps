import { useState } from 'react';
import { FormKinds } from '../../../modal/form';
enum StarType {
  ALL = 'ALL',
  STARED = 'stared',
}

export function useFormHeader() {
  const [formType, setFormType] = useState<FormKinds>('all');
  const [formTypeSelectOpen, setFormTypeSelectOpen] = useState<boolean>(false);
  const [tagOpen, setTagOpen] = useState<boolean>(false);
  const [starOpen, setStartOpen] = useState<boolean>(false);
  const [starType, setStarType] = useState<StarType>(StarType.ALL);

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

  // 显示星标Pover的下拉选项
  const starLinks = [
    {
      title: '显示全部',
      onclick: () => {
        setStarType(StarType.ALL);
        setStartOpen(!starOpen);
      },
      type: StarType.ALL,
    },
    {
      title: '仅显示星标',
      onclick: () => {
        setStarType(StarType.STARED);
        setStartOpen(!starOpen);
      },
      type: StarType.STARED,
    },
  ];

  return {
    formTypeSelectOpen,
    setFormTypeSelectOpen,
    tagOpen,
    setTagOpen,
    starOpen,
    setStartOpen,
    formTypeoptions,
    starLinks,
    starType,
    formType,
    setFormType,
  };
}
