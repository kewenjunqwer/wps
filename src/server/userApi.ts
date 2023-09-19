import { ApiRes } from '../modal/base';
import { IUser } from '../modal/user';
import request from './request';
import account from './account';

// 获取用户信息
export const getUserInfo = async () => {
  const data: ApiRes<{ result: string; users: IUser[] }> = await request.get(
    '/qing/users/v3/mine/users'
  );
  return data;
};

// 获取cookie

const getCookie = function (name: string) {
  let value = '';
  const cookies = document.cookie;
  console.log(cookies);
  const reg = new RegExp(name + '=([^;]*)');
  const match = cookies.match(reg);
  if (match) {
    value = decodeURIComponent(match[1]);
  }
  return value;
};

// 退出登陆
export const logout = async () => {
  const date = new Date();
  const data: { result: string; msg: string } = await account.post('/p/logout', {
    timestamp: date.toISOString(),
    csrfmiddlewaretoken: getCookie('csrf'),
    _t: Date.now(),
  });
  return data;
};

// 切换账号
export const changeLogin = async (userid: number, from = ' v1-web-form-login', cb: string) => {
  const data: ApiRes<null> = await account.post('/api/v3/login/web_change_login', {
    userid,
    from,
    cb,
  });
  return data;
};
