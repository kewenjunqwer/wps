import { createContext } from 'react';
import { IUser } from '../modal/user';
import { useUser } from '../hooks/userUser';
interface UserContext {
  userInfo: IUser[];
  _logOut: () => Promise<void>;
  _changLoginAccount: (userid: number, from: string | undefined, cb: string) => Promise<void>;
}

export const userContext = createContext<UserContext>({
  userInfo: [],
  _logOut: () => Promise.resolve(),
  _changLoginAccount: () => Promise.resolve(),
});

export default function UserProvider(props: any) {
  return <userContext.Provider value={useUser()}>{props.children}</userContext.Provider>;
}
