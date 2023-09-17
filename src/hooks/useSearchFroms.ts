import { message } from 'antd';
import { ISearchOption } from '../modal/serch';
import { serchForm } from '../server/serchApi';
import { useCallback, useEffect, useState } from 'react';
import { IForm } from '../modal/form';

export function useSearchForm() {
  const [froms, setForms] = useState<IForm[]>([]);
  const [error, setError] = useState<string>('');
  const [isloading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    if (error) {
      message.error(error);
      setError('');
    }
  }, [error]);

  const _searchForms = useCallback(async (options: ISearchOption) => {
    setIsloading(true);
    try {
      const { code, data, result } = await serchForm(options);
      setIsloading(false);
      if (code === 0) {
        setForms(data);
      } else {
        setError(result);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    froms,
    _searchForms,
    isloading,
  };
}
