import { createContext } from 'react';

import { useMyCreateForms } from '../hooks/useMyCreateForms';
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
interface UserContext {
  forms: IForm[];
  isloading: boolean;
  activeFormIds: { id: string; kind: FormKinds }[];
  isStarForm: true | null;
  _getFormMyCreate: (options: ReqGetForm) => Promise<IForm[] | undefined>;
  _starForm: (option: ReqStarForm) => Promise<void>;
  _deleteForm: (option: ReqDelForm) => Promise<void>;
  setActiveFormIds: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        kind: FormKinds;
      }[]
    >
  >;
  selectForm: (id: string, checked: boolean, kind: FormKinds) => void;
  selecAllForm: (checked: boolean) => void;
  latestActiveForm: IForm | null;
  _createDulicate: (option: {
    args_str: {
      id: string;
      kind: FormKinds;
    }[];
    _t: number;
  }) => Promise<void>;

  _renameForm: (option: ReqRename, id: string) => Promise<void>;
  _updateForm: (option: UpdateForm, id: string) => Promise<void>;
  _shareForm: (option: CreateShareForm) => Promise<
    | {
        share_Id: string;
      }
    | null
    | undefined
  >;
  printForm: (option: CreateShareForm) => Promise<void>;
  _getFormByTag: (options: GetFormsByTag) => Promise<IForm[] | undefined>;
  setIsStarForm: React.Dispatch<React.SetStateAction<true | null>>;
  getForms: (tag_ids?: string[]) => void;
  _createTagToForm: (option: ADdTagREQ) => Promise<void>;
  hasMore: boolean;
  loadMore: (tag_ids?: string[]) => Promise<void>;
  _cancelTagToForm: (option: ADdTagREQ) => Promise<void>;
}
export const formContext = createContext<UserContext>({
  forms: [],
  isloading: true,
  activeFormIds: [],
  isStarForm: null,
  _getFormMyCreate: () => Promise.resolve(undefined),
  _starForm: () => Promise.resolve(),
  _deleteForm: () => Promise.resolve(),
  setActiveFormIds: () => {},
  selectForm: () => {},
  selecAllForm: () => {},
  latestActiveForm: null,
  _createDulicate: () => Promise.resolve(),
  _renameForm: () => Promise.resolve(),
  _updateForm: () => Promise.resolve(),
  _shareForm: () => Promise.resolve({ share_Id: '' }),
  printForm: () => Promise.resolve(),
  _getFormByTag: () => Promise.resolve(undefined),
  setIsStarForm: () => {},
  getForms: () => {},
  _createTagToForm: () => Promise.resolve(),
  hasMore: true,
  loadMore: () => Promise.resolve(),
  _cancelTagToForm: () => Promise.resolve(),
});

export default function FormProvider(props: any) {
  return <formContext.Provider value={useMyCreateForms()}>{props.children}</formContext.Provider>;
}
