import pureDayJs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';

pureDayJs.locale('th');
pureDayJs.extend(utc);
pureDayJs.extend(isBetween);
pureDayJs.extend(isLeapYear);
pureDayJs.extend(buddhistEra);

export const dayjs = pureDayJs;
