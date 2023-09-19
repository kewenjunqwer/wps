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

// 在一段话中找到高亮的字段
export const highlightKeywordsArray = (data: string, keywords: string[]) => {
  const keywordRegex = new RegExp(`(${keywords.join('|')})`, 'gi');
  const substrings = data.split(keywordRegex);
  const highlightedArray = [];
  for (let i = 0; i < substrings.length; i++) {
    const substring = substrings[i];
    const isKeyword = keywords.includes(substring.toLowerCase());
    highlightedArray.push({ data: substring, highlight: isKeyword });
  }
  console.log(highlightedArray);
  return highlightedArray;
};

// export function getUrlParam(key: string, defaultValue: string) {
//   const obj = {};
//   try {
//     const u = new URL(window.location.href); // 该api会自动判断是是不是有效网址
//     for (const [k, v] of u.searchParams.entries()) {
//       obj[k] = v;
//     }
//     if (obj[key]) {
//       return obj[key];
//     } else {
//       return defaultValue;
//     }
//   } catch (error) {
//     return obj;
//   }
// }
