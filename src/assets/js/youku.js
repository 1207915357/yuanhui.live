/**
 * dispatch.
 */
var YK = {};
YK.https = location.protocol;
window.YKU = {};
var YKP = {
  playerType: "",
  playerState: {
    PLAYER_STATE_INIT: 'PLAYER_STATE_INIT',
    PLAYER_STATE_READY: 'PLAYER_STATE_READY',
    PLAYER_STATE_AD: 'PLAYER_STATE_AD',
    PLAYER_STATE_PLAYING: 'PLAYER_STATE_PLAYING',
    PLAYER_STATE_END: 'PLAYER_STATE_END',
    PLAYER_STATE_ERROR: 'PLAYER_STATE_ERROR'
  },

  playerCurrentState: 'PLAYER_STATE_INIT',
  isLoadFinishH5: false,
  isPC: true,
  videoList: [],
  isAndroidYouku: false
};

var StaticDomain = YK.https + "//player.youku.com";

function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsIphone = sUserAgent.match(/iphone/i) == "iphone";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIpad || bIsIphoneOs || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    YKP.isPC = false;
    //YKP.isSupportFlash = false;
  } else {
    YKP.isPC = true;
    //YKP.isSupportFlash = true;
  }
  var bIsYouku = sUserAgent.match(/youku/i) == "youku";
  if (bIsAndroid) {
    if (bIsYouku) {
      YKP.isAndroidYouku = true;
    }
  }

  if (bIsIphone) {
    if (bIsYouku) {
      YKP.isIphoneYouku = true;
    }
  }
}
browserRedirect();

function createIFrame(w, h, parentName, vid, partnerId, password, autoplay, events) {
  if (YKP.isPC) {
    var iframes = document.getElementById(parentName + '').getElementsByTagName("iframe");

    while (iframes.length) {
      var parentElement = iframes[0].parentNode;
      if (parentElement) {
        parentElement.removeChild(iframes[0])
      }
    }

    var iframe = document.createElement('iframe');
    iframe.setAttribute('width', w);
    iframe.setAttribute('height', h);
    iframe.setAttribute('allow', 'autoplay');
    var srcUrl = StaticDomain + '/embed/' + vid + '?client_id=' + partnerId + '&password=' + password + '&autoplay=' + autoplay + '#' + window.location.host;

    if (events && events.onPlayStart) {
      srcUrl += '&onPlayStart=' + events.onPlayStart;
    }

    if (events && events.onPlayEnd) {
      srcUrl += '&onPlayEnd=' + events.onPlayEnd;
    }
    iframe.setAttribute('src', srcUrl);
    iframe.setAttribute('name', 'iframeId');
    iframe.setAttribute('id', 'iframeId');
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('allowfullscreen', true);
    iframe.setAttribute('scrolling', 'no');
    document.getElementById(parentName + '').appendChild(iframe);
    return iframe;
  }
  return null;
}

var urlParameter = function (object) {
  var arr = [];
  for (var o in object) {
    arr.push(o + '=' + object[o]);
  }
  return arr.join('&');
};

window.QS = function () {
  var args = {};
  var result = window.location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
  if (result != null) {
    for (var i = 0; i < result.length; i++) {
      var ele = result[i];
      var inx = ele.indexOf("=");
      //args[ele.substring(1, inx)] = ele.substring(inx + 1);
      var key = ele.substring(1, inx);
      var val = ele.substring(inx + 1);
      try {
        val = decodeURI(val);
      } catch (e) {

      }
      //猫陆卢忙聧垄val Boolean Number Object
      val == "true" ? val = true : (val == "false" ? val == false : isNaN(val) ? val = parseJsonStr(val) : val = +val);
      if ('undefined' == typeof args[key]) {
        args[key] = val;
      } else {
        if (args[key] instanceof Array) {
          args[key].push(val);
        } else {
          args[key] = [args[key], val];
        }
      }
    }
  }
  return args;
}

function parseJsonStr(str) {
  if ('string' != typeof str) {
    return str;
  }
  if (/{[^{^}]{0,}}/.test(str)) {
    try {
      str = JSON.parse(str);
    } catch (e) {

    }
  }
  return str;
}

var dynamicLoading = {
  css: function (path) {
    if (!path || path.length === 0) {
      throw new Error('argument "path" is required !');
    }
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.href = path;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    head.appendChild(link);
  },
  js: function (path, obj, attr) {
    if (!path || path.length === 0) {
      throw new Error('argument "path" is required !');
    }
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = path;
    script.type = 'text/javascript';
    if (attr) {
      script["id"] = attr["id"];
      script.setAttribute('pageType', attr["pageType"]);
      script.setAttribute('isHidden', attr["isHidden"]);
    }
    head.appendChild(script);

    script.onload = function () {
      if (obj) {
        obj.selectH5();
        YKP.isLoadFinishH5 = true;
      }
    }
  }
}

dynamicLoading.css(YK.https + "//player.youku.com/unifull/css/unifull.min.css?v=20190124");

var YoukuPlayerSelect = function (params) {

  YK.initConfig = params;
  this._vid = params.vid;
  this._target = params.target;
  this._partnerId = params.partnerId;
  this._videoFlag = params.videoFlag;
  if (params.client_id) {
    //鍏煎openapi涓殑client_id鐨勮缃�
    this._partnerId = params.client_id;
  }

  if (!(this._vid && this._target && this._partnerId)) {
    alert(
      "[Fail]The params of {vid,target,client_id} are necessary !"
    );
    return;
  }

  this._events = params.events;
  YK.playerEvents = params.events;

  this._id = params.id;
  if (this._id == null) this._id = "youku-player";
  YKP.playerId = this._id;
  this._width = params.width;
  this._height = params.height;
  this._expand = params.expand;
  if (params.width == null || params.height == null) {
    //瀹介珮鎸囧畾涓嶅叏锛岄粯璁や负0
    if (params.expand == null) {
      this._expand = 0;
    }
  } else {
    //瀹介珮閮芥寚瀹氾紝榛樿涓�1
    if (params.expand == null) {
      this._expand = 1;
    }
  }

  // this._prefer = (params.prefer ? params.prefer.toLowerCase() : "flash");
  this._starttime = params.starttime;
  this._password = params.password ? params.password : '';
  this._poster = params.poster;
  this._autoplay = !!params.autoplay; // 0 ,1 ,true ,false,'true','false'..
  this._canWide = params.canWide;
  if ('undefined' != typeof params.show_related) {
    this._showRelated = !!params.show_related;
  }

  this._embed_content = params.embed_content;
  this._embed_vid = params.embed_vid;
  this._cancelFullScreen = params.cancelFullScreen;
  this._titleStyle = params.titleStyle;
  this._source = params.source;
  this._newPlayer = params.newPlayer;
  this._winType = params.wintype;

  //鎾斁椤典笓闂ㄥ弬鏁�
  this._playlistconfig = params.playlistconfig;
  this._isMobile = YKP.isMobile;
  this._isMobileIOS = YKP.isMobileIOS;

  //this._weixin = params.weixin;
  YK.isWeixin = YKP.isWeixin; //false;
  //寰俊涓撶敤鍙傛暟
  if ('undefined' != typeof params.weixin) {
    YK.isWeixin = !!params.weixin; //!!氓陇鈥撁┢捖ぢ� 氓鈥β� weixin=fasle 盲鹿鸥氓聫炉盲禄楼莽鈥澟该︹€⑺�
  }

  this._loop = !!params.loop || false;
  // more ..

  this._playerType = "";

};
YoukuPlayerSelect.prototype = {
  isPC: function () {
    return YKP.isPC;
  }, //todo
  select: function () {
    this.selectHandler();
  },
  selectHandler: function () {
    var url;
    if (this.isPC()) {
      YKP.isLoadFinishH5 = true;
    } else {
      //	dynamicLoading.js(YK.https + "//g.alicdn.com/ku/ykbannerLoader/1.0.01/js/ykbannerLoader.min.js", null, {"id":"ykbannerLoader", "pageType":"player", "isHidden":true});
      url = YK.https + "//player.youku.com/unifull/js/unifull.min.js?v=20190124";
    }
    if (YKP.isLoadFinishH5) {
      this.selectH5();
    } else {
      dynamicLoading.js(url, this);
    }


    if (this._events && this._events.onPlayerReady) {
      var callback = this._events.onPlayerReady;
      var check = setInterval(function () {
        // if ($(YKP.playerId)) {
        //     YKP.playerCurrentState = YKP.playerState.PLAYER_STATE_READY;
        //     debug.log(YKP.playerCurrentState);

        try {
          //    LocalStorage.appendItem('phase', 'playerready');
          callback();
        } catch (e) {}
        clearInterval(check);
        //}
      }, 500);
    }
  },
  selectH5: function () {
    if (YKP.isPC) {
      this.selectPCH5();
    } else {
      this.selectMobileH5();
    }
  },

  selectMobileH5: function () {
    var self = this;
    var playerDom = document.getElementById(this._target);
    if (this._width > 0 && this._height > 0) {
      playerDom.style.width = this._width + "px";
      playerDom.style.height = this._height + "px";
    } else {
      //var cw = document.documentElement.clientWidth;
      //var ch = document.documentElement.clientHeight;
      var cw = playerDom.offsetWidth;
      var ch = playerDom.offsetHeight;

      function resize(playerDom) {
        //playerDom.style.width = cw + "px";
        //playerDom.style.height = 9 * cw / 16 + "px";

        playerDom.style.width = cw + "px";
        playerDom.style.height = ch + "px";
      }
      resize(playerDom);
    }

    var closeFullFullScreen = 0;
    if (self._cancelFullScreen == 1 && YKP.isAndroidYouku) {
      closeFullFullScreen = 1;
    }

    var config = {
      videoId: self._vid, //瑙嗛id
      ccode: "0590", //娓犻亾id
      client_id: self._partnerId, //浼橀叿瑙嗛浜戝垱寤哄簲鐢ㄧ殑client_id
      control: {
        laguange: "", //榛樿浣跨敤鐨勮瑷€绫诲瀷
        hd: "mp4hd", //榛樿浣跨敤鐨勭爜鐜�
        //   hd:"m3u8",
        autoplay: false //鏄惁鑷姩鎾斁
      },
      logconfig: {

      }, //缁熻鎵╁睍鍙傛暟锛屽寘鎷琣plus鎺ュ彛涓殑鍏ㄥ眬瀵硅薄鏃舵暟鎹紝鐢ㄤ簬浼犻€掔粰缁熻鎺ュ彛
      adConfig: {

      }, //骞垮憡鎵╁睍鍙傛暟
      password: self._password, //瑙嗛鎾斁瀵嗙爜锛岀敤浜庡姞瀵嗚棰戯紙杩欎釜鏄惁鍙互浼犲叆鏆傚畾锛�
      wintype: "", //姣忕鍥哄畾鐨勫弬鏁帮紝澶氱敤浜庣粺璁★紝涓嶇‘瀹氭槸鍚﹁繕闇€瑕�
      type: "", //鎾斁绫诲瀷锛坧c,pad,mobile锛夋殏瀹�,
      events: self._events,

      embed_vid: self._embed_vid,
      embed_content: self._embed_content,
      titleStyle: self._titleStyle,
      source: self._source,
      closeFullFullScreen: closeFullFullScreen,
      isIphoneYouku: YKP.isIphoneYouku,
      imgPoster: self._poster
    };
    this._h5player = YKPlayer.Player(this._target, config);
  },

  selectPCH5: function () {
    var self = this;
    self.mobtest = 'mobtest';
    var cw;
    var ch;
    if (this._width > 0 && this._height > 0) {
      cw = this._width;
      ch = this._height;
    } else {
      //var playerDom = document.getElementById(this._target);
      //var cw = document.documentElement.clientWidth;
      //var ch = document.documentElement.clientHeight;
      //var cw = playerDom.offsetWidth;
      //var ch = playerDom.offsetHeight;
      cw = '100%';
      ch = '100%';

    }
    createIFrame(cw, ch, self._target, self._vid, self._partnerId, self._password, self._autoplay, self._events);

  },

  onorientationchange: function () {
    //var self = this;
    var playerDom = document.getElementById(this._target);
    setTimeout(function () {
      var cw = document.documentElement.clientWidth;
      var ch = document.documentElement.clientHeight;
      playerDom.style.width = cw + "px";
      playerDom.style.height = 9 * cw / 16 + "px";

    }, 300);
  },
  isThirdParty: function () {

    var cid = this._partnerId;
    if (cid != null && (cid + '').length == 16) {
      return true;
    };

    return false;
  },
};

/**
 * 浠ヤ笅鏄粺涓€鐨勬帴鍙ｏ紝鐢ㄤ簬澶栭儴缁熶竴鎿嶄綔 Flash 鍜� H5鎾斁鍣�
 *   鐩存帴浼犲叆鍙傛暟杩涜鍒濆鍖�
 *    -- api document --
 *   //open.youku.com/docs/api/player
 *   鐢ㄦ埛鍚嶏細api
 *   瀵嗙爜锛歽oukuopenapi
 *
 */
YKU.Player = function (target, config) {
  config.target = target;
  this.select = new YoukuPlayerSelect(config);
  this.select.select();
  this._player = "";
};
YKU.Player.prototype = {
  player: function () {
    if (this._player != "") {
      return this._player;
    }
    if (YKP.isPC) {
      this._player = new YKFlashPlayer();
    } else {
      this._player = new YKH5Player(this.select._h5player);
    }
    return this._player;
  },
  //@deprecated
  resize: function (dom, width, height) {
    if (dom && Number(width) && Number(height)) {
      dom.style ? dom.style.width = width + 'px' : null;
      dom.style ? dom.style.height = height + 'px' : null;
    } else {
      console.log('resize鏂规硶涓嶅彲鐢�,缂哄皯鍙傛暟!');
    }
  },
  currentTime: function () {
    return this.player().currentTime();
  },
  totalTime: function () {
    return this.player().totalTime();
  },
  playVideo: function () {
    this.player().playVideo();
  },
  startPlayVideo: function () {
    this.player().startPlayVideo();
  },
  pauseVideo: function () {
    this.player().pauseVideo();
  },
  seekTo: function (timeoffset) {
    this.player().seekTo(timeoffset);
  },
  hideControls: function () {
    this.player().hideControls();
  },
  showControls: function () {
    this.player().showControls();
  },
  /** mute:function(){},
   unmute:function(){},
   setVolume:function(){},
   getVideoMetaData:function(){},*/
  playVideoById: function (vid) {
    this.player().playVideoById(vid);
  },
  //special api for youku h5,not open api
  switchFullScreen: function () {
    try {
      this.player().switchFullScreen();
    } catch (e) {

    }

  },
  getVideoList: function () {
    return this.player().getVideoList();
  }

};

var YKFlashPlayer = function () {
  this._player = document.getElementById(YKP.playerId);
};
YKFlashPlayer.prototype = {
  resize: function (width, height) {
    this._player.style.width = width + 'px';
    this._player.style.height = height + 'px';
  },
  currentTime: function () {
    var arr = this._player.getPlayerState().split("|");
    if (arr.length >= 3)
      return arr[2];
    else
      return -1;
  },
  totalTime: function () {
    var arr = this._player.getPlayerState().split("|");
    if (arr.length >= 4)
      return arr[3];
    else
      return -1;
  },
  playVideo: function () {
    this._player.pauseVideo(false);
  },
  pauseVideo: function () {
    this._player.pauseVideo(true);
  },
  seekTo: function (timeoffset) {
    this._player.nsseek(timeoffset);
  },
  playVideoById: function (vid) { //encoded vid  氓颅鈥斆γぢ嘎裁ヂ铰⒚ヂ悸徝♀€瀡id
    this._player.playVideoByID(vid);
  },
  hideControls: function () {
    this._player.showControlBar(false);
  },
  showControls: function () {
    this._player.showControlBar(true);
  },
  state: function () {
    this._player.state();
  }
};

/**
 * @param player  YoukuHTML5Player
 */
var YKH5Player = function (player) {

  this._player = player;
};
YKH5Player.prototype = {
  resize: function (width, height) {
    this._player.style.width = width + 'px';
    this._player.style.height = height + 'px';
  },
  currentTime: function () {
    return this._player.currentTime;
  },
  totalTime: function () {
    return this._player.totalTime;

  },
  playVideo: function () {
    this._player.play();
  },

  pauseVideo: function () {
    this._player.pause();
  },

  seekTo: function (timeoffset) {
    try {
      //  this._player.currentTime = timeoffset;
      this._player.seek(timeoffset);
    } catch (e) {}
  }
}

function executeScript() {
  var _scripts = document.getElementsByTagName("script"),
    _len = _scripts.length;
  for (var i = 0; i < _len; i++) {
    if (_scripts[i].src.indexOf("//player.youku.com/jsapi") > -1) {
      if (_scripts[i].innerHTML) {
        console.log('%c浼橀叿瑙嗛浜�:鎾斁鍣ㄥ垵濮嬪寲浠ｇ爜锛岃鍗曠嫭鍦ㄦ柊鐨剆cript鏍囩鍐呫€傚惁鍒欎細閫犳垚鏃犳硶鎾斁锛�', 'color:red');
        eval(_scripts[i].innerHTML);
        break;
      }
    }
  }
}
executeScript();