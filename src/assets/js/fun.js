import Vue from 'vue'
import moment from 'moment'

  //时间格式化
  Vue.prototype.formatTime = (time, style) => {
    return moment(time).format(style);
  }
  //
  Vue.prototype.getCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
