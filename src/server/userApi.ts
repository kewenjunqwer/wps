import { ApiRes } from '../modal/base';
import { IUser } from '../modal/user';
import request from './request';

// 获取用户信息
export const getUserInfo = async () => {
  const data: ApiRes<{ result: string; users: IUser[] }> = await request.get(
    '/qing/users/v3/mine/users'
  );
  return data;
};
