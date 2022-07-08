function setCookie(name: string, value: any, expireDays?: number) {
  //
  if (expireDays) {
    const todayDate: Date = new Date();

    todayDate.setDate(todayDate.getDate() + expireDays);

    document.cookie = name + '=' + escape(value) + '; path=/; expires=' + todayDate.toUTCString() + ';';
  } else {
    document.cookie = name + '=' + escape(value) + '; path=/;';
  }
}

function getCookie(name: string) {
  //
  name += '=';
  const cookieData = document.cookie;
  let start = cookieData.indexOf(name);
  let cookieValue = '';

  if (start !== -1) {
    start += name.length;
    let end = cookieData.indexOf(';', start);

    if (end === -1) {
      end = cookieData.length;
    }
    cookieValue = cookieData.substring(start, end);
  }
  return unescape(cookieValue);
}

function deleteCookie(name: string) {
  //
  document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export default {
  set: setCookie,
  get: getCookie,
  delete: deleteCookie,
};
