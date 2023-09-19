/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useMemo } from 'react';

import styles from './style.module.scss';
import { Avatar, Popover } from 'antd';

import ApplicationLink from '../../component/applicationLink';

import { userContext } from '../../context/user';

import { ReactComponent as WhchateIcon } from '../../assets/header/wechat.svg';
import { ReactComponent as DocumentIcon } from '../../assets/header/document.svg';
import { ReactComponent as MettingIcon } from '../../assets/header/metting.svg';
import { ReactComponent as CalendarIcon } from '../../assets/header/calendar.svg';
import { ReactComponent as AddIcon } from '../../assets/leftslider/add.svg';
import { ReactComponent as CheckIcon } from '../../assets/form/checked.svg';

import classNames from 'classnames';
import { APPlicationLink } from '../../modal/base';
import SearchForm from '../../component/search.ts';

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
    iconUrl: (
      <img className={styles['app-img']} src={'/images/application_center/needTodeal.png'} alt="" />
    ),
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
    iconUrl: (
      <img className={styles['app-img']} src={'/images/application_center/adressbook.png'} alt="" />
    ),
    title: '通讯录',
    subtitle: '添加伙伴，高效团队办公',
    href: 'https://docs.wps.cn/contact',
    iconType: 'img',
  },
];

export default function Header() {
  const { userInfo, _logOut, _changLoginAccount } = useContext(userContext); // 去除用户信息
  // 头部标签icon对应的弹出内容
  const useInfoLinks = {
    accountManagement: {
      title: '账号管理',
      links: [
        {
          title: '个人中心',
          onclick: () => {
            window.open('https://account.wps.cn/usercenter/apps');
          },
        },
        {
          onclick: () => {
            window.open('https://f.wps.cn/forms/commoninfo');
          },
          title: '常用信息管理',
        },
        {
          title: '偏好设置',
          onclick: () => {
            window.open('https://f.wps.cn/forms/preference-setting');
          },
        },
        {
          title: '退出账号',
          onclick: _logOut,
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
              <img alt={'wps'} className={styles.img} src="/images/wechat-left.png" />
              <div className={styles['footer-text']}>创建分享表单、查看统计</div>
            </div>
            <div className={styles['gap-line']}></div>
            <div className={styles['img-wrap']}>
              <div className={styles.title}>金山表单公众号</div>
              <img alt={'wps'} className={styles.img} src="/images/wechat-right.png" />
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
                onClick={item.onclick}
              >
                {item.title}
              </div>
            ))}
            <div className={styles['gap-line']}></div>
            <div className={styles['account-wrap']}>
              <div className={styles['title']}>{useInfoLinks.swichAccount.title}</div>
              <div className={styles['login-user-container']}>
                {userInfo.map(item => (
                  <div
                    key={item.userid}
                    onClick={() => {
                      if (!item.is_current) {
                        _changLoginAccount(item.userid, 'v1-web-form-login', location.href);
                      }
                    }}
                    className={styles['login-user']}
                  >
                    <div className={styles['avator-wrap']}>
                      <Avatar alt="wps" shape="circle" src={item?.avatar_url} />
                    </div>
                    <div className={styles['nickname-wrap']}>
                      <div className={classNames(styles._rsbc, styles.name)}>
                        <span>{item.nickname}</span>
                        {item.is_current && <CheckIcon style={{ color: '#0a6cff' }}></CheckIcon>}
                      </div>
                      <div className={styles['ellipsis']} title="个人账号">
                        {item?.company_name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles['other-login']}>
                <Avatar
                  alt="wps"
                  className={styles._rfcsf}
                  shape="circle"
                  icon={<AddIcon></AddIcon>}
                />
                <div>登陆其他账号</div>
              </div>
            </div>
          </div>
        );
      },
      // 搜索页面弹出内容
    };
  }, [userInfo]);

  const menuContent = <div></div>;
  return (
    <div className={styles.header}>
      <div className={styles['input-wrapper']}>
        <div className={styles['input-wrap']}>
          <SearchForm />
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
            <img alt={'wps'} src="/images/menu.png" className={styles['menu-icon']} />
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
            <img alt={'wps'} src="/images/Ling.png" className={styles['menu-icon']} />
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
              <Avatar
                alt="wps"
                shape="circle"
                src={'https://avatar.qwps.cn/avatar/V1BTXzE2OTM1MzIwODc='}
              />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
