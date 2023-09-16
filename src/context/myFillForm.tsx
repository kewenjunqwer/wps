import { createContext } from 'react';
import { MYFillItem, ReqGetForm } from '../modal/form';
import { useMyfillForms } from '../hooks/useMyFillForms';

interface MyFillFormContext {
  myFillForms: MYFillItem[];
  isloading: boolean;
  _deleteMyFillForm: (option: { shareId: string; _t: number }) => Promise<void>;
  _getFormMyFill: (options: ReqGetForm) => Promise<void>;
}
export const fillFormContext = createContext<MyFillFormContext>({
  myFillForms: [],
  isloading: true,
  _deleteMyFillForm: () => Promise.resolve(),
  _getFormMyFill: () => Promise.resolve(),
});

export default function MyFillFormProvider(Props: any) {
  return (
    <fillFormContext.Provider value={useMyfillForms()}>{Props.children}</fillFormContext.Provider>
  );
}
