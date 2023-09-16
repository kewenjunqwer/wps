import { ApiRes } from '../modal/base';
import { ReqTagCreate, ReqTagDel, ReqTagUpdate } from '../modal/tag';
import { ITag } from '../modal/tage';
import request from './request';

// 获取所有的tag
export const getTags = async () => {
  const data: ApiRes<ITag[]> = await request.get('/global/tags');
  return data;
};

// 创建一个tag
export const createTag = async (option: ReqTagCreate) => {
  const data: ApiRes<ITag[]> = await request.post('/global/tags/create', option);
  return data;
};

// 创建一个tag
export const delTags = async (option: ReqTagDel) => {
  const data: ApiRes<null> = await request.post('/global/tags/delete', option);
  return data;
};

// 修改一个tag
export const updateTag = async (option: ReqTagUpdate) => {
  const data: ApiRes<null> = await request.post('/global/tags/update', option);
  return data;
};
