import Intl from 'intl';
import 'intl/locale-data/jsonp/vi-VN';

export function formatDate(date, format) {
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

export function dateConverter(date) {
  var cur = new Date();
  if (typeof date !== typeof cur) {
    return 'Hôm nay';
  }

  if (
    date.getFullYear() === cur.getFullYear() &&
    cur.getMonth() === date.getMonth() &&
    cur.getDate() === date.getDate()
  ) {
    return 'Hôm nay';
  }

  return formatDate(date, 'dd/MM/yyyy');
}

export function fromDate(value) {
  return new Date(value);
}

export function paddingNumer(num) {
  if (num < 10) {
    return '0' + num;
  }

  return num + '';
}

export function getDate(date) {
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

export function vnToEn(str) {
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

export function toQueryString(obj) {
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

export function kConverter(value) {
  if (value === '' || value === null || value === undefined) {
    return '0k';
  }

  if (isNaN(+value)) {
    return '0k';
  }

  return (
    (value / 1000).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$&,') + 'k'
  );
}

export function currencyConverter(value) {
  if (value === '' || value === null || value === undefined) {
    return '0 đ';
  }

  if (isNaN(+value)) {
    return '0 đ';
  }

  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$&,') + ' đ';
}

export function groupBy(array = [], f) {
  let groups = {};
  array.forEach(function(o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
}

export function getCategory() {
  return [
    {
      value: 'eating',
      display: 'Ăn uống',
      orderBy: 1,
    },
    {
      value: 'go',
      display: 'Đi lại',
      orderBy: 1,
    },
    {
      value: 'shopping',
      display: 'Mua sắm',
      orderBy: 1,
    },
    {
      value: 'dissipated',
      display: 'Ăn chơi',
      orderBy: 1,
    },
    {
      value: 'education',
      display: 'Học hành',
      orderBy: 1,
    },
    {
      value: 'health',
      display: 'Sức khỏe',
      orderBy: 1,
    },
    {
      value: 'house',
      display: 'Nhà cửa',
      orderBy: 1,
    },
    {
      value: 'wedding',
      display: 'Cưới hỏi',
      orderBy: 1,
    },
    {
      value: 'save',
      display: 'Tiết kiệm',
      orderBy: 1,
    },
    {
      value: 'giveaway',
      display: 'Cho đi',
      orderBy: 1,
    },
    {
      value: 'orther',
      display: 'Khác',
      orderBy: 2,
    },
  ].sort((a, b) => {
    if (a.orderBy > b.orderBy) {
      return 1;
    }

    if (b.orderBy > a.orderBy) {
      return -1;
    }

    return 0;
  });
}
