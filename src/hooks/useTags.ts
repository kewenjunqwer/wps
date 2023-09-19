import { useState, useCallback, useEffect } from 'react';
import { ITag } from '../modal/tage';
import { createTag, delTags, getTags, updateTag } from '../server/tagApi';
import { ReqTagCreate, ReqTagDel, ReqTagUpdate } from '../modal/tag';
import { message } from 'antd';

export function useTags() {
  const [tags, setTags] = useState<ITag[]>([]);
  const [activeTag, setActiveTag] = useState<ITag | undefined>();
  const [selectTags, setSeletcTags] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // 获取所有的tags
  const _getTags = useCallback(async () => {
    try {
      const { code, result, data } = await getTags();
      if (code === 0) {
        setTags(data);
      } else {
        // 错误处理
        setError(result);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 创建一个tag

  const _createTags = useCallback(
    async (option: ReqTagCreate) => {
      try {
        const { code } = await createTag(option);
        if (code === 0) {
          setTags(tags);
        } else {
          // 错误处理
        }
      } catch (error) {
        console.log(error);
      } finally {
        _getTags();
      }
    },
    [_getTags, tags]
  );

  // 删除tag
  const _delTags = useCallback(
    async (option: ReqTagDel) => {
      try {
        const { code } = await delTags(option);
        if (code !== 0) {
          // 错误处理
        }
      } catch (error) {
        console.log(error);
      } finally {
        _getTags();
      }
    },
    [_getTags]
  );

  // 更新一个tag
  const _updateTag = useCallback(
    async (option: ReqTagUpdate) => {
      try {
        const { code } = await updateTag(option);
        if (code !== 0) {
          // 错误处理
        }
      } catch (error) {
        console.log(error);
      } finally {
        _getTags();
      }
    },
    [_getTags]
  );

  // checkBox选中或取消选中的逻辑
  const _selectTags = useCallback(
    (id: string, checked: boolean) => {
      if (checked) {
        setSeletcTags([...selectTags, id]);
      } else {
        setSeletcTags(selectTags.filter(item => item !== id));
      }
    },
    [selectTags]
  );
  useEffect(() => {
    _getTags();
  }, [_getTags]);

  return {
    tags,
    activeTag,
    selectTags,
    _getTags,
    _createTags,
    setActiveTag,
    _delTags,
    _updateTag,
    _selectTags,
    setSeletcTags,
  };
}
