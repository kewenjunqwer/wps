import { ApiRes } from '../modal/base';
import request from './request';
import { ISearchOption } from '../modal/serch';

export const serchForm = async (options: ISearchOption) => {
  const data: ApiRes<[]> = await request.post('/global/forms/search', options);
  return data;
};
