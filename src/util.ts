import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn', {
  relativeTime: {
    future: '%s',
    past: '%s',
    s: '刚刚',
    m: '1分钟前',
    mm: '%d 分钟前',
    h: '1小时前',
    hh: '%d 小时前',
    d: '1天前',
    dd: '%d 天前',
    M: '1月前',
    MM: '%d 月前',
    y: '1年前',
    yy: '%d 年前',
  },
});

export const formatTimeRelative = (time: number) => {
  return dayjs(time / 1000000).fromNow();
};
