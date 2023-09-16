import { ApiRes } from '../modal/base';
import request from './request';
import {
  CreateShareForm,
  GetFormsByTag,
  IForm,
  MYFillItem,
  ReqDelForm,
  ReqGetForm,
  ReqRename,
  ReqStarForm,
  UpdateForm,
} from '../modal/form';

// 获取我创建的forms
export const getFormMyCreate = async (options: ReqGetForm) => {
  const data: ApiRes<IForm[]> = await request.post('/global/forms', options);
  return data;
};

// 获取我填写的forms
export const getFormMyFill = async (options: ReqGetForm) => {
  const data: ApiRes<MYFillItem[]> = await request.post('/global/global_collections', options);
  return data;
};

// 给一个form标星
export const starForm = async (options: ReqStarForm) => {
  const data: ApiRes<null> = await request.post('/global/forms/star', options);
  return data;
};

// 删除一个form
export const deleteForm = async (options: ReqDelForm) => {
  const data: ApiRes<null> = await request.post('/global/forms/delete', options);
  return data;
};

// 创建副本
export const createDuplicate = async (options: ReqDelForm) => {
  const data: ApiRes<[]> = await request.post('/global/forms/duplicate', options);
  return data;
};

// 重命名
export const renameForm = async (options: ReqRename, id: string) => {
  const data: ApiRes<null> = await request.post(`/global/form/${id}/rename`, options);
  return data;
};

// 停止收集
export const updateForm = async (options: UpdateForm, id: string) => {
  const data: ApiRes<null> = await request.post(`/global/form/${id}/settings`, options);
  return data;
};

// 创建一个分享
export const createShareForm = async (options: CreateShareForm) => {
  const data: ApiRes<{ share_Id: string }> = await request.post(`/global/template/create`, options);
  return data;
};

// 根据标签获取form数据
export const getFormsByTag = async (options: GetFormsByTag) => {
  const data: ApiRes<IForm[]> = await request.post(`/global/tag/form`, options);
  return data;
};

// 删除我填写的form
export const delMyfillForm = async (options: { shareId: string; _t: number }) => {
  const data: ApiRes<undefined> = await request.post(`/global/fills/delete`, options);
  return data;
};
