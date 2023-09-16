import styles from './style.module.scss';
import { Button } from 'antd';
import { ILink } from '../../modal/base';
import SliderLink from '../../component/sliderLink';
import { useSearchParams } from 'react-router-dom';

import { ReactComponent as AddIcon } from '../../assets/leftslider/add.svg';
import classNames from 'classnames';

const sliderLinks: { topLinks: ILink[]; bottomLinks: ILink[] } = {
  topLinks: [
    {
      icon: '/images/mycreate.svg',
      title: '我创建的',
      key: 'mycreate',
    },
    {
      icon: '/images/myfill.svg',
      title: '我填写的',
      key: 'mywrite',
    },
  ],

  bottomLinks: [
    {
      icon: '/images/delete.svg',
      title: '回收站',
      key: 'recovery',
    },
  ],
};

export default function LeftSlider() {
  const [searchParams, _] = useSearchParams();

  const sidebar = searchParams.get('sidebar');

  return (
    <div className={styles.slider}>
      <div className={styles['logo-container']}>
        <div className={styles['logo-info']}>
          <div className={styles['logo-info-wrapper']}>
            <img src={'/images/logo.svg'} className={styles['logo-img']} />
          </div>
          <h1 className={classNames(styles['logo-text'], styles.ellipsis)} title="金山表单">
            金山表单
          </h1>
        </div>
      </div>
      <Button
        onClick={() => {
          window.open(
            'https://f.wps.cn/forms/templates?from=home&entrance=index_v3&_=1693814311510'
          );
        }}
        className={classNames(styles['create-btn'], styles._rfcsf)}
        type="primary"
      >
        <AddIcon className={styles.addicon}></AddIcon>
        <span className={styles._inb}>新建</span>
      </Button>
      <div className={'links-list'}>
        {/* 上部导航区 */}
        {sliderLinks.topLinks.map(item => (
          <SliderLink active={sidebar === item.key} key={item.title} itemLink={item} />
        ))}
        {/* 间隔 */}
        <div className={styles['topLink-bottomLink-gap']}></div>
        {/* 下部导航区 */}
        {sliderLinks.bottomLinks.map(item => (
          <SliderLink active={sidebar === item.key} key={item.title} itemLink={item} />
        ))}
      </div>
    </div>
  );
}
