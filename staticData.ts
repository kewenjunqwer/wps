interface AplicationLink {
  iconUrl: string;
  title: string;
  subtitle: string;
  href: string;
}

export const aplicationlinks: AplicationLink[] = [
  {
    iconUrl: '/images/application_center/document.svg',
    title: '文档',
    subtitle: '多人协作在线文档',
    href: '',
  },
  {
    iconUrl: '/images/application_center/meeting.svg',
    title: '会议',
    subtitle: '云上开会，协作无间',
    href: '',
  },
  {
    iconUrl: '/images/application_center/needTodeal.png',
    title: '待办',
    subtitle: '团队任务协作，多平台同步',
    href: '',
  },
  {
    iconUrl: '/images/application_center/calendar.svg',
    title: '日历',
    subtitle: '高校的日程管理工具',
    href: '',
  },
  {
    iconUrl: '/images/application_center/adressbook.png',
    title: '通讯录',
    subtitle: '添加伙伴，高效团队办公',
    href: '',
  },
];
