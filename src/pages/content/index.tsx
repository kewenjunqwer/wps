import styles from './style.module.scss';
import Header from '../header';
import UserProvider from '../../context/user';
import { useEffect } from 'react';
import { useTemplateInfo } from '../../hooks/useTemplateInfo';
import Form from '../../component/form';
import { Button } from 'antd';
import classNames from 'classnames';
import { TemPlateList } from '../../component/template';

export default function Content() {
  const { _getTemplateInfo, templatesInfos } = useTemplateInfo();

  // 初始获取模板数据
  useEffect(() => {
    _getTemplateInfo();
  }, [_getTemplateInfo]);

  return (
    <div className={styles.content}>
      <UserProvider>
        <Header />
      </UserProvider>
      <div className={styles['content-container']}>
        <div className={styles['container-top']}>
          <div className={styles['hot-container']}>
            <div className={classNames(styles['hot-title-wrap'], styles._rsbc)}>
              <h2 className={styles['title']}>热门推荐</h2>
              <Button
                className={styles['more-template']}
                onClick={() => {
                  window.open(
                    'https://f.wps.cn/forms/templates?from=list&entrance=index_v3&position=more_template&sidebar=mywrite'
                  );
                }}
                type="link"
              >
                更多模板
              </Button>
            </div>

            {/* 热门推荐列表 */}
            <div className={styles['hot-list-wrap']}>
              <div className={styles.list}>
                <TemPlateList templates={templatesInfos} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles['container-bottom']}>
          <Form />
        </div>
      </div>
    </div>
  );
}
