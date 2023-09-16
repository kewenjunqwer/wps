import { createContext } from 'react';

import { ITag } from '../modal/tage';
import { useTags } from '../hooks/useTags';
import { ReqTagCreate, ReqTagDel, ReqTagUpdate } from '../modal/tag';
interface UserContext {
  tags: ITag[];
  selectTags: string[];
  activeTag: ITag | undefined;
  _getTags: () => Promise<void>;
  _createTags: (option: ReqTagCreate) => Promise<void>;
  setActiveTag: React.Dispatch<React.SetStateAction<ITag | undefined>>;
  _delTags: (option: ReqTagDel) => Promise<void>;
  _updateTag: (option: ReqTagUpdate) => Promise<void>;
  _selectTags: (id: string, checked: boolean) => void;
  setSeletcTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const tagContext = createContext<UserContext>({
  tags: [],
  selectTags: [],
  activeTag: undefined,
  _getTags: () => Promise.resolve(),
  _createTags: () => Promise.resolve(),
  setActiveTag: () => {},
  _delTags: () => Promise.resolve(),
  _updateTag: () => Promise.resolve(),
  _selectTags: () => {},
  setSeletcTags: () => {},
});

export function TagProvider(props: any) {
  return <tagContext.Provider value={useTags()}>{props.children}</tagContext.Provider>;
}
