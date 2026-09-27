export const changeFormat = (value: string) => {
  const mydate = new Date(value);
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][mydate.getMonth()];
  const str = mydate.getDate() + ' ' + month + ' ' + mydate.getFullYear();
  return str;
};

export const rangeDate = (start: string, end: string) => {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // hitung perbedaan waktu dari dua tanggal
  const Difference_In_Time = date2.getTime() - date1.getTime();

  // hitung jml hari antara dua tanggal
  return Difference_In_Time / (1000 * 3600 * 24);
};

export const validationDate = (value: any) => {
  const tanggal = new Date(value).getTime();

  return tanggal === tanggal;
};

export const formatYearMonthDate = (value: string = '') => {
  return new Date(value).toISOString().split('T')[0];
};
