import React, { createContext, useEffect } from 'react';
import { IUser } from '../modal/user';
import { useUser } from '../hooks/userUser';
interface UserContext {
  userInfo: IUser | null;
}

export const userContext = createContext<UserContext>({
  userInfo: null,
});

export default function UserProvider(props: any) {
  const { userInfo, _getuserInfo } = useUser();
  useEffect(() => {
    _getuserInfo();
  }, [_getuserInfo]);

  return <userContext.Provider value={{ userInfo }}>{props.children}</userContext.Provider>;
}
