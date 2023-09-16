import { ReactNode } from 'react';
export interface ApiRes<T> {
  code: number;
  result: string;
  data: T;
}
export interface ILink {
  title: string;
  icon: string;
  key: string;
}
export interface APPlicationLink {
  iconUrl: ReactNode;
  title: string;
  subtitle: string;
  href: string;
  iconType: 'img' | 'svg';
}

export interface TemplatesInfo {
  title: string;
  customMainPicture: string;
  templateId: number;
}
interface a {

}

