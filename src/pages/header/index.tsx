/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useRef, useState, useMemo } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import { Avatar, Input, InputRef, Popover, Spin } from 'antd';
import { useSearchForm } from '../../hooks/useSearchFroms';
import { debounce, divide } from 'lodash';
import ApplicationLink from '../../component/applicationLink';

import { userContext } from '../../context/user';
import { ReactComponent as SearchIcon } from '../../assets/header/search.svg';
import { ReactComponent as WhchateIcon } from '../../assets/header/wechat.svg';
import { ReactComponent as DocumentIcon } from '../../assets/header/document.svg';
import { ReactComponent as MettingIcon } from '../../assets/header/metting.svg';
import { ReactComponent as CalendarIcon } from '../../assets/header/calendar.svg';
import { ReactComponent as AddIcon } from '../../assets/leftslider/add.svg';


import Empty from '../../component/empty';
import classNames from 'classnames';
import { APPlicationLink } from '../../modal/base';
import { serchForm } from '../../server/serchApi';
import { formatTimeRelative } from '../../util';

const useInfoLinks = {
  accountManagement: {
    title: '账号管理',
    links: [
      {
        title: '个人中心',
        href: 'https://account.wps.cn/usercenter/apps',
      },
      {
        title: '常用信息管理',
        href: 'https://f.wps.cn/forms/commoninfo',
      },
      {
        title: '偏好设置',
        href: 'https://f.wps.cn/forms/preference-setting',
      },
      {
        title: '退出账号',
        href: 'https://f.wps.cn/home',
      },
    ],
  },

  swichAccount: {
    title: '切换账号',
    links: [
      {
        title: 'WPS_',
        icon: '',
        href: '',
        checkMark: true,
      },
      {
        title: '登陆其他账号',
        icon: '',
        href: '',
        checkMark: true,
      },
    ],
  },
};

const aplicationlinks: APPlicationLink[] = [
  {
    iconUrl: <DocumentIcon />,
    title: '文档',
    subtitle: '多人协作在线文档',
    href: 'https://docs.wps.cn/',
    iconType: 'img',
  },
  {
    iconUrl: <MettingIcon />,
    title: '会议',
    subtitle: '云上开会，协作无间',
    href: 'https://www.kdocs.cn/meeting?from=docs',
    iconType: 'img',
  },
  {
    iconUrl: <img className={styles['app-img']} src={'/images/application_center/needTodeal.png'} alt="" />,
    title: '待办',
    subtitle: '团队任务协作，多平台同步',
    href: 'https://todo.wps.cn/?ch=cloud',
    iconType: 'img',
  },
  {
    iconUrl: <CalendarIcon />,
    title: '日历',
    subtitle: '高校的日程管理工具',
    href: 'https://rili.wps.cn/?from=docs',
    iconType: 'img',
  },
  {
    iconUrl: <img className={styles['app-img']} src={'/images/application_center/adressbook.png'} alt="" />,
    title: '通讯录',
    subtitle: '添加伙伴，高效团队办公',
    href: 'https://docs.wps.cn/contact',
    iconType: 'img',
  },
];


export default function Header() {
  const { froms, _searchForms, isloading } = useSearchForm();
  const { userInfo } = useContext(userContext); // 去除用户信息
  const [searchContentOpen, setSearchContentOpen] = useState<boolean>(false);
  const intuRef = useRef<InputRef | null>(null);

  const heigthKeyWord = (text: string, keord: string) => {
    const arr = text.split(keord)
    console.log(text, keord)
    console.log(arr)
    return arr.map((item, index) => {
      if (index % 2 === 1) {
        return <>
          <span className={styles.highLight}>{keord}</span>
          <span>{item}</span>
        </>
      } else {
        return <span>{item}</span>
      }

    })

  }

  // 头部标签icon对应的弹出内容

  const popoverContents = useMemo(() => {
    return {
      // 应用图标弹出内容
      ksapcAppContent: () => {
        return (
          <div className={styles['ksc-app-content']}>
            <div className={styles['title-wrap']}>应用中心</div>
            <div className={styles['list']}>
              {aplicationlinks.map(item => (
                <ApplicationLink key={item.title} item={item} />
              ))}
            </div>
          </div>
        );
      },
      // 微信图标弹出内容
      wechatContent: () => {
        return (
          <div className={styles['wechat-content']}>
            <div className={styles['img-wrap']}>
              <div className={styles.title}>金山表单小程序</div>
              <img className={styles.img} src="/images/wechat-left.png" alt="wps" />
              <div className={styles['footer-text']}>创建分享表单、查看统计</div>
            </div>
            <div className={styles['gap-line']}></div>
            <div className={styles['img-wrap']}>
              <div className={styles.title}>金山表单公众号</div>
              <img className={styles.img} src="/images/wechat-right.png" alt="wps" />
              <div className={styles['footer-text']}>及时接收表单通知</div>
            </div>
          </div>
        );
      },
      // 用户信息弹出内容
      userInfoContent: () => {
        return (
          <div className={styles['user-content']}>
            <div className={styles['title']}>{useInfoLinks.accountManagement.title}</div>
            {useInfoLinks.accountManagement.links.map(item => (
              <div
                key={item.title}
                className={classNames(styles['item-link'], styles['text-hover'])}
                onClick={() => {
                  window.open(item.href);
                }}
              >
                {item.title}
              </div>
            ))}
            <div className={styles['gap-line']}></div>
            <div className={styles['account-wrap']}>
              <div className={styles['title']}>{useInfoLinks.swichAccount.title}</div>
              <div className={styles['login-user-container']}>
                <div className={styles['login-user']}>
                  <div className={styles['avator-wrap']}>
                    <Avatar shape="circle" src={userInfo?.avatar_url} />
                  </div>
                  <div className={styles['nickname-wrap']}>
                    <div className={styles.name}>{userInfo?.nickname}</div>
                    <div className={styles['ellipsis']} title="个人账号">
                      个人账号
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles['other-login']}>
                <Avatar className={styles._rfcsf} shape="circle" icon={<AddIcon></AddIcon>} />
                <div>登陆其他账号</div>
              </div>
            </div>
          </div>
        );
      },
      // 搜索页面弹出内容
      searchContent: () => {
        return (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={isloading}>
            <div className={styles['search-content']}>
              {!isloading && froms.length === 0 && (
                <Empty imgUrl="/images/empty-search.png" title="暂无搜索结果"></Empty>
              )}
              {
                froms.length > 0 && <>
                  {
                    froms.map(item => <div className={classNames(styles['text-hover'], styles['_rsbc'])}>
                      <div>{heigthKeyWord(item.title, intuRef.current?.input?.value as string)}</div>
                      <span>{formatTimeRelative(item.create_ts)} 发布</span>
                    </div>)
                  }
                </>
              }
            </div>
          </Spin>
        );
      },
    };
  }, [froms, userInfo, isloading]);

  // 之后可以尝试修改搜索防抖
  const handleChange = useCallback(
    debounce((value: string) => {
      if (intuRef.current) {
        _searchForms({
          keyword: value,
          limit: 10,
          start: 0,
          _t: Date.now(),
        });
      }
    }, 300),
    []
  );

  const menuContent = <div></div>;
  return (
    <div className={styles.header}>
      <div className={styles['input-wrapper']}>
        <div className={styles['input-wrap']}>
          <Popover
            destroyTooltipOnHide={true}
            open={searchContentOpen}
            className={styles._rfcsf}
            placement="bottom"
            arrow={false}
            rootClassName={styles['search-content-popover']}
            // openClassName={styles['search-content-popover']}
            content={popoverContents.searchContent()}
          >
            <Input
              allowClear={true}
              onChange={e => {
                if (!e.target.value) {
                  setSearchContentOpen(false);
                  return;
                }
                setSearchContentOpen(true);
                handleChange(e.target.value as string);
              }}
              ref={intuRef}
              placeholder="搜索表单"
              prefix={
                <SearchIcon style={{ color: '#0a6cff' }}></SearchIcon>
              }
            />
          </Popover>
        </div>
      </div>
      <div className={styles['user-panel']}>
        <div>
          <Popover
            className={styles._rfcsf}
            trigger={'click'}
            placement="leftBottom"
            content={popoverContents.ksapcAppContent()}
            arrow={false}
          >
            <img src="/images/menu.png" className={styles['menu-icon']} alt="" />
          </Popover>
        </div>
        <div>
          <Popover
            className={styles._rfcsf}
            trigger={'click'}
            placement="leftBottom"
            content={menuContent}
            arrow={false}
          >
            <img src="/images/Ling.png" className={styles['menu-icon']} alt="" />
          </Popover>
        </div>
        <div className={styles['gap-line']}></div>
        <div className={styles['info-tool']}>
          <div className={styles['wechat-scan']}>
            <Popover
              className={styles._rfcsf}
              placement="leftBottom"
              content={popoverContents.wechatContent()}
              arrow={false}
            >
              <WhchateIcon />
            </Popover>
          </div>
          <div className={styles['avator-container']}>
            <Popover
              className={styles._rfcsf}
              trigger={'click'}
              placement="leftBottom"
              content={popoverContents.userInfoContent()}
              arrow={false}
            >
              <Avatar shape="circle" src={'https://avatar.qwps.cn/avatar/V1BTXzE2OTM1MzIwODc='} />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
