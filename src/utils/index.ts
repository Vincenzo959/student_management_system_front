import { MenuItem } from "@/types";
import dayjs from "dayjs";

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
export const handerField = function <T extends object, K extends keyof T>(
  obj: T,
  key: K
) {
  return obj[key];
};

function doTime(d: any) {
  if (d < 10) {
    d = "0" + d;
  }
  return d;
}
export const Util = {
  formateDate(time: string | number | Date) {
    const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    if (!time) return "";
    let date = new Date(time);
    return (
      weeks[dayjs().day()] +
      " " +
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      doTime(date.getHours()) +
      ":" +
      doTime(date.getMinutes()) +
      ":" +
      doTime(date.getSeconds())
    );
  },
};
