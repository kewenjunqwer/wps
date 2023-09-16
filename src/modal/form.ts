export type FormKinds = 'form_v2' | 'ksform';

export enum FomTitle {
  exam = '考试',
  form_v2 = '接龙',
  ksform = '表单',
  all = '全部表单',
}

export enum CollectState {
  STOPCLLECT = -1,
  COLLECT = 0,
}

export enum FormState {
  RELEASE = 'Release',
  DRAFT = 'Draft',
}

export interface IForm {
  contact_group_id: string;
  count: number;
  create_ts: number;
  edit_version: number;
  end_at: number;
  expire: CollectState;
  file_id: string;
  file_name: string;
  hide_company_certification: boolean;
  is_link: number;
  item_id: string;
  kind: FormKinds;
  max_write_times: number;
  modified_ts: number;
  share_id: string;
  solitarie_config: {
    solitaire_open: boolean;
    solitaire_authority: string;
    solitaire_defaultNameList_open: boolean;
  };
  solitarie_statistics: { total: number };
  species: string;
  star: boolean;
  start_at: number;
  tag_ids: string;
  title: string;
  type: FormState;
  user_id: string;
  version: 3;
}

export interface ReqGetForm {
  kind: FormKinds[];
  limit: number;
  star?: null | boolean;
  start: number;
  _t: number;
}

export interface ReqStarForm {
  ids: string[];
  star: boolean;
  _t: number;
}

export interface ReqDelForm {
  args_str: { id: string; kind: string }[];
  _t: number;
}

export interface ReqRename {
  name: string;
  title: string;
  _t: number;
}

export interface UpdateForm {
  setting: object;
  _t: number;
}

export interface CreateShareForm {
  id: string;
  is_print: boolean;
  kind: FormKinds;
  _t: number;
}

export interface GetFormsByTag {
  kind: FormKinds[];
  limit: 12;
  star: null | boolean;
  start: number;
  tag_ids: string[];
  _t: number;
}

export interface MYFillItem {
  contact_group_id: string;
  create_ts: number;
  draft: boolean;
  edit_version: number;
  kind: FormKinds;
  modified_ts: number;
  share_id: string;
  solitarie_config: {
    solitaire_open: boolean;
    solitaire_authority: string;
    solitaire_defaultNameList_open: boolean;
  };
  solitarie_statistics: { total: number };
  species: string;
  title: string;
  user: { id: number; nickname: string; pic: string };
  version: number;
}
