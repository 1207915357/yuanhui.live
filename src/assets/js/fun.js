import Vue from 'vue'
import moment from 'moment'
moment.locale('zh-cn');

  //时间格式化
  Vue.prototype.formatTime = (time, style) => {
    return moment(time).format(style);
  }
  //距离时间
  Vue.prototype.formatTimeToNow = (time) => {
    let theTime =  moment(time).startOf('minutes').fromNow();;
    if(theTime == "几秒前"){
      theTime = '刚刚'
    }
    return theTime
  }
  //cookie操作
  Vue.prototype.$_getCookie = (cname) => {
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
  Vue.prototype.$_setCookie = (cname, cvalue, exdays)=> {
     var d = new Date();
     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
     var expires = "expires=" + d.toGMTString();
     document.cookie = cname + "=" + cvalue + "; " + expires;
   }