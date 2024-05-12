import { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export interface User {
  role?: string;
  id?: string;
  name?: string;
  id_card?: string;
  sex?: string;
  phone?: string;
  age?: string;
}

export type LoginType = 'patient' | 'doctor' | 'admin';
