class Base {
  axios (object) {
    return new Promise((resolve, reject) => {
      wx.request({
          url:object.url,
          method:object.method,
          data:object.data,
          header:{...object.header},
          success(res){
              resolve(res);
          },
          fail(err){
              reject(err)
          }
      })
    })
  }
  formatTime (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  }
  formatNumber (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  } 
}

export default Base;
