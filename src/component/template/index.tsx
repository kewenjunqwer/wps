// 根据不同屏幕的宽度获取不同的模板展示个数
import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { TemplatesInfo } from '../../modal/base';

interface Props {
  item: TemplatesInfo;
}
export function TemPlate({ item }: Props) {
  return (
    <div
      onClick={() => {
        window.open(
          `https://f.wps.cn/new-form-create?from=listV3&entrance=index_v3&templateid=${item.templateId}#data`
        );
      }}
      className={styles['template-item']}
    >
      <div className={styles['wrap']}>
        <img
          src={
            item.customMainPicture
              ? `https://fs.kdocs.cn/s/${item.customMainPicture}`
              : '/images/default-template.jpeg'
          }
          alt=""
          className={styles.img}
        />
        <div className={styles.title}>{item.title}</div>
      </div>
    </div>
  );
}

const templateCount = () => {
  const clientWidth = window.innerWidth;
  if (clientWidth <= 1366) {
    return 5;
  }
  if (clientWidth > 1366 && clientWidth <= 1576) {
    return 6;
  } else {
    return 8;
  }
};

interface Iprops {
  templates: TemplatesInfo[];
}

export function TemPlateList({ templates }: Iprops) {
  const [templateIndex, setTemplateIndex] = useState<number>(5);
  useEffect(() => {
    setTemplateIndex(templateCount());
    window.addEventListener('resize', () => {
      setTemplateIndex(templateCount());
    });
  }, []);
  return (
    <>
      {templates.slice(0, templateIndex).map(cur => (
        <TemPlate key={cur.templateId} item={cur} />
      ))}
    </>
  );
}
