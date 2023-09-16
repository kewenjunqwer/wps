import { message } from 'antd';
import { IUser } from '../modal/user';
import { getUserInfo } from '../server/userApi';
import { useCallback, useEffect, useState } from 'react';

export function useUser() {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const _getuserInfo = useCallback(async () => {
    try {
      const { data, code, result } = await getUserInfo();
      if (code === 0) {
        setUserInfo(data.users[0]);
      } else {
        setError(result);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  return {
    userInfo,
    _getuserInfo,
  };
}
