import dayjs from 'dayjs';

export function calcaulateDiff(timeInMs) {
  const timestamDayjs = dayjs(timeInMs);
  const nowDayjs = dayjs();

  if (timestamDayjs.isBefore(nowDayjs)) {
    return {
      seconds: '00',
      minutes: '00',
      hours: '00',
      days: '00',
    };
    return {
      seconds: getRemainingSeconds(nowDayjs, timestamDays),
      minutes: getRemainingMinutes(nowDayjs, timestamDays),
      hours: getRemainingHours(nowDayjs, timestamDays),
      days: getRemainingDays(nowDayjs, timestamDays),
    };
  }
  console.log('************', timestamDayjs);
}
