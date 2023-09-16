import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { TemplatesInfo } from '../modal/base';
import { getTemplateInfo } from '../server/templateInfo';

export function useTemplateInfo() {
  const [templatesInfos, setTemPlatesInfos] = useState<TemplatesInfo[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (error) {
      message.error(error);
      setError('');
    }
  }, [error]);

  const _getTemplateInfo = useCallback(async () => {
    try {
      const { code, data, result } = await getTemplateInfo();
      if (code === 0) {
        setTemPlatesInfos(data.templatesInfo);
      } else {
        setError(result);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);



  return {
    templatesInfos,
    _getTemplateInfo,

  };
}
