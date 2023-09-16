import { ApiRes, TemplatesInfo } from '../modal/base';
import request from './request';

export const getTemplateInfo = async () => {
  const data: ApiRes<{ templatesInfo: TemplatesInfo[] }> = await request.get(
    'godfather/api/thirdparty/v1/advertiselist?limit=10&title=%E7%83%AD%E9%97%A8%E6%8E%A8%E8%8D%90'
  );
  return data;
};
