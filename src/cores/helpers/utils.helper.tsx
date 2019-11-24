export function formatDate(date: Date, format: string): string {
  switch (format) {
    case 'dd/MM/yyyy':
      return (
        paddingNumer(date.getDate()) +
        '/' +
        paddingNumer(date.getMonth() + 1) +
        '/' +
        date.getFullYear()
      );

    default:
      return (
        paddingNumer(date.getDate()) +
        '-' +
        paddingNumer(date.getMonth() + 1) +
        '-' +
        date.getFullYear()
      );
  }
}

export function fromDate(value: string): Date {
  return new Date(value);
}

export function paddingNumer(num: number): string {
  if (num < 10) {
    return '0' + num;
  }

  return num + '';
}

export function getDate(date: Date): string {
  const day = date.getDate(); // yields date
  const month = date.getMonth() + 1; // yields month (add one as '.getMonth()' is zero indexed)
  const year = date.getFullYear(); // yields year
  const hour = date.getHours(); // yields hours
  const minute = date.getMinutes(); // yields minutes
  const second = date.getSeconds(); // yields seconds

  // After this construct a string with the above results as below
  return (
    month + '/' + day + '/' + year + ' ' + hour + ':' + minute + ':' + second
  );
}

export function vnToEn(str: any) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/ /g, '-');
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/[^a-zA-Z0-9-]/g, '');
  return str;
}

export function toQueryString(obj: any) {
  if (obj) {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p) && obj[p] !== undefined && obj[p] !== '') {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }

    return '&' + str.join('&');
  }
}
