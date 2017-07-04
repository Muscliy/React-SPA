var myRegExp = {
  // 检查字符串是否为合法QQ号码
  isQQ: function (str) {
    // 1 首位不能是0  ^[1-9]
    // 2 必须是 [5, 11] 位的数字  \d{4, 9}
    var reg = /^[1-9][0-9]{4,9}$/gim;
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  // 检查字符串是否为合法手机号码
  isPhone: function (str) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  // 检查字符串是否为合法Email地址
  isEmail: function (str) {
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    // var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  // 检查字符串是否是数字
  isNumber: function (str) {
    var reg = /^\d+$/;
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  // 去掉前后空格
  trim: function (str) {
    var reg = /^\s+|\s+$/g;
    return str.replace(reg, '');
  },
  // 检查字符串是否存在中文
  isChinese: function (str) {
    var reg = /[\u4e00-\u9fa5]/gm;
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  // 检查字符串是否为合法邮政编码
  isPostcode: function (str) {
    // 起始数字不能为0，然后是5个数字  [1-9]\d{5}
    var reg = /^[1-9]\d{5}$/g;
    // var reg = /^[1-9]\d{5}(?!\d)$/;
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  // 检查字符串是否为合法身份证号码
  isIDcard: function (str) {
    var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  // 检查字符串是否为合法URL
  isURL: function (str) {
    var reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  // 检查字符串是否为合法日期格式 yyyy-mm-dd
  isDate: function (str) {
    var reg = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/;
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  // 检查字符串是否为合法IP地址
  isIP: function (str) {
    // 1.1.1.1  四段  [0 , 255]
    // 第一段不能为0
    // 每个段不能以0开头
    //
    var reg = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/gi;
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  }
}
