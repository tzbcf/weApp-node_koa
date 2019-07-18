const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
     // 将音频时间戳返回为时间格式
     let h = Math.floor(parseInt(date, 10) / 1000 / 3600).toString();
     if (parseInt(h, 10)) {
       if (parseInt(h, 10) < 10) {
         h = '0' + h + ':';
       } else {
         h = h + ':';
       }
     } else {
       h = '';
     }
     const rem = (parseInt(date, 10) / 1000) % 3600;
     let m = Math.floor(rem / 60).toString();
     if (parseInt(m, 10) < 10) {
       m = '0' + m;
     }
     let s = Math.floor(rem % 60).toString();
     if (parseInt(s, 10) < 10) {
       s = '0' + s;
     }
     return `${h}${m}:${s}`;
}

const formatDateStr = (date) => {
  const t = parseInt(date, 10) / 1000;
  const d = t % 3600;
  let h = '';
  let m = '';
  let s = '';
  if (t >= 3600) {
    h = Math.floor(t / 3600).toString();
    if (parseInt(h, 10) < 10) {
      h = '0' + h;
    }
    h = h + ':';
  }
  m = Math.floor(d / 60).toString();
  if (parseInt(m, 10) < 10) {
    m = '0' + m;
  }
  s = Math.floor(d % 60).toString();
  if (parseInt(s, 10) < 10) {
    s = '0' + s;
  }
  return `${h}${m}:${s}`;
};

module.exports = {
  formatTime,formatDate,formatDateStr
}
