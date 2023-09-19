import { message } from 'antd';
import { IUser } from '../modal/user';
import { changeLogin, getUserInfo, logout } from '../server/userApi';
import { useCallback, useEffect, useState } from 'react';

export function useUser() {
  const [userInfo, setUserInfo] = useState<IUser[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // 获取用户信息
  const _getuserInfo = useCallback(async () => {
    try {
      const { data, code, result } = await getUserInfo();
      if (code === 0) {
        setUserInfo(data.users);
      } else {
        setError(result);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 推出登陆
  const _logOut = useCallback(async () => {
    const { result, msg } = await logout();
    if (result !== 'ok') {
      setError(msg);
    } else {
      window.open('https://f.wps.cn/home', '_self');
    }
  }, []);

  //切换账号
  const _changLoginAccount = useCallback(
    async (userid: number, from = 'v1-web-form-login', cb: string) => {
      const { result } = await changeLogin(userid, from, cb);
      if (result !== 'ok') {
        setError(result);
      } else {
        location.reload();
      }
    },
    []
  );

  useEffect(() => {
    _getuserInfo();
  }, [_getuserInfo]);

  return {
    userInfo,
    _logOut,
    _changLoginAccount,
  };
}
