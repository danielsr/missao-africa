import dayjs from 'dayjs';

export function toDatetimeLocal(dateUtc: string) {
  return dayjs(dateUtc).format('YYYY-MM-DDTHH:mm');
}
