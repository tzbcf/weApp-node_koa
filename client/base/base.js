class Base {
  constructor() {
    this.model = 'dev';
    if (this.model == 'dev') {
      this.url = 'http://locahost:8080';
    } else {
      this.url = 'https://www.terrorblade.xyz';
    }
    this.appSecret = '5e374051cbe17c77b8d7b5cdade3954e';
    this.appID = 'wx61f477a6ac0e209a';
  }
  axios(object) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: object.url,
        method: object.method || 'POST',
        data: object.data,
        header: { ...object.header },
        success(res) {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        },
        fail(err) {
          reject(err);
        }
      })
    })
  }
  formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  }
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  listSestore(arr) {
    return arr.map(v => {
      v.status = -1;
      return v;
    });
  }
  verdict(arr1, arr2) {
    let arr = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].status === 0) {
        arr.push((i + 1).toString());
      }
    }
    const a = this.array_intersection(arr, arr2); // 获取选中数组和答案数组的交集
    const b = this.array_difference(arr, arr2); // 获取差集
    const c = this.array_union(a,arr2); // 获取缺少选中的答案
    for(let i=0;i<a.length;i++) { // 选中的正确的答案
      arr1[a[i]-1].status = 1;
    }
    for(let i=0;i<b.length;i++) { // 选错的答案
      arr1[b[i]-1].status = 2;
    }
    for(let i=0;i<c.length;i++) { // 没选的答案
      if (!a.length) {
        arr1[c[i]-1].status = 1;
      } else {
        arr1[c[i]-1].status = 3;
      }
    }
    return {
      select:arr,
      answer:arr1
    };
  }
  array_intersection(a, b) {
    var result = [];
    for (var i = 0; i < b.length; i++) {
      var temp = b[i];
      for (var j = 0; j < a.length; j++) {
        if (temp === a[j]) {
          result.push(temp);
          break;
        }
      }
    }
    return this.array_remove_repeat(result);
  }
  array_difference(a, b) { // 差集 a - b
    //clone = a
    var clone = a.slice(0);
    for (var i = 0; i < b.length; i++) {
      var temp = b[i];
      for (var j = 0; j < clone.length; j++) {
        if (temp === clone[j]) {
          clone.splice(j, 1);
        }
      }
    }
    return this.array_remove_repeat(clone);
  }
  array_remove_repeat(a) { // 去重
    var r = [];
    for (var i = 0; i < a.length; i++) {
      var flag = true;
      var temp = a[i];
      for (var j = 0; j < r.length; j++) {
        if (temp === r[j]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        r.push(temp);
      }
    }
    return r;
  }
  array_union(a, b) { //缺集
    let arr = [];
    for(let i=0;i<b.length;i++){
      if(!a.includes(b[i])){
        arr.push(b[i]);
      }
    }
    return this.array_remove_repeat(arr);
  }
  shareConfig(obj={}){
    return {
      title: obj.title || '我是答题王,不服来战',
      imageUrl: obj.imageUrl || 'https://w1.tingdao.com/web/img/wxApp/logo.jpeg',
      path: obj.path || '/pages/index/index' // 路径，传递参数到指定页面。
     }
  }
}

export default Base;
