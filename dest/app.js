(function () {
    'use strict';

    function subscribe() {
      this.follow = function (type, listener) {
        if (this._listeners === undefined) this._listeners = {};
        var listeners = this._listeners;

        if (listeners[type] === undefined) {
          listeners[type] = [];
        }

        if (listeners[type].indexOf(listener) === -1) {
          listeners[type].push(listener);
        }
      };

      this.has = function (type, listener) {
        if (this._listeners === undefined) return false;
        var listeners = this._listeners;
        return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
      };

      this.remove = function (type, listener) {
        if (this._listeners === undefined) return;
        var listeners = this._listeners;
        var listenerArray = listeners[type];

        if (listenerArray !== undefined) {
          var index = listenerArray.indexOf(listener);

          if (index !== -1) {
            listenerArray.splice(index, 1);
          }
        }
      };

      this.send = function (type) {
        var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (this._listeners === undefined) return;
        var listeners = this._listeners;
        var listenerArray = listeners[type];

        if (listenerArray !== undefined) {
          event.target = this;
          var array = listenerArray.slice(0);

          for (var i = 0, l = array.length; i < l; i++) {
            array[i].call(this, event);
          }
        }
      };

      this.destroy = function () {
        this._listeners = null;
      };
    }

    function start$3() {
      return new subscribe();
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function toObject(a) {
      if (Object.prototype.toString.call(a) === '[object Object]') return a;else {
        a = {};
        return a;
      }
    }

    function toArray(a) {
      if (Object.prototype.toString.call(a) === '[object Object]') {
        var b = [];

        for (var i in a) {
          b.push(a[i]);
        }

        return b;
      } else if (typeof a == 'string' || a == null) return [];else return a;
    }

    function decodeJson(string, empty) {
      var json = empty || {};

      if (string) {
        try {
          json = JSON.parse(string);
        } catch (e) {}
      }

      return json;
    }

    function isObject(a) {
      return Object.prototype.toString.call(a) === '[object Object]';
    }

    function isArray(a) {
      return Object.prototype.toString.call(a) === '[object Array]';
    }

    function extend(a, b, replase) {
      for (var i in b) {
        if (_typeof(b[i]) == 'object') {
          if (a[i] == undefined) a[i] = Object.prototype.toString.call(b[i]) == '[object Array]' ? [] : {};
          this.extend(a[i], b[i], replase);
        } else if (a[i] == undefined || replase) a[i] = b[i];
      }
    }

    function empty$1(a, b) {
      for (var i in b) {
        if (!a[i]) a[i] = b[i];
      }
    }

    function getKeys(a, add) {
      var k = add || [];

      for (var i in a) {
        k.push(i);
      }

      return k;
    }

    function getValues(a, add) {
      var k = add || [];

      for (var i in a) {
        k.push(a[i]);
      }

      return k;
    }

    function remove$1(from, need) {
      var inx = from.indexOf(need);
      if (inx >= 0) from.splice(inx, 1);
    }

    function clone(a) {
      return JSON.parse(JSON.stringify(a));
    }

    function insert(where, index, item) {
      where.splice(index, 0, item);
    }

    function destroy$8(arr) {
      var call_function = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'destroy';
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var where = toArray(arr);

      for (var i = where.length - 1; i >= 0; i--) {
        if (where[i] && where[i][call_function]) where[i][call_function](value);
      }
    }

    var Arrays = {
      toObject: toObject,
      toArray: toArray,
      decodeJson: decodeJson,
      isObject: isObject,
      isArray: isArray,
      extend: extend,
      getKeys: getKeys,
      getValues: getValues,
      insert: insert,
      clone: clone,
      remove: remove$1,
      destroy: destroy$8,
      empty: empty$1
    };

    var html$Z = "<div class=\"head\">\n    <div class=\"head__body\">\n        <div class=\"head__logo-icon\">\n            <img src=\"./img/logo-icon.svg\" />\n        </div>\n\n        <div class=\"head__split\"></div>\n\n        <div class=\"head__logo\">\n            <img src=\"./img/logo.svg\" />\n        </div>\n\n        <div class=\"head__title\">\n            \n        </div>\n\n        <div class=\"head__action head__settings selector open--settings\">\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n            viewBox=\"0 0 368 368\" style=\"enable-background:new 0 0 368 368;\" xml:space=\"preserve\">\n            <g>\n                <g>\n                    <path fill=\"currentColor\" d=\"M344,144h-29.952c-2.512-8.2-5.8-16.12-9.792-23.664l21.16-21.16c4.528-4.528,7.024-10.56,7.024-16.984\n                        c0-6.416-2.496-12.448-7.024-16.976l-22.64-22.64c-9.048-9.048-24.888-9.072-33.952,0l-21.16,21.16\n                        c-7.536-3.992-15.464-7.272-23.664-9.792V24c0-13.232-10.768-24-24-24h-32c-13.232,0-24,10.768-24,24v29.952\n                        c-8.2,2.52-16.12,5.8-23.664,9.792l-21.168-21.16c-9.36-9.36-24.592-9.36-33.952,0l-22.648,22.64\n                        c-9.352,9.36-9.352,24.592,0,33.952l21.16,21.168c-3.992,7.536-7.272,15.464-9.792,23.664H24c-13.232,0-24,10.768-24,24v32\n                        C0,213.232,10.768,224,24,224h29.952c2.52,8.2,5.8,16.12,9.792,23.664l-21.16,21.168c-9.36,9.36-9.36,24.592,0,33.952\n                        l22.64,22.648c9.36,9.352,24.592,9.352,33.952,0l21.168-21.16c7.536,3.992,15.464,7.272,23.664,9.792V344\n                        c0,13.232,10.768,24,24,24h32c13.232,0,24-10.768,24-24v-29.952c8.2-2.52,16.128-5.8,23.664-9.792l21.16,21.168\n                        c9.072,9.064,24.912,9.048,33.952,0l22.64-22.64c4.528-4.528,7.024-10.56,7.024-16.976c0-6.424-2.496-12.448-7.024-16.976\n                        l-21.16-21.168c3.992-7.536,7.272-15.464,9.792-23.664H344c13.232,0,24-10.768,24-24v-32C368,154.768,357.232,144,344,144z\n                            M352,200c0,4.408-3.584,8-8,8h-36c-3.648,0-6.832,2.472-7.744,6c-2.832,10.92-7.144,21.344-12.832,30.976\n                        c-1.848,3.144-1.344,7.144,1.232,9.72l25.44,25.448c1.504,1.504,2.336,3.512,2.336,5.664c0,2.152-0.832,4.16-2.336,5.664\n                        l-22.64,22.64c-3.008,3.008-8.312,3.008-11.328,0l-25.44-25.44c-2.576-2.584-6.576-3.08-9.728-1.232\n                        c-9.616,5.68-20.04,10-30.968,12.824c-3.52,0.904-5.992,4.088-5.992,7.736v36c0,4.408-3.584,8-8,8h-32c-4.408,0-8-3.592-8-8v-36\n                        c0-3.648-2.472-6.832-6-7.744c-10.92-2.824-21.344-7.136-30.976-12.824c-1.264-0.752-2.664-1.112-4.064-1.112\n                        c-2.072,0-4.12,0.8-5.664,2.344l-25.44,25.44c-3.128,3.12-8.2,3.12-11.328,0l-22.64-22.64c-3.128-3.128-3.128-8.208,0-11.328\n                        l25.44-25.44c2.584-2.584,3.088-6.584,1.232-9.72c-5.68-9.632-10-20.048-12.824-30.976c-0.904-3.528-4.088-6-7.736-6H24\n                        c-4.408,0-8-3.592-8-8v-32c0-4.408,3.592-8,8-8h36c3.648,0,6.832-2.472,7.744-6c2.824-10.92,7.136-21.344,12.824-30.976\n                        c1.856-3.144,1.352-7.144-1.232-9.72l-25.44-25.44c-3.12-3.12-3.12-8.2,0-11.328l22.64-22.64c3.128-3.128,8.2-3.12,11.328,0\n                        l25.44,25.44c2.584,2.584,6.576,3.096,9.72,1.232c9.632-5.68,20.048-10,30.976-12.824c3.528-0.912,6-4.096,6-7.744V24\n                        c0-4.408,3.592-8,8-8h32c4.416,0,8,3.592,8,8v36c0,3.648,2.472,6.832,6,7.744c10.928,2.824,21.352,7.144,30.968,12.824\n                        c3.152,1.856,7.152,1.36,9.728-1.232l25.44-25.44c3.016-3.024,8.32-3.016,11.328,0l22.64,22.64\n                        c1.504,1.504,2.336,3.52,2.336,5.664s-0.832,4.16-2.336,5.664l-25.44,25.44c-2.576,2.584-3.088,6.584-1.232,9.72\n                        c5.688,9.632,10,20.048,12.832,30.976c0.904,3.528,4.088,6,7.736,6h36c4.416,0,8,3.592,8,8V200z\"/>\n                </g>\n            </g>\n            <g>\n                <g>\n                    <path fill=\"currentColor\" d=\"M184,112c-39.696,0-72,32.304-72,72s32.304,72,72,72c39.704,0,72-32.304,72-72S223.704,112,184,112z M184,240\n                        c-30.88,0-56-25.12-56-56s25.12-56,56-56c30.872,0,56,25.12,56,56S214.872,240,184,240z\"/>\n                </g>\n            </g>\n            </svg>\n        </div>\n\n        <div class=\"head__action head__settings selector open--notice notice--icon\">\n            <svg enable-background=\"new 0 0 512 512\" height=\"512\" viewBox=\"0 0 512 512\" width=\"512\" xmlns=\"http://www.w3.org/2000/svg\"><g><path fill=\"currentColor\" d=\"m411 262.862v-47.862c0-69.822-46.411-129.001-110-148.33v-21.67c0-24.813-20.187-45-45-45s-45 20.187-45 45v21.67c-63.59 19.329-110 78.507-110 148.33v47.862c0 61.332-23.378 119.488-65.827 163.756-4.16 4.338-5.329 10.739-2.971 16.267s7.788 9.115 13.798 9.115h136.509c6.968 34.192 37.272 60 73.491 60 36.22 0 66.522-25.808 73.491-60h136.509c6.01 0 11.439-3.587 13.797-9.115s1.189-11.929-2.97-16.267c-42.449-44.268-65.827-102.425-65.827-163.756zm-170-217.862c0-8.271 6.729-15 15-15s15 6.729 15 15v15.728c-4.937-.476-9.94-.728-15-.728s-10.063.252-15 .728zm15 437c-19.555 0-36.228-12.541-42.42-30h84.84c-6.192 17.459-22.865 30-42.42 30zm-177.67-60c34.161-45.792 52.67-101.208 52.67-159.138v-47.862c0-68.925 56.075-125 125-125s125 56.075 125 125v47.862c0 57.93 18.509 113.346 52.671 159.138z\"/><path fill=\"currentColor\" d=\"m451 215c0 8.284 6.716 15 15 15s15-6.716 15-15c0-60.1-23.404-116.603-65.901-159.1-5.857-5.857-15.355-5.858-21.213 0s-5.858 15.355 0 21.213c36.831 36.831 57.114 85.8 57.114 137.887z\"/><path fill=\"currentColor\" d=\"m46 230c8.284 0 15-6.716 15-15 0-52.086 20.284-101.055 57.114-137.886 5.858-5.858 5.858-15.355 0-21.213-5.857-5.858-15.355-5.858-21.213 0-42.497 42.497-65.901 98.999-65.901 159.099 0 8.284 6.716 15 15 15z\"/></g></svg>\n        </div>\n\n        <div class=\"head__split\"></div>\n\n        <div class=\"head__time\">\n            <div class=\"head__time-now time--clock\"></div>\n            <div>\n                <div class=\"head__time-date time--full\"></div>\n                <div class=\"head__time-week time--week\"></div>\n            </div>\n        </div>\n    </div>\n</div>";

    var html$Y = "<div class=\"wrap layer--height layer--width\">\n    <div class=\"wrap__left layer--height\"></div>\n    <div class=\"wrap__content layer--height layer--width\"></div>\n</div>";

    var html$X = "<div class=\"menu\">\n\n    <div class=\"menu__case\">\n        <ul class=\"menu__list\">\n            <li class=\"menu__item selector\" data-action=\"search\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/browse.svg\" /></div>\n                <div class=\"menu__text\">\u041F\u043E\u0438\u0441\u043A</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"main\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/home.svg\" /></div>\n                <div class=\"menu__text\">\u0413\u043B\u0430\u0432\u043D\u0430\u044F</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"movie\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/movie.svg\" /></div>\n                <div class=\"menu__text\">\u0424\u0438\u043B\u044C\u043C\u044B</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"tv\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/tv.svg\" /></div>\n                <div class=\"menu__text\">\u0421\u0435\u0440\u0438\u0430\u043B\u044B</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"catalog\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/catalog.svg\" /></div>\n                <div class=\"menu__text\">\u041A\u0430\u0442\u0430\u043B\u043E\u0433</div>\n            </li>\n        </ul>\n    </div>\n\n    <div class=\"menu__split\"></div>\n\n    <div class=\"menu__case\">\n        <ul class=\"menu__list\">\n            <li class=\"menu__item selector\" data-action=\"favorite\" data-type=\"book\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/bookmark.svg\" /></div>\n                <div class=\"menu__text\">\u0417\u0430\u043A\u043B\u0430\u0434\u043A\u0438</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"favorite\" data-type=\"like\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/like.svg\" /></div>\n                <div class=\"menu__text\">\u041D\u0440\u0430\u0432\u0438\u0442\u0441\u044F</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"favorite\" data-type=\"wath\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/time.svg\" /></div>\n                <div class=\"menu__text\">\u041F\u043E\u0437\u0436\u0435</div>\n            </li>\n        </ul>\n    </div>\n\n    <div class=\"menu__split\"></div>\n\n    <div class=\"menu__case\">\n        <ul class=\"menu__list\">\n            <li class=\"menu__item selector\" data-action=\"settings\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/settings.svg\" /></div>\n                <div class=\"menu__text\">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"about\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/info.svg\" /></div>\n                <div class=\"menu__text\">\u041E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438</div>\n            </li>\n        </ul>\n    </div>\n</div>";

    var html$W = "<div class=\"activitys layer--width\">\n    <div class=\"activitys__slides\"></div>\n</div>";

    var html$V = "<div class=\"activity layer--width\">\n    <div class=\"activity__body\"></div>\n    <div class=\"activity__loader\"></div>\n</div>";

    var html$U = "<div class=\"scroll\">\n    <div class=\"scroll__content\">\n        <div class=\"scroll__body\">\n            \n        </div>\n    </div>\n</div>";

    var html$T = "<div class=\"settings\">\n    <div class=\"settings__layer\"></div>\n    <div class=\"settings__content layer--height\">\n        <div class=\"settings__head\">\n            <div class=\"settings__title\">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</div>\n        </div>\n        <div class=\"settings__body\"></div>\n    </div>\n</div>";

    var html$S = "<div>\n    <div class=\"settings-folder selector\" data-component=\"interface\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/panel.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">\u0418\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"parser\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/parser.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">\u041F\u0430\u0440\u0441\u0435\u0440</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"server\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/server.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">TorrServer</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"more\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/more.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">\u041E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435</div>\n    </div>\n</div>";

    var html$R = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"interface_size\">\n        <div class=\"settings-param__name\">\u0420\u0430\u0437\u043C\u0435\u0440 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0424\u043E\u043D</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"background\">\n        <div class=\"settings-param__name\">\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0444\u043E\u043D</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"background_type\">\n        <div class=\"settings-param__name\">\u0422\u0438\u043F \u0444\u043E\u043D\u0430</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0411\u044B\u0441\u0442\u0440\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"animation\">\n        <div class=\"settings-param__name\">\u0410\u043D\u0438\u043C\u0430\u0446\u0438\u044F</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0410\u043D\u0438\u043C\u0430\u0446\u0438\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"mask\">\n        <div class=\"settings-param__name\">\u0417\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041F\u043B\u0430\u0432\u043D\u043E\u0435 \u0437\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u0441\u043D\u0438\u0437\u0443 \u0438 \u0441\u0432\u0435\u0440\u0445\u0443</div>\n    </div>\n</div>";

    var html$Q = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"parser_use\">\n        <div class=\"settings-param__name\">\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u0441\u0435\u0440</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0422\u0435\u043C \u0441\u0430\u043C\u044B\u043C, \u0432\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u043F\u0440\u0438\u043D\u044F\u0442\u044C \u0432\u0441\u044E \u043E\u0442\u0432\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u043D\u0430 \u0441\u0435\u0431\u044F \u0437\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0445 \u0441\u0441\u044B\u043B\u043E\u043A, \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u043E\u043D\u043B\u0430\u0439\u043D \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"parser_torrent_type\">\n        <div class=\"settings-param__name\">\u0422\u0438\u043F \u043F\u0430\u0440\u0441\u0435\u0440\u0430 \u0434\u043B\u044F \u0442\u043E\u0440\u0440\u0435\u043D\u0442\u043E\u0432</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>Jackett</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"jackett_url\" placeholder=\"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: 192.168.\u0445\">\n        <div class=\"settings-param__name\">\u0421\u0441\u044B\u043B\u043A\u0430</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u043A\u0440\u0438\u043F\u0442 Jackett</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"jackett_key\" placeholder=\"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: sa0sk83d..\">\n        <div class=\"settings-param__name\">Api \u043A\u043B\u044E\u0447</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432 Jackett</div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>Torlook</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"torlook_site\" placeholder=\"...\">\n        <div class=\"settings-param__name\">\u0421\u0430\u0439\u0442</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0421\u0430\u0439\u0442 \u0441 \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E \u043F\u0430\u0440\u0441\u0438\u0442\u044C</div>\n    </div>\n\n    <div class=\"settings-param selector is--torllok\" data-type=\"toggle\" data-name=\"torlook_parse_type\">\n        <div class=\"settings-param__name\">\u041C\u0435\u0442\u043E\u0434 \u043F\u0430\u0440\u0441\u0438\u043D\u0433\u0430 \u0441\u0430\u0439\u0442\u0430 TorLook</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector is--torllok\" data-type=\"input\" data-name=\"parser_website_url\" placeholder=\"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: scraperapi.com\">\n        <div class=\"settings-param__name\">\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043F\u0430\u0440\u0441\u0435\u0440 \u0441\u0430\u0439\u0442\u043E\u0432</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 scraperapi.com, \u043F\u0440\u043E\u043F\u0438\u0441\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 api.scraperapi.com?api_key=...&url={q}<br>\u0412 {q} \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u0441\u044F \u0441\u0430\u0439\u0442 w41.torlook.info</div>\n    </div>\n</div>";

    var html$P = "<div>\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"torrserver_url\" placeholder=\"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: 192.168.\u0445\">\n        <div class=\"settings-param__name\">\u0421\u0441\u044B\u043B\u043A\u0430</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u043A\u0440\u0438\u043F\u0442 TorrServer</div>\n    </div>\n    \n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"torrserver_savedb\">\n        <div class=\"settings-param__name\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432 \u0431\u0430\u0437\u0443</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0422\u043E\u0440\u0440\u0435\u043D\u0442 \u0431\u0443\u0434\u0435\u0442 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u0431\u0430\u0437\u0443 TorrServer</div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"torrserver_auth\">\n        <div class=\"settings-param__name\">\u0412\u0445\u043E\u0434 \u043F\u043E \u043F\u0430\u0440\u043E\u043B\u044E</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"torrserver_login\" placeholder=\"\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\">\n        <div class=\"settings-param__name\">\u041B\u043E\u0433\u0438\u043D</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"torrserver_password\" placeholder=\"\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\">\n        <div class=\"settings-param__name\">\u041F\u0430\u0440\u043E\u043B\u044C</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n</div>";

    var html$O = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"pages_save_total\">\n        <div class=\"settings-param__name\">\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446 \u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432 \u043F\u0430\u043C\u044F\u0442\u0438</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0425\u0440\u0430\u043D\u0438\u0442 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0432 \u0442\u043E\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435, \u0432 \u043A\u043E\u0442\u043E\u0440\u043E\u043C \u0432\u044B \u0435\u0451 \u043F\u043E\u043A\u0438\u043D\u0443\u043B\u0438</div>\n    </div>\n</div>";

    var html$N = "<div class=\"items-line\">\n    <div class=\"items-line__head\">\n        <div class=\"items-line__title\">{title}</div>\n    </div>\n    <div class=\"items-line__body\"></div>\n</div>";

    var html$M = "<div class=\"card selector\">\n    <div class=\"card__view\">\n        <img src=\"./img/img_load.svg\" class=\"card__img\" />\n    </div>\n\n    <div class=\"card__icons\">\n        <div class=\"card__icons-inner\">\n            \n        </div>\n    </div>\n    \n    <div class=\"card__title\">{title}</div>\n    <div class=\"card__age\">{release_date}</div>\n\n    \n</div>";

    var html$L = "<div class=\"full-start\">\n\n    <div class=\"full-start__body\">\n        <div class=\"full-start__right\">\n            <div class=\"full-start__poster\">\n                <img src=\"{img}\" class=\"full-start__img\" />\n            </div>\n        </div>\n\n        <div class=\"full-start__left\">\n            <div class=\"full-start__tags\">\n                <div class=\"full-start__tag\">\n                    <img src=\"./img/icons/pulse.svg\" /> <div>{genres}</div>\n                </div>\n                <div class=\"full-start__tag\">\n                    <img src=\"./img/icons/time.svg\" /> <div>{time}</div>\n                </div>\n                <div class=\"full-start__tag hide is--serial\">\n                    <img src=\"./img/icons/menu/catalog.svg\" /> <div>{seasons}</div>\n                </div>\n                <div class=\"full-start__tag hide is--serial\">\n                    <img src=\"./img/icons/menu/movie.svg\" /> <div>{episodes}</div>\n                </div>\n            </div>\n\n            <div class=\"full-start__title\">{title}</div>\n            <div class=\"full-start__title-original\">{original_title}</div>\n\n            <div class=\"full-start__descr\">{descr}</div>\n        </div>\n\n        \n    </div>\n\n    <div class=\"full-start__buttons\">\n        <div class=\"full-start__button selector view--trailer\">\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n            <g>\n                <g>\n                    <path fill=\"currentColor\" d=\"M482.909,67.2H29.091C13.05,67.2,0,80.25,0,96.291v319.418C0,431.75,13.05,444.8,29.091,444.8h453.818\n                        c16.041,0,29.091-13.05,29.091-29.091V96.291C512,80.25,498.95,67.2,482.909,67.2z M477.091,409.891H34.909V102.109h442.182\n                        V409.891z\"/>\n                </g>\n            </g>\n            <g>\n                <g>\n                    <rect fill=\"currentColor\" x=\"126.836\" y=\"84.655\" width=\"34.909\" height=\"342.109\"/>\n                </g>\n            </g>\n            <g>\n                <g>\n                    <rect fill=\"currentColor\" x=\"350.255\" y=\"84.655\" width=\"34.909\" height=\"342.109\"/>\n                </g>\n            </g>\n            <g>\n                <g>\n                    <rect fill=\"currentColor\" x=\"367.709\" y=\"184.145\" width=\"126.836\" height=\"34.909\"/>\n                </g>\n            </g>\n            <g>\n                <g>\n                    <rect fill=\"currentColor\" x=\"17.455\" y=\"184.145\" width=\"126.836\" height=\"34.909\"/>\n                </g>\n            </g>\n            <g>\n                <g>\n                    <rect fill=\"currentColor\" x=\"367.709\" y=\"292.364\" width=\"126.836\" height=\"34.909\"/>\n                </g>\n            </g>\n            <g>\n                <g>\n                    <rect fill=\"currentColor\" x=\"17.455\" y=\"292.364\" width=\"126.836\" height=\"34.909\"/>\n                </g>\n            </g>\n            \n            </svg>\n\n            <span>\u0422\u0440\u0435\u0439\u043B\u0435\u0440\u044B</span>\n        </div>\n\n        <div class=\"full-start__button view--torrent hide\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 30.051 30.051\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n            <g xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069   c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532   c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z\" fill=\"currentColor\"/>\n                <path d=\"M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021   C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518   c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z\" fill=\"currentColor\"/>\n            </g></svg>\n\n            <span>\u0422\u043E\u0440\u0440\u0435\u043D\u0442\u044B</span>\n        </div>\n\n        <div class=\"full-start__button selector open--menu\">\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n                <g>\n                    <g>\n                        <path fill=\"currentColor\" d=\"M436.742,180.742c-41.497,0-75.258,33.761-75.258,75.258s33.755,75.258,75.258,75.258\n                            C478.239,331.258,512,297.503,512,256C512,214.503,478.239,180.742,436.742,180.742z M436.742,294.246\n                            c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246s38.246,17.155,38.246,38.246\n                            S457.833,294.246,436.742,294.246z\"/>\n                    </g>\n                </g>\n                <g>\n                    <g>\n                        <path fill=\"currentColor\" d=\"M256,180.742c-41.497,0-75.258,33.761-75.258,75.258s33.761,75.258,75.258,75.258c41.503,0,75.258-33.755,75.258-75.258\n                            C331.258,214.503,297.503,180.742,256,180.742z M256,294.246c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246\n                            s38.246,17.155,38.246,38.246S277.091,294.246,256,294.246z\"/>\n                    </g>\n                </g>\n                <g>\n                    <g>\n                        <path fill=\"currentColor\" d=\"M75.258,180.742C33.761,180.742,0,214.503,0,256c0,41.503,33.761,75.258,75.258,75.258\n                            c41.497,0,75.258-33.755,75.258-75.258C150.516,214.503,116.755,180.742,75.258,180.742z M75.258,294.246\n                            c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246c21.091,0,38.246,17.155,38.246,38.246\n                            S96.342,294.246,75.258,294.246z\"/>\n                    </g>\n                </g>\n            </svg>\n        </div>\n\n        <div class=\"full-start__icons\">\n            <div class=\"info__icon icon--book\"></div>\n            <div class=\"info__icon icon--like\"></div>\n            <div class=\"info__icon icon--wath\"></div>\n        </div>\n\n        <div class=\"info__rate\"><span>{r_themovie}</span></div>\n    </div>\n</div>";

    var html$K = "<div class=\"full-descr\">\n    <div class=\"full-descr__left\">\n        <div class=\"full-descr__text\">{text}</div>\n\n        <div class=\"full-descr__line\">\n            <div class=\"full-descr__line-name\">\u0416\u0430\u043D\u0440</div>\n            <div class=\"full-descr__line-body\">{genres}</div>\n        </div>\n\n        <div class=\"full-descr__line\">\n            <div class=\"full-descr__line-name\">\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E</div>\n            <div class=\"full-descr__line-body\">{companies}</div>\n        </div>\n    </div>\n\n    <div class=\"full-descr__right\">\n        <div class=\"full-descr__info\">\n            <div class=\"full-descr__info-name\">\u0414\u0430\u0442\u0430 \u0440\u0435\u043B\u0438\u0437\u0430</div>\n            <div class=\"full-descr__info-body\">{relise}</div>\n        </div>\n\n        <div class=\"full-descr__info\">\n            <div class=\"full-descr__info-name\">\u0411\u044E\u0434\u0436\u0435\u0442</div>\n            <div class=\"full-descr__info-body\">{budget}</div>\n        </div>\n\n        <div class=\"full-descr__info\">\n            <div class=\"full-descr__info-name\">\u0421\u0442\u0440\u0430\u043D\u044B</div>\n            <div class=\"full-descr__info-body\">{countries}</div>\n        </div>\n    </div>\n</div>";

    var html$J = "<div class=\"full-actor selector\">\n    <img src=\"{img}\" class=\"full-actor__foto\" />\n\n    <div class=\"full-actor__body\">\n        <div class=\"full-actor__firstname\">{firstname}</div>\n        <div class=\"full-actor__lastname\">{lastname}</div>\n    </div>\n</div>";

    var html$I = "<div class=\"full-review selector\">\n    <img src=\"{img}\" class=\"full-actor__foto\" />\n\n   \n</div>";

    var html$H = "<div class=\"player\">\n    \n</div>";

    var html$G = "<div class=\"player-panel\">\n\n    <div class=\"player-panel__body\">\n        <div class=\"player-panel__timeline\">\n            <div class=\"player-panel__peding\"></div>\n            <div class=\"player-panel__position\"><div></div></div>\n            <div class=\"player-panel__time hide\"></div>\n        </div>\n\n        <div class=\"player-panel__line\">\n            <div class=\"player-panel__timenow\"></div>\n            <div class=\"player-panel__timeend\"></div>\n        </div>\n\n        <div class=\"player-panel__line\">\n            <div class=\"player-panel__left\">\n                <div class=\"player-panel__prev button selector\"></div>\n                <div class=\"player-panel__next button selector\"></div>\n            </div>\n            <div class=\"player-panel__center\">\n                <div class=\"player-panel__rprev button selector\">\n                    <svg width=\"35\" height=\"25\" viewBox=\"0 0 35 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M14 10.7679C12.6667 11.5377 12.6667 13.4622 14 14.232L31.25 24.1913C32.5833 24.9611 34.25 23.9989 34.25 22.4593L34.25 2.5407C34.25 1.0011 32.5833 0.0388526 31.25 0.808653L14 10.7679Z\" fill=\"currentColor\"/>\n                    <path d=\"M0.999998 10.7679C-0.333335 11.5377 -0.333333 13.4622 1 14.232L18.25 24.1913C19.5833 24.9611 21.25 23.9989 21.25 22.4593L21.25 2.5407C21.25 1.0011 19.5833 0.0388526 18.25 0.808653L0.999998 10.7679Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__playpause button selector\"></div>\n                <div class=\"player-panel__rnext button selector\">\n                    <svg width=\"35\" height=\"25\" viewBox=\"0 0 35 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M20.25 10.7679C21.5833 11.5377 21.5833 13.4622 20.25 14.232L3 24.1913C1.66666 24.9611 -6.72981e-08 23.9989 0 22.4593L8.70669e-07 2.5407C9.37967e-07 1.0011 1.66667 0.0388526 3 0.808653L20.25 10.7679Z\" fill=\"currentColor\"/>\n                    <path d=\"M33.25 10.7679C34.5833 11.5377 34.5833 13.4622 33.25 14.232L16 24.1913C14.6667 24.9611 13 23.9989 13 22.4593L13 2.5407C13 1.0011 14.6667 0.0388526 16 0.808653L33.25 10.7679Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n            </div>\n            <div class=\"player-panel__right\">\n                <div class=\"player-panel__playlist button selector\"></div>\n                <div class=\"player-panel__subs button selector hide\"></div>\n                <div class=\"player-panel__size button selector\"></div>\n            </div>\n        </div>\n    </div>\n</div>";

    var html$F = "<div class=\"player-video\">\n    <div class=\"player-video__display\"></div>\n    <div class=\"player-video__loader\"></div>\n    <div class=\"player-video__paused hide\">\n        <svg width=\"19\" height=\"25\" viewBox=\"0 0 19 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect width=\"6\" height=\"25\" rx=\"2\" fill=\"white\"/>\n            <rect x=\"13\" width=\"6\" height=\"25\" rx=\"2\" fill=\"white\"/>\n        </svg>\n    </div>\n</div>";

    var html$E = "<div class=\"player-info\">\n    <div class=\"player-info__name\"></div>\n</div>";

    var html$D = "<div class=\"selectbox\">\n    <div class=\"selectbox__layer\"></div>\n    <div class=\"selectbox__content layer--height\">\n        <div class=\"selectbox__head\">\n            <div class=\"selectbox__title\"></div>\n        </div>\n        <div class=\"selectbox__body\"></div>\n    </div>\n</div>";

    var html$C = "<div class=\"selectbox-item selector\">\n    <div class=\"selectbox-item__title\">{title}</div>\n    <div class=\"selectbox-item__subtitle\">{subtitle}</div>\n</div>";

    var html$B = "<div class=\"info layer--width\">\n    <div class=\"info__rate\"><span></span></div>\n    <div class=\"info__left\">\n        <div class=\"info__title\"></div>\n        <div class=\"info__title-original\"></div>\n        <div class=\"info__create\"></div>\n    </div>\n    <div class=\"info__right\">\n        <div class=\"info__icon icon--book\"></div>\n        <div class=\"info__icon icon--like\"></div>\n        <div class=\"info__icon icon--wath\"></div>\n    </div>\n</div>";

    var html$A = "<div>\n    <div class=\"simple-button selector filter--search\">\n            <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n            viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n        <g>\n            <path fill=\"currentColor\" d=\"M225.474,0C101.151,0,0,101.151,0,225.474c0,124.33,101.151,225.474,225.474,225.474\n                c124.33,0,225.474-101.144,225.474-225.474C450.948,101.151,349.804,0,225.474,0z M225.474,409.323\n                c-101.373,0-183.848-82.475-183.848-183.848S124.101,41.626,225.474,41.626s183.848,82.475,183.848,183.848\n                S326.847,409.323,225.474,409.323z\"/>\n        </g>\n        <g>\n            <path fill=\"currentColor\" d=\"M505.902,476.472L386.574,357.144c-8.131-8.131-21.299-8.131-29.43,0c-8.131,8.124-8.131,21.306,0,29.43l119.328,119.328\n                c4.065,4.065,9.387,6.098,14.715,6.098c5.321,0,10.649-2.033,14.715-6.098C514.033,497.778,514.033,484.596,505.902,476.472z\"/>\n        </g>\n\n        </svg>\n\n        <span>\u0423\u0442\u043E\u0447\u043D\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A</span>\n    </div>\n    <div class=\"simple-button selector filter--sort\">\n\n        <span>\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</span>\n    </div>\n\n    <div class=\"simple-button selector filter--filter\">\n\n        <span>\u0424\u0438\u043B\u044C\u0442\u0440</span>\n    </div>\n</div>";

    var html$z = "<div class=\"card-more selector\">\n    <div class=\"card-more__title\">\n        \u0415\u0449\u0435\n    </div>\n</div>";

    var html$y = "<div class=\"search\">\n    <div class=\"search__left\">\n        <div class=\"search__title\">\u041F\u043E\u0438\u0441\u043A</div>\n        <div class=\"search__input\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442...</div>\n        <div class=\"search__keypad\"><div class=\"simple-keyboard\"></div></div>\n        <div class=\"search__history\"></div>\n    </div>\n    <div class=\"search__results\"></div>\n</div>";

    var html$x = "<div class=\"settings-input\">\n    <div class=\"settings-input__content\">\n        <div class=\"settings-input__input\"></div>\n\n        <div class=\"simple-keyboard\"></div>\n\n        <div class=\"settings-input__links\">\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443</div>\n    </div>\n</div>";

    var html$w = "<div class=\"modal\">\n    <div class=\"modal__content\">\n        <div class=\"modal__head\">\n            <div class=\"modal__title\">{title}</div>\n        </div>\n        <div class=\"modal__body\">\n            \n        </div>\n    </div>\n</div>";

    var html$v = "<div class=\"company\">\n    <div class=\"company__name\">{name}</div>\n    <div class=\"company__headquarters\">\u0428\u0442\u0430\u0431: {headquarters}</div>\n    <div class=\"company__homepage\">\u0421\u0430\u0439\u0442: {homepage}</div>\n    <div class=\"company__country\">\u0421\u0442\u0440\u0430\u043D\u0430: {origin_country}</div>\n</div>";

    var html$u = "<div class=\"modal-loading\">\n    \n</div>";

    var html$t = "<div class=\"modal-pending\">\n    <div class=\"modal-pending__loading\"></div>\n    <div class=\"modal-pending__text\">{text}</div>\n</div>";

    var html$s = "<div class=\"actor-start\">\n\n    <div class=\"actor-start__body\">\n        <div class=\"actor-start__right\">\n            <div class=\"actor-start__poster\">\n                <img src=\"{img}\" class=\"actor-start__img\" />\n            </div>\n        </div>\n\n        <div class=\"actor-start__left\">\n            <div class=\"actor-start__tags\">\n                <div class=\"actor-start__tag\">\n                    <img src=\"./img/icons/pulse.svg\" /> <div>{birthday}</div>\n                </div>\n            </div>\n            \n            <div class=\"actor-start__name\">{name}</div>\n            <div class=\"actor-start__place\">{place}</div>\n\n            <div class=\"actor-start__descr\">{descr}</div>\n\n\n            \n        </div>\n    </div>\n\n    <div class=\"full-start__buttons hide\">\n        <div class=\"full-start__button selector\">\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n                <g>\n                    <g>\n                        <path fill=\"currentColor\" d=\"M436.742,180.742c-41.497,0-75.258,33.761-75.258,75.258s33.755,75.258,75.258,75.258\n                            C478.239,331.258,512,297.503,512,256C512,214.503,478.239,180.742,436.742,180.742z M436.742,294.246\n                            c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246s38.246,17.155,38.246,38.246\n                            S457.833,294.246,436.742,294.246z\"/>\n                    </g>\n                </g>\n                <g>\n                    <g>\n                        <path fill=\"currentColor\" d=\"M256,180.742c-41.497,0-75.258,33.761-75.258,75.258s33.761,75.258,75.258,75.258c41.503,0,75.258-33.755,75.258-75.258\n                            C331.258,214.503,297.503,180.742,256,180.742z M256,294.246c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246\n                            s38.246,17.155,38.246,38.246S277.091,294.246,256,294.246z\"/>\n                    </g>\n                </g>\n                <g>\n                    <g>\n                        <path fill=\"currentColor\" d=\"M75.258,180.742C33.761,180.742,0,214.503,0,256c0,41.503,33.761,75.258,75.258,75.258\n                            c41.497,0,75.258-33.755,75.258-75.258C150.516,214.503,116.755,180.742,75.258,180.742z M75.258,294.246\n                            c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246c21.091,0,38.246,17.155,38.246,38.246\n                            S96.342,294.246,75.258,294.246z\"/>\n                    </g>\n                </g>\n            </svg>\n        </div>\n\n        <div class=\"full-start__icons\">\n            <div class=\"info__icon icon--like\"></div>\n        </div>\n    </div>\n</div>";

    var html$r = "<div class=\"empty\">\n    <div class=\"empty__img selector\"></div>\n    <div class=\"empty__title\">\u0417\u0434\u0435\u0441\u044C \u043F\u0443\u0441\u0442\u043E</div>\n    <div class=\"empty__descr\">\u041D\u0430 \u0434\u0430\u043D\u043D\u044B\u0439 \u043C\u043E\u043C\u0435\u043D\u0442 \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u0443\u0441\u0442\u043E\u0439</div>\n</div>";

    var html$q = "<div class=\"notice selector\">\n    <div class=\"notice__time\">{time}</div>\n    <div class=\"notice__title\">{title}</div>\n    <div class=\"notice__descr\">{descr}</div>\n</div>";

    var html$p = "<div class=\"torrent-item selector\">\n    <div class=\"torrent-item__title\">{title}</div>\n    <div class=\"torrent-item__details\">\n        <div class=\"torrent-item__date\">{date}</div>\n        <div class=\"torrent-item__tracker\">{tracker}</div>\n\n        <div class=\"torrent-item__seeds\">\u0420\u0430\u0437\u0434\u0430\u044E\u0442: <span>{seeds}</span></div>\n        <div class=\"torrent-item__grabs\">\u041A\u0430\u0447\u0430\u044E\u0442: <span>{grabs}</span></div>\n        \n        <div class=\"torrent-item__size\">{size}</div>\n    </div>\n</div>";

    var html$o = "<div class=\"torrent-file selector\">\n    <div class=\"torrent-file__title\">{title}</div>\n    <div class=\"torrent-file__size\">{size}</div>\n</div>";

    var html$n = "<div class=\"files\">\n    <div class=\"files__left\">\n        <div class=\"full-start__poster\">\n            <img src=\"{img}\" class=\"full-start__img\" />\n        </div>\n\n        <div class=\"files__title\">{title}</div>\n        <div class=\"files__title-original\">{original_title}</div>\n    </div>\n    <div class=\"files__body\">\n        \n    </div>\n</div>";

    var html$m = "<div class=\"about\">\n    <div>\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0435 \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0435 \u0441\u0441\u044B\u043B\u043A\u0438 \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u0444\u0438\u043B\u044C\u043C\u0430\u0445, \u043D\u043E\u0432\u0438\u043D\u043A\u0430\u0445, \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0445 \u0444\u0438\u043B\u044C\u043C\u043E\u0432 \u0438 \u0442.\u0434. \u0412\u0441\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0432 \u043F\u043E\u0437\u043D\u0430\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0446\u0435\u043B\u044F\u0445, \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u0441\u0432\u043E\u0438 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0441\u0435\u0440\u0432\u0435\u0440\u044B \u0434\u043B\u044F \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438.</div>\n\n\n    <div class=\"about__contacts\">\n        <div>\n            <small>\u041D\u0430\u0448 \u043A\u0430\u043D\u0430\u043B</small><br>\n            @lampa_channel\n        </div>\n\n        <div>\n            <small>\u0413\u0440\u0443\u043F\u043F\u0430</small><br>\n            @lampa_group\n        </div>\n\n        <div>\n            <small>\u0412\u0435\u0440\u0441\u0438\u044F</small><br>\n            1.2.1\n        </div>\n    </div>\n</div>";

    var html$l = "<div class=\"error\">\n    <div class=\"error__ico\"></div>\n    <div class=\"error__body\">\n        <div class=\"error__title\">{title}</div>\n        <div class=\"error__text\">{text}</div>\n    </div>\n</div>";

    var html$k = "<div class=\"error\">\n    <div class=\"error__ico\"></div>\n    <div class=\"error__body\">\n        <div class=\"error__title\">{title}</div>\n        <div class=\"error__text\">{text}</div>\n    </div>\n</div>\n\n<div class=\"torrent-error noconnect\">\n    <div>\n        <div>\u041F\u0440\u0438\u0447\u0438\u043D\u044B</div>\n        <ul>\n            <li class=\"nocorect\">\u0422\u0435\u043A\u0443\u0448\u0438\u0439 \u0430\u0434\u0440\u0435\u0441 <code>{ip}</code> \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u043C!</li>\n            <li>\u0422\u0435\u043A\u0443\u0448\u0438\u0439 \u043E\u0442\u0432\u0435\u0442: <code>{echo}</code></li>\n        </ul>\n    </div>\n\n    <div>\n        <div>\u041A\u0430\u043A \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E?</div>\n        <ul>\n            <li>\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 <code>192.168.0.\u0445\u0445\u0445:8090</code></li>\n            <li>\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0432\u0435\u0440\u0441\u0438\u044E Matrix</li>\n        </ul>\n    </div>\n\n    <div>\n        <div>\u041A\u0430\u043A \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C?</div>\n        <ul>\n            <li>\u041D\u0430 \u044D\u0442\u043E\u043C \u0436\u0435 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435, \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u0438 \u0437\u0430\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443 <code>{ip}/echo</code></li>\n            <li>\u0415\u0441\u043B\u0438 \u0436\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u0442, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u043B\u0438 TorrServe, \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0435\u0433\u043E.</li>\n            <li>\u0415\u0441\u043B\u0438 \u0436\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0438\u043B, \u0443\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C \u0447\u0442\u043E \u0432 \u043E\u0442\u0432\u0435\u0442\u0435 \u0435\u0441\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0430 <code>MatriX</code></li>\n        </ul>\n    </div>\n</div>";

    var html$j = "<div class=\"error\">\n    <div class=\"error__ico\"></div>\n    <div class=\"error__body\">\n        <div class=\"error__title\">{title}</div>\n        <div class=\"error__text\">{text}</div>\n    </div>\n</div>\n\n<div class=\"torrent-error noconnect\">\n    <div>\n        <div>\u041F\u0440\u0438\u0447\u0438\u043D\u044B</div>\n        <ul>\n            <li>\u0417\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u043F\u0438\u043D\u0433 \u0432\u0435\u0440\u043D\u0443\u043B \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442</li>\n            <li>\u041E\u0442\u0432\u0435\u0442 \u043E\u0442 TorServer: <code>{echo}</code></li>\n        </ul>\n    </div>\n\n    <div>\n        <div>\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C?</div>\n        <ul>\n            <li>\u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C \u0447\u0442\u043E \u0443 \u0432\u0430\u0441 \u0441\u0442\u043E\u0438\u0442 \u0432\u0435\u0440\u0441\u0438\u044F Matrix</li>\n        </ul>\n    </div>\n\n    <div>\n        <div>\u041A\u0430\u043A \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C?</div>\n        <ul>\n            <li>\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u0438 \u0437\u0430\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443 <code>{ip}/echo</code></li>\n            <li>\u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C \u0447\u0442\u043E \u0432 \u043E\u0442\u0432\u0435\u0442\u0435 \u0435\u0441\u0442\u044C \u043D\u0430\u043B\u0438\u0447\u0438\u0435 \u043A\u043E\u0434\u0430 <code>MatriX</code></li>\n        </ul>\n    </div>\n</div>";

    var html$i = "<div class=\"error\">\n    <div class=\"error__ico\"></div>\n    <div class=\"error__body\">\n        <div class=\"error__title\">{title}</div>\n        <div class=\"error__text\">{text}</div>\n    </div>\n</div>\n\n<div class=\"torrent-error noconnect\">\n    <div>\n        <div>\u041F\u0440\u0438\u0447\u0438\u043D\u044B</div>\n        <ul>\n            <li>TorServer \u043D\u0435 \u0441\u043C\u043E\u0433 \u0441\u043A\u0430\u0447\u0430\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0444\u0430\u0439\u043B</li>\n            <li>\u0421\u0441\u044B\u043B\u043A\u0430: <code>{url}</code></li>\n        </ul>\n    </div>\n\n    <div class=\"is--jackett\">\n        <div>\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C?</div>\n        <ul>\n            <li>\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u043B\u0438 \u0432\u044B \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u043B\u0438 Jackett</li>\n            <li>\u041F\u0440\u0438\u0432\u0430\u0442\u043D\u044B\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438 \u043C\u043E\u0433\u0443\u0442 \u043D\u0435 \u0432\u044B\u0434\u0430\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0444\u0430\u0439\u043B</li>\n            <li>\u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C \u0447\u0442\u043E Jackett \u0442\u043E\u0436\u0435 \u043C\u043E\u0436\u0435\u0442 \u0441\u043A\u0430\u0447\u0430\u0442\u044C \u0444\u0430\u0439\u043B</li>\n        </ul>\n    </div>\n\n    <div class=\"is--torlook\">\n        <div>\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C?</div>\n        <ul>\n            <li>\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 \u043D\u0430\u0448\u0443 \u0442\u0435\u043B\u0435\u0433\u0440\u0430\u043C \u0433\u0440\u0443\u043F\u043F\u0443: @lampa_group</li>\n            <li>\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043A\u0430\u043A\u043E\u0439 \u0444\u0438\u043B\u044C\u043C, \u043A\u0430\u043A\u0430\u044F \u0440\u0430\u0437\u0434\u0430\u0447\u0430 \u0438 \u043F\u043E \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0444\u043E\u0442\u043E \u044D\u0442\u043E\u0439 \u0440\u0430\u0437\u0430\u0434\u0430\u0447\u0438</li>\n        </ul>\n    </div>\n</div>";

    var html$h = "<style>\n.torrent-error > div + div {\n    margin-top: 1.3em; }\n\n.torrent-error > div {\n  line-height: 1.2; }\n  .torrent-error > div > div {\n    font-size: 1.4em; }\n  .torrent-error > div > ul {\n    margin: 0;\n    margin-top: 0.2em;\n    font-size: 1.2em;\n    font-weight: 300; }\n    .torrent-error > div > ul > li {\n      position: relative;\n      padding-left: 1em; }\n      .torrent-error > div > ul > li::before {\n        content: '';\n        display: block;\n        width: 0.3em;\n        height: 0.3em;\n        -webkit-border-radius: 100%;\n            -moz-border-radius: 100%;\n                border-radius: 100%;\n        background-color: #ddd;\n        position: absolute;\n        top: 0.5em;\n        left: 0; }\n      .torrent-error > div > ul > li + li {\n        margin-top: 0.2em; }\n\n.torrent-error code {\n  background-color: #4c4c4c;\n  -webkit-border-radius: 0.2em;\n      -moz-border-radius: 0.2em;\n          border-radius: 0.2em;\n  padding: 0 0.5em;\n  font-family: inherit;\n  font-size: inherit;\n  word-break: break-all; }\n\n.error + .torrent-error {\n  margin-top: 2em; }\n\n.search-box {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -moz-box-orient: vertical;\n      -moz-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 1.5em;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -moz-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n\n.simple-button {\n  margin-right: 1em;\n  font-size: 1.3em;\n  background-color: rgba(0, 0, 0, 0.3);\n  padding: 0.3em 1.2em;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-border-radius: 5em;\n      -moz-border-radius: 5em;\n          border-radius: 5em;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 2.8em;\n  -webkit-transition: background-color 0.3s;\n  -o-transition: background-color 0.3s;\n  -moz-transition: background-color 0.3s;\n  transition: background-color 0.3s; }\n  .simple-button > svg {\n    width: 1.5em;\n    height: 1.5em; }\n    .simple-button > svg + span {\n      margin-left: 1em; }\n  .simple-button.focus {\n    background-color: #fff;\n    color: #000; }\n\n.torrent-filter {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 2em; }\n\n.files__left .full-start__poster {\n  display: inline-block; }\n\n.console {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: #1d1f20;\n  z-index: 100;\n  padding: 1.5em 0; }\n  .console__line {\n    padding: 0.3em 1.5em;\n    font-size: 1.1em;\n    line-height: 1.2;\n    word-break: break-all; }\n    .console__line:nth-child(2n) {\n      background-color: rgba(255, 255, 255, 0.05); }\n    .console__line.focus {\n      background-color: rgba(255, 255, 255, 0.2); }\n\n\nbody.no--mask .scroll--mask {\n  -webkit-mask-image: unset !important;\n          mask-image: unset !important; }\n\nbody.no--animation * {\n  -webkit-transition: none !important;\n  -o-transition: none !important;\n  -moz-transition: none !important;\n  transition: none !important; }\n\n.player-video__paused {\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  width: 8em;\n  height: 8em;\n  -webkit-border-radius: 100%;\n      -moz-border-radius: 100%;\n          border-radius: 100%;\n  padding: 2em;\n  background-color: rgba(0, 0, 0, 0.5);\n  margin-left: -4em;\n  margin-top: -4em;\n  -webkit-backdrop-filter: blur(5px);\n          backdrop-filter: blur(5px); }\n\n.player-panel{\n  left: 1.5em;\n  bottom: 1.5em;\n  right: 1.5em;\n  width: auto;\n  padding: 1.5em;\n  -webkit-border-radius: 0.5em;\n    -moz-border-radius: 0.5em;\n          border-radius: 0.5em;\n  -webkit-backdrop-filter: blur(5px);\n          backdrop-filter: blur(5px); \n}\n\n.player-panel__timeline{\n  background-color: rgba(255, 255, 255, 0.1);\n    -webkit-border-radius: 2em;\n       -moz-border-radius: 2em;\n            border-radius: 2em;\n    margin-bottom: 0.6em;\n}\n.player-panel__peding, .player-panel__position{\n  -webkit-border-radius: 5em;\n       -moz-border-radius: 5em;\n            border-radius: 5em;\n}\n.player-panel__line + .player-panel__line {\n  margin-top: 1em; }\n\n.player-panel .button{\n  padding: 0.4em;\n}\n.player-panel__right .button + .button, .player-panel__left .button + .button {\n  margin-left: 1em; }\n\n.player-info {\n  position: fixed;\n  top: 1.5em;\n  left: 1.5em;\n  right: 1.5em;\n  background-color: rgba(0, 0, 0, 0.3);\n  opacity: 0;\n  -webkit-transform: translateY(-100%);\n      -moz-transform: translateY(-100%);\n      -ms-transform: translateY(-100%);\n        -o-transform: translateY(-100%);\n          transform: translateY(-100%);\n  -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;\n  transition: opacity 0.3s, -webkit-transform 0.3s;\n  -o-transition: opacity 0.3s, -o-transform 0.3s;\n  -moz-transition: transform 0.3s, opacity 0.3s, -moz-transform 0.3s;\n  transition: transform 0.3s, opacity 0.3s;\n  transition: transform 0.3s, opacity 0.3s, -webkit-transform 0.3s, -moz-transform 0.3s, -o-transform 0.3s;\n  padding: 1.5em;\n  -webkit-border-radius: 0.5em;\n      -moz-border-radius: 0.5em;\n          border-radius: 0.5em;\n  -webkit-backdrop-filter: blur(5px);\n          backdrop-filter: blur(5px); }\n  .player-info.info--visible {\n    -webkit-transform: translateY(0);\n        -moz-transform: translateY(0);\n        -ms-transform: translateY(0);\n          -o-transform: translateY(0);\n            transform: translateY(0);\n    opacity: 1; }\n  .player-info__name {\n    font-size: 1.5em;\n    word-break: break-all; }\n\n.torrent-file__title .exe {\n  -webkit-border-radius: 0.3em;\n      -moz-border-radius: 0.3em;\n          border-radius: 0.3em;\n  background: #262829;\n  padding: 0.2em 0.4em;\n  display: inline-block; }\n</style>";

    var html$g = "<div class=\"search-box search\">\n    <div class=\"search-box__input search__input\"></div>\n    <div class=\"search-box__keypad search__keypad\"><div class=\"simple-keyboard\"></div></div>\n</div>";

    var html$f = "<div class=\"console\">\n    \n</div>";

    var templates = {
      head: html$Z,
      wrap: html$Y,
      menu: html$X,
      activitys: html$W,
      activity: html$V,
      settings: html$T,
      settings_main: html$S,
      settings_interface: html$R,
      settings_parser: html$Q,
      settings_server: html$P,
      settings_more: html$O,
      scroll: html$U,
      items_line: html$N,
      card: html$M,
      full_start: html$L,
      full_descr: html$K,
      full_actor: html$J,
      full_review: html$I,
      player: html$H,
      player_panel: html$G,
      player_video: html$F,
      player_info: html$E,
      selectbox: html$D,
      selectbox_item: html$C,
      info: html$B,
      more: html$z,
      search: html$y,
      settings_input: html$x,
      modal: html$w,
      company: html$v,
      modal_loading: html$u,
      modal_pending: html$t,
      actor_start: html$s,
      empty: html$r,
      notice: html$q,
      torrent: html$p,
      torrent_file: html$o,
      files: html$n,
      about: html$m,
      error: html$l,
      torrent_noconnect: html$k,
      styles: html$h,
      torrent_nocheck: html$j,
      torrent_nohash: html$i,
      filter: html$A,
      search_box: html$g,
      console: html$f
    };

    function get$5(name) {
      var vars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var like_static = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var tpl = templates[name];
      if (!tpl) throw 'Шаблон: ' + name + ' не найден!';

      for (var n in vars) {
        tpl = tpl.replace(new RegExp('{' + n + '}', 'g'), vars[n]);
      }

      tpl = tpl.replace(/{\@([a-z_-]+)}/g, function (e, s) {
        return templates[s] || '';
      });
      return like_static ? tpl : $(tpl);
    }

    var Template = {
      get: get$5
    };

    var Base64 = {
      // private property
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      // public method for encoding
      encode: function encode(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);

        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = (chr1 & 3) << 4 | chr2 >> 4;
          enc3 = (chr2 & 15) << 2 | chr3 >> 6;
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }

        return output;
      },
      // public method for decoding
      decode: function decode(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
          enc1 = this._keyStr.indexOf(input.charAt(i++));
          enc2 = this._keyStr.indexOf(input.charAt(i++));
          enc3 = this._keyStr.indexOf(input.charAt(i++));
          enc4 = this._keyStr.indexOf(input.charAt(i++));
          chr1 = enc1 << 2 | enc2 >> 4;
          chr2 = (enc2 & 15) << 4 | enc3 >> 2;
          chr3 = (enc3 & 3) << 6 | enc4;
          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }

          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }
        }

        output = Base64._utf8_decode(output);
        return output;
      },
      // private method for UTF-8 encoding
      _utf8_encode: function _utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);

          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode(c >> 6 | 192);
            utftext += String.fromCharCode(c & 63 | 128);
          } else {
            utftext += String.fromCharCode(c >> 12 | 224);
            utftext += String.fromCharCode(c >> 6 & 63 | 128);
            utftext += String.fromCharCode(c & 63 | 128);
          }
        }

        return utftext;
      },
      // private method for UTF-8 decoding
      _utf8_decode: function _utf8_decode(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {
          c = utftext.charCodeAt(i);

          if (c < 128) {
            string += String.fromCharCode(c);
            i++;
          } else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode((c & 31) << 6 | c2 & 63);
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            i += 3;
          }
        }

        return string;
      }
    };

    function create$n() {
      var listener = start$3();
      var _calls = [];

      var _last;

      var last_reguest;
      var need = {
        timeout: 1000 * 60
      };

      this.timeout = function (time) {
        need.timeout = time;
      };
      /**
       * Видимый запрос
       * @param {String} url адрес
       * @param {Function} complite успешно
       * @param {Function} error ошибка
       * @param {Object} post_data данные для пост запроса
       */


      this.get = function (url, _complite, _error, post_data) {
        clear();
        go({
          url: url,
          post_data: post_data,
          start: function start() {
            listener.send('start');
          },
          before_complite: function before_complite() {
            listener.send('before_complite');
          },
          complite: function complite(data) {
            if (_complite) _complite(data);
          },
          after_complite: function after_complite() {
            listener.send('after_complite');
          },
          before_error: function before_error() {
            listener.send('before_error');
          },
          error: function error(data) {
            if (_error) _error(data);
          },
          after_error: function after_error() {
            listener.send('after_error');
          },
          end: function end() {
            listener.send('end');
          }
        });
      };
      /**
       * Тихий запрос, отработает в любом случае
       * @param {String} url адрес
       * @param {Function} complite успешно
       * @param {Function} error ошибка
       * @param {Object} post_data данные для пост запроса
       * @param {Object} params дополнительные параметры
       */


      this.quiet = function (url, _complite2, _error2, post_data, params) {
        var add_params = {};

        if (params) {
          add_params = params;
        }

        var data = {
          url: url,
          post_data: post_data,
          complite: function complite(data) {
            if (_complite2) _complite2(data);
          },
          error: function error(data) {
            if (_error2) _error2(data);
          }
        };
        Arrays.extend(data, add_params, true);
        go(data);
      };
      /**
       * Бесшумный запрос, сработает прерывание при новом запросе
       * @param {String} url адрес
       * @param {Function} complite успешно
       * @param {Function} error ошибка
       * @param {Object} post_data данные для пост запроса
       * @param {Object} params дополнительные параметры
       */


      this.silent = function (url, complite, error, post_data, params) {
        var add_params = {};

        if (params) {
          add_params = params;
        }

        var reguest = {
          url: url,
          complite: complite,
          error: error
        };

        _calls.push(reguest);

        var data = {
          url: url,
          post_data: post_data,
          complite: function complite(data) {
            if (_calls.indexOf(reguest) !== -1 && reguest.complite) reguest.complite(data);
          },
          error: function error(data) {
            if (_calls.indexOf(reguest) !== -1 && reguest.error) reguest.error(data);
          },
          end: function end() {
            listener.send('end');
          }
        };
        Arrays.extend(data, add_params, true);
        go(data);
      };
      /**
       * Отработать только последний запрос в стеке
       * @param {String} url адрес
       * @param {Function} complite успешно
       * @param {Function} error ошибка
       * @param {Object} post_data данные для пост запроса
       */


      this.last = function (url, complite, error, post_data) {
        var reguest = {
          url: url,
          complite: complite,
          error: error
        };
        _last = reguest;
        go({
          url: url,
          post_data: post_data,
          complite: function complite(data) {
            if (_last && _last.complite) _last.complite(data);
          },
          error: function error(data) {
            if (_last && _last.error) _last.error(data);
          },
          end: function end() {
            dispatchEvent({
              type: 'load:end'
            });
          }
        });
      };

      this["native"] = function (url, complite, error, post_data, params) {
        var add_params = {};

        if (params) {
          add_params = params;
        }

        var reguest = {
          url: url,
          complite: complite,
          error: error
        };

        _calls.push(reguest);

        var data = {
          url: url,
          post_data: post_data,
          complite: function complite(data) {
            if (_calls.indexOf(reguest) !== -1 && reguest.complite) reguest.complite(data);
          },
          error: function error(data) {
            if (_calls.indexOf(reguest) !== -1 && reguest.error) reguest.error(data);
          },
          end: function end() {
            listener.send('end');
          }
        };
        Arrays.extend(data, add_params, true);

        _native(data);
      };
      /**
       * Очистить все запросы
       */


      this.clear = function () {
        _calls = [];
      };
      /**
       * Повторить запрос
       * @param {Object} custom 
       */


      this.again = function (custom) {
        if (custom || last_reguest) {
          go(custom || last_reguest);
        }
      };
      /**
       * Вернуть обьект последненго запроса
       * @returns Object
       */


      this.latest = function () {
        return last_reguest;
      };
      /**
       * Декодировать ошибку в запросе
       * @param {Object} jqXHR 
       * @param {String} exception 
       * @returns String
       */


      this.errorDecode = function (jqXHR, exception) {
        return errorDecode(jqXHR, exception);
      };

      function errorDecode(jqXHR, exception) {
        var msg = '';

        if (jqXHR.status === 0 && exception !== 'timeout') {
          msg = 'Нет подключения к сети.';
        } else if (jqXHR.status == 404) {
          msg = 'Запрошенная страница не найдена. [404]';
        } else if (jqXHR.status == 401) {
          msg = 'Авторизация не удалась';
        } else if (jqXHR.status == 500) {
          msg = 'Внутренняя ошибка сервера. [500]';
        } else if (exception === 'parsererror') {
          msg = 'Запрошенный синтаксический анализ JSON завершился неудачно.';
        } else if (exception === 'timeout') {
          msg = 'Время запроса истекло.';
        } else if (exception === 'abort') {
          msg = 'Запрос был прерван.';
        } else if (exception === 'custom') {
          msg = jqXHR.responseText;
        } else {
          msg = 'Неизвестная ошибка: ' + jqXHR.responseText;
        }

        return msg;
      }
      /**
       * Сделать запрос
       * @param {Object} params 
       */


      function go(params) {
        listener.send('go');
        last_reguest = params;
        if (params.start) params.start();

        var secuses = function secuses(data) {
          if (params.before_complite) params.before_complite(data);

          if (params.complite) {
            try {
              params.complite(data);
            } catch (e) {
              console.log('Reguest', 'complite error:', e.message + "\n\n" + e.stack);
            }
          }

          if (params.after_complite) params.after_complite(data);
          if (params.end) params.end();
        };

        var data = {
          dataType: params.dataType || 'json',
          url: params.url,
          timeout: need.timeout,
          crossDomain: true,
          success: function success(data) {
            console.log('Reguest', 'result of ' + params.url + ' :', data);
            secuses(data);
          },
          error: function error(jqXHR, exception) {
            console.log('Reguest', 'error of ' + params.url + ' :', errorDecode(jqXHR, exception));
            if (params.before_error) params.before_error(jqXHR, exception);
            if (params.error) params.error(jqXHR, exception);
            if (params.after_error) params.after_error(jqXHR, exception);
            if (params.end) params.end();
          },
          beforeSend: function beforeSend(xhr) {
            var use = Storage.get('torrserver_auth');
            var srv = Storage.get('torrserver_url');
            if (use && params.url.indexOf(srv) > -1) xhr.setRequestHeader("Authorization", "Basic " + Base64.encode(Storage.get('torrserver_login') + ':' + Storage.get('torrserver_password')));
          }
        };

        if (params.post_data) {
          data.type = 'POST';
          data.data = params.post_data;
        }

        $.ajax(data);
        need.timeout = 1000 * 60;
      }

      function _native(params) {
        listener.send('go');
        last_reguest = params;
        if (params.start) params.start();
        var platform = Storage.get('platform', '');
        if (platform == 'webos') go(params);else if (platform == 'tizen') go(params);else go(params);
        need.timeout = 1000 * 60;
      }
    }

    function create$m() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var html = Template.get('scroll');
      var body = html.find('.scroll__body');
      var content = html.find('.scroll__content');
      html.toggleClass('scroll--horizontal', params.horizontal ? true : false);
      html.toggleClass('scroll--mask', params.mask ? true : false);
      html.toggleClass('scroll--over', params.over ? true : false);
      html.toggleClass('scroll--nopadding', params.nopadding ? true : false);

      this.update = function (elem, tocenter) {
        var dir = params.horizontal ? 'left' : 'top',
            siz = params.horizontal ? 'width' : 'height';
        var ofs_elm = elem.offset()[dir],
            ofs_box = body.offset()[dir],
            center = ofs_box + (tocenter ? content[siz]() / 2 - elem[siz]() / 2 : 0),
            scrl = Math.min(0, center - ofs_elm);
        body.css('transform', 'translate3d(' + (params.horizontal ? scrl : 0) + 'px, ' + (params.horizontal ? 0 : scrl) + 'px, 0px)');
      };

      this.append = function (object) {
        body.append(object);
      };

      this.minus = function (minus) {
        html.addClass('layer--wheight');
        if (minus) html.data('mheight', minus);
      };

      this.body = function () {
        return body;
      };

      this.render = function (object) {
        if (object) body.append(object);
        return html;
      };

      this.clear = function () {
        body.empty();
      };

      this.reset = function () {
        body.css('transform', 'translate3d(0px, 0px, 0px)');
      };

      this.destroy = function () {
        html.remove();
        body = null;
        content = null;
        html = null;
      };
    }

    var data$1 = {};

    function save$1() {
      Storage.set('favorite', data$1);
    }

    function add$3(where, card) {
      if (data$1[where].indexOf(card.id) < 0) {
        Arrays.insert(data$1[where], 0, card.id);
        if (!search$2(card.id)) data$1.card.push(card);
        save$1();
      }
    }

    function remove(where, card) {
      Arrays.remove(data$1[where], card.id);

      for (var i = data$1.card.length - 1; i >= 0; i--) {
        var element = data$1.card[i];
        if (!check(element).any) Arrays.remove(data$1.card, element);
      }

      save$1();
    }

    function search$2(id) {
      var found;

      for (var index = 0; index < data$1.card.length; index++) {
        var element = data$1.card[index];

        if (element.id == id) {
          found = element;
          break;
        }
      }

      return found;
    }

    function toggle$7(where, card) {
      var find = check(card);
      if (find[where]) remove(where, card);else add$3(where, card);
    }

    function check(card) {
      var result = {
        like: data$1.like.indexOf(card.id) > -1,
        wath: data$1.wath.indexOf(card.id) > -1,
        book: data$1.book.indexOf(card.id) > -1,
        any: true
      };
      if (!result.like && !result.wath && !result.book) result.any = false;
      return result;
    }

    function get$4(params) {
      var result = [];
      var ids = data$1[params.type];
      ids.forEach(function (id) {
        for (var i = 0; i < data$1.card.length; i++) {
          var card = data$1.card[i];
          if (card.id == id) result.push(card);
        }
      });
      return result;
    }

    function init$9() {
      data$1 = Storage.get('favorite', '{}');
      Arrays.extend(data$1, {
        like: [],
        wath: [],
        book: [],
        card: []
      });
    }

    var Favorite = {
      check: check,
      add: add$3,
      remove: remove,
      toggle: toggle$7,
      get: get$4,
      init: init$9
    };

    function secondsToTime(sec, _short) {
      var sec_num = parseInt(sec, 10);
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (_short) return hours + ':' + minutes;
      return hours + ':' + minutes + ':' + seconds;
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function substr(txt, len) {
      txt = txt || '';
      return txt.length > len ? txt.substr(0, len) + '...' : txt;
    }

    function numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function bytesToSize(bytes, speed) {
      if (bytes == 0) {
        return '0 Bytes';
      }

      var unitMultiple = 1024;
      var unitNames = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      if (speed) {
        unitNames = ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];
      }

      var unitChanges = Math.floor(Math.log(bytes) / Math.log(unitMultiple));
      return parseFloat((bytes / Math.pow(unitMultiple, unitChanges)).toFixed(2)) + ' ' + unitNames[unitChanges];
    }

    function sizeToBytes(str) {
      var gsize = str.match(/([0-9\\.,]+)\s+(Mb|МБ|GB|ГБ|TB|ТБ)/i);

      if (gsize) {
        var size = parseFloat(gsize[1].replace(',', '.'));
        if (/gb|гб/.test(gsize[2].toLowerCase())) size *= 1024;
        if (/tb|тб/.test(gsize[2].toLowerCase())) size *= 1048576;
        return size * 1048576;
      }

      return 0;
    }

    function time$1(html) {
      var create = function create() {
        var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Ма', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

        this.moth = function (m) {
          var n = months[m];
          var d = n.slice(-1);
          if (d == 'ь') return n.slice(0, n.length - 1) + 'я';else if (n == 'Ма') return n + 'я';else return n + 'а';
        };

        this.tik = function () {
          var date = new Date(),
              time = date.getTime(),
              ofst = parseInt('0');
          date = new Date(time + ofst * 1000 * 60 * 60);
          time = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getFullYear()];

          if (time[0] < 10) {
            time[0] = "0" + time[0];
          }

          if (time[1] < 10) {
            time[1] = "0" + time[1];
          }

          if (time[2] < 10) {
            time[2] = "0" + time[2];
          }

          var current_time = [time[0], time[1]].join(':'),
              current_week = date.getDay(),
              current_day = date.getDate();
          $('.time--clock', html).text(current_time);
          $('.time--week', html).text(days[current_week]);
          $('.time--day', html).text(current_day);
          $('.time--moth', html).text(months[date.getMonth()]);
          $('.time--full', html).text(current_day + ' ' + this.moth(date.getMonth()) + ' ' + time[3]);
        };

        setInterval(this.tik.bind(this), 1000);
        this.tik();
      };

      return new create();
    }

    function parseTime(str) {
      var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Ма', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

      var mouth = function mouth(m) {
        var n = months[m];
        var d = n.slice(-1);
        if (d == 'ь') return n.slice(0, n.length - 1) + 'я';else if (n == 'Ма') return n + 'я';else return n + 'а';
      };

      var date = new Date(str),
          time = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getFullYear()];

      if (time[0] < 10) {
        time[0] = "0" + time[0];
      }

      if (time[1] < 10) {
        time[1] = "0" + time[1];
      }

      if (time[2] < 10) {
        time[2] = "0" + time[2];
      }

      var current_time = [time[0], time[1]].join(':'),
          current_week = date.getDay(),
          current_day = date.getDate();
      return {
        time: current_time,
        week: days[current_week],
        day: current_day,
        mouth: months[date.getMonth()],
        full: current_day + ' ' + mouth(date.getMonth()) + ' ' + time[3]
      };
    }

    function strToTime(str) {
      var date = new Date(str);
      return date.getTime();
    }

    function checkHttp(url) {
      url = url.replace(/https:\/\//, '');
      url = url.replace(/http:\/\//, '');
      url = protocol() + url;
      return url;
    }

    function shortText(fullStr, strLen, separator) {
      if (fullStr.length <= strLen) return fullStr;
      separator = separator || '...';
      var sepLen = separator.length,
          charsToShow = strLen - sepLen,
          frontChars = Math.ceil(charsToShow / 2),
          backChars = Math.floor(charsToShow / 2);
      return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
    }

    function protocol() {
      return window.protocol == 'https:' ? 'https://' : 'http://';
    }

    function addUrlComponent(url, params) {
      return url + (/\?/.test(url) ? '&' : '?') + params;
    }

    function putScript(items, complite) {
      var p = 0;

      function next() {
        if (p >= items.length) return complite();
        var u = items[p];
        var s = document.createElement('script');
        s.onload = next;
        s.onerror = next;
        s.setAttribute('src', u);
        document.body.appendChild(s);
        p++;
      }

      next(items[0]);
    }

    function clearTitle(title) {
      return title.replace(/[^a-zа-я0-9\s]/gi, '');
    }

    function cardImgBackground(card_data) {
      return Storage.get('background_type', 'complex') == 'poster' && card_data.backdrop_path ? Api.img(card_data.backdrop_path, 'original') : card_data.poster_path ? Api.img(card_data.poster_path) : '';
    }

    function stringToHslColor(str, s, l) {
      var hash = 0;

      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }

      var h = hash % 360;
      return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    }

    function pathToNormalTitle(path) {
      var name = path.split('.');
      var exe = name.pop();
      name = name.join('.');
      return (name + '').replace(/_|\./g, ' ') + ' <span class="exe">.' + exe + '</span>';
    }

    var Utils = {
      secondsToTime: secondsToTime,
      capitalizeFirstLetter: capitalizeFirstLetter,
      substr: substr,
      numberWithSpaces: numberWithSpaces,
      time: time$1,
      bytesToSize: bytesToSize,
      parseTime: parseTime,
      checkHttp: checkHttp,
      shortText: shortText,
      protocol: protocol,
      addUrlComponent: addUrlComponent,
      sizeToBytes: sizeToBytes,
      putScript: putScript,
      clearTitle: clearTitle,
      cardImgBackground: cardImgBackground,
      strToTime: strToTime,
      stringToHslColor: stringToHslColor,
      pathToNormalTitle: pathToNormalTitle
    };

    var baseurl = Utils.protocol() + 'api.themoviedb.org/3/';
    var baseimg = Utils.protocol() + 'image.tmdb.org/t/p/w300/';
    var network$1 = new create$n();
    var key = '4ef0d7355d9ffb5151e987764708ce96';
    var lang = 'ru';

    function url$2(u) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      u = add$2(u, 'api_key=' + key);
      u = add$2(u, 'language=' + lang);
      if (params.genres) u = add$2(u, 'with_genres=' + params.genres);
      if (params.page) u = add$2(u, 'page=' + params.page);
      if (params.query) u = add$2(u, 'query=' + params.query);
      return baseurl + u;
    }

    function add$2(u, params) {
      return u + (/\?/.test(u) ? '&' : '?') + params;
    }

    function img(src, size) {
      var path = baseimg;
      if (size) path = path.replace(/w300/g, size);
      return src ? path + src : '';
    }

    function Status(need) {
      this.data = {};
      this.work = 0;

      this.check = function () {
        if (this.work >= need) this.onComplite(this.data);
      };

      this.append = function (name, json) {
        this.work++;
        this.data[name] = json;
        this.check();
      };

      this.error = function () {
        this.work++;
        this.check();
      };
    }

    function main$2() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var status = new Status(8);

      status.onComplite = function () {
        var fulldata = [];
        if (status.data.wath) fulldata.push(status.data.wath);
        if (status.data.trend_day) fulldata.push(status.data.trend_day);
        if (status.data.trend_week) fulldata.push(status.data.trend_week);
        if (status.data.upcoming) fulldata.push(status.data.upcoming);
        if (status.data.popular) fulldata.push(status.data.popular);
        if (status.data.popular_tv) fulldata.push(status.data.popular_tv);
        if (status.data.top) fulldata.push(status.data.top);
        if (status.data.top_tv) fulldata.push(status.data.top_tv);
        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, json) {
        json.title = title;
        status.append(name, json);
      };

      get$3('movie/now_playing', params, function (json) {
        append('Сейчас смотрят', 'wath', json);
      }, status.error.bind(status));
      get$3('trending/moviews/day', params, function (json) {
        append('Сегодня в тренде', 'trend_day', json);
      }, status.error.bind(status));
      get$3('trending/moviews/week', params, function (json) {
        append('В тренде за неделю', 'trend_week', json);
      }, status.error.bind(status));
      get$3('movie/upcoming', params, function (json) {
        append('Смотрите в кинозалах', 'upcoming', json);
      }, status.error.bind(status));
      get$3('movie/popular', params, function (json) {
        append('Популярные фильмы', 'popular', json);
      }, status.error.bind(status));
      get$3('tv/popular', params, function (json) {
        append('Популярные сериалы', 'popular_tv', json);
      }, status.error.bind(status));
      get$3('movie/top_rated', params, function (json) {
        append('Топ фильмы', 'top', json);
      }, status.error.bind(status));
      get$3('tv/top_rated', params, function (json) {
        append('Топ сериалы', 'top_tv', json);
      }, status.error.bind(status));
    }

    function category() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var status = new Status(5);

      status.onComplite = function () {
        var fulldata = [];
        if (status.data.wath && status.data.wath.results.length) fulldata.push(status.data.wath);
        if (status.data.popular && status.data.popular.results.length) fulldata.push(status.data.popular);
        if (status.data.tv_today && status.data.tv_today.results.length) fulldata.push(status.data.tv_today);
        if (status.data.tv_air && status.data.tv_air.results.length) fulldata.push(status.data.tv_air);
        if (status.data.top && status.data.top.results.length) fulldata.push(status.data.top);
        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, json) {
        json.title = title;
        status.append(name, json);
      };

      get$3(params.url + '/now_playing', params, function (json) {
        append('Сейчас смотрят', 'wath', json);
      }, status.error.bind(status));
      get$3(params.url + '/popular', params, function (json) {
        append('Популярное', 'popular', json);
      }, status.error.bind(status));
      get$3(params.url + '/airing_today', params, function (json) {
        append('Сегодня в эфире', 'tv_today', json);
      }, status.error.bind(status));
      get$3(params.url + '/on_the_air', params, function (json) {
        append('На этой неделе', 'tv_air', json);
      }, status.error.bind(status));
      get$3(params.url + '/top_rated', params, function (json) {
        append('В топе', 'top', json);
      }, status.error.bind(status));
    }

    function full() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var status = new Status(5);
      status.onComplite = oncomplite;
      get$3(params.method + '/' + params.id, params, function (json) {
        status.append('movie', json);
      }, status.error.bind(status));
      get$3(params.method + '/' + params.id + '/credits', params, function (json) {
        status.append('actors', json);
      }, status.error.bind(status));
      get$3(params.method + '/' + params.id + '/recommendations', params, function (json) {
        status.append('recomend', json);
      }, status.error.bind(status));
      get$3(params.method + '/' + params.id + '/similar', params, function (json) {
        status.append('simular', json);
      }, status.error.bind(status));
      get$3(params.method + '/' + params.id + '/videos', params, function (json) {
        status.append('videos', json);
      }, status.error.bind(status));
    }

    function categoryFull() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var u = url$2(params.url, params);
      network$1.silent(u, oncomplite, onerror);
    }

    function get$3(method) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
      var onerror = arguments.length > 3 ? arguments[3] : undefined;
      var u = url$2(method, params);
      network$1.silent(u, function (json) {
        json.url = method;
        oncomplite(json);
      }, onerror);
    }

    function search$1() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var status = new Status(2);
      status.onComplite = oncomplite;
      get$3('search/movie', params, function (json) {
        json.title = 'Фильмы';
        status.append('movie', json);
      }, status.error.bind(status));
      get$3('search/tv', params, function (json) {
        json.title = 'Сериалы';
        status.append('tv', json);
      }, status.error.bind(status));
    }

    function actor() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;

      var convert = function convert(json) {
        var results = json.cast.map(function (a) {
          a.year = parseInt((a.release_date || a.first_air_date || '0000').slice(0, 4));
          return a;
        });
        results.sort(function (a, b) {
          return b.year - a.year;
        });
        return {
          results: results.slice(0, 40)
        };
      };

      var status = new Status(3);

      status.onComplite = function () {
        var fulldata = {};
        if (status.data.actor) fulldata.actor = status.data.actor;
        if (status.data.movie && status.data.movie.cast.length) fulldata.movie = convert(status.data.movie);
        if (status.data.tv && status.data.tv.cast.length) fulldata.tv = convert(status.data.tv);
        oncomplite(fulldata);
      };

      get$3('person/' + params.id, params, function (json) {
        status.append('actor', json);
      }, status.error.bind(status));
      get$3('person/' + params.id + '/movie_credits', params, function (json) {
        status.append('movie', json);
      }, status.error.bind(status));
      get$3('person/' + params.id + '/tv_credits', params, function (json) {
        status.append('tv', json);
      }, status.error.bind(status));
    }

    function favorite() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var data = {};
      data.results = Favorite.get(params);
      data.total_pages = Math.ceil(data.results.length / 20);
      data.page = Math.min(params.page, data.total_pages);
      var offset = data.page - 1;
      data.results = data.results.slice(20 * offset, 20 * offset + 20);
      if (data.results.length) oncomplite(data);else onerror();
    }

    function genres$1() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var u = url$2('genre/movie/list', params);
      network$1.silent(u, oncomplite, onerror);
    }

    function company() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var u = url$2('company/' + params.id, params);
      network$1.silent(u, oncomplite, onerror);
    }

    function clear$1() {
      network$1.clear();
    }

    var Api = {
      main: main$2,
      img: img,
      full: full,
      categoryFull: categoryFull,
      genres: genres$1,
      category: category,
      search: search$1,
      clear: clear$1,
      company: company,
      actor: actor,
      favorite: favorite
    };

    var html$e = Template.get('selectbox');
    var scroll$2 = new create$m({
      mask: true,
      over: true
    });
    var active$4;
    html$e.find('.selectbox__body').append(scroll$2.render());
    $('body').append(html$e);

    function bind$3() {
      scroll$2.clear();
      html$e.find('.selectbox__title').text(active$4.title);
      active$4.items.forEach(function (element) {
        if (element.hide) return;
        element.title = Utils.capitalizeFirstLetter(element.title || '');
        var item = Template.get(element.template || 'selectbox_item', element);
        if (!element.subtitle) item.find('.selectbox-item__subtitle').remove();

        if (!element.noenter) {
          var goclose = function goclose() {
            if (!active$4.nohide) hide$1();
            if (active$4.onSelect) active$4.onSelect(element);
          };

          item.on('hover:enter', function () {
            if (active$4.onBeforeClose) {
              if (active$4.onBeforeClose()) goclose();
            } else goclose();
          }).on('hover:focus', function (e) {
            scroll$2.update($(e.target), true);
            if (active$4.onFocus) active$4.onFocus(element, e.target);
          });
        }

        if (element.selected) item.addClass('selected');
        scroll$2.append(item);
      });
    }

    function show$3(object) {
      active$4 = object;
      bind$3();
      $('body').toggleClass('selectbox--open', true);
      html$e.find('.selectbox__body').addClass('layer--wheight').data('mheight', html$e.find('.selectbox__head'));
      toggle$6();
    }

    function toggle$6() {
      Controller.add('select', {
        toggle: function toggle() {
          var selected = scroll$2.render().find('.selected');
          Controller.collectionSet(html$e);
          Controller.collectionFocus(selected.length ? selected[0] : false, html$e);
        },
        up: function up() {
          Navigator.move('up');
        },
        down: function down() {
          Navigator.move('down');
        },
        back: function back() {
          hide$1();
          if (active$4.onBack) active$4.onBack();
        }
      });
      Controller.toggle('select');
    }

    function hide$1() {
      $('body').toggleClass('selectbox--open', false);
    }

    var Select = {
      show: show$3,
      hide: hide$1
    };

    function create$l(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Arrays.extend(data, {
        title: data.name,
        original_title: data.original_name,
        release_date: data.first_air_date
      });
      data.release_date = (data.release_date || '0000').slice(0, 4);
      var card = Template.get('card', data);
      var img = new Image();
      img.crossOrigin = "Anonymous";

      if (params.card_small) {
        card.addClass('card--small');
        card.find('.card__title').remove();
        card.find('.card__age').remove();
      }

      if (params.card_category) {
        card.addClass('card--category');
        card.find('.card__age').remove();
      }

      this.image = function () {
        img.onload = function () {
          card.find('img')[0].src = img.src;
          card.addClass('card--loaded');
        };

        img.onerror = function (e) {
          card.find('img')[0].src = './img/img_broken.svg';
        };
      };

      this.addicon = function (name) {
        card.find('.card__icons-inner').append('<div class="card__icon icon--' + name + '"></div>');
      };

      this.favorite = function () {
        var status = Favorite.check(data);
        card.find('.card__icon').remove();
        if (status.book) this.addicon('book');
        if (status.like) this.addicon('like');
        if (status.wath) this.addicon('wath');
      };

      this.create = function () {
        var _this = this;

        this.favorite();
        card.on('hover:focus', function (e) {
          _this.onFocus(e.target, data);
        }).on('hover:enter', function (e) {
          _this.onEnter(e.target, data);
        }).on('hover:long', function (e) {
          var enabled = Controller.enabled().name;
          var status = Favorite.check(data);
          Select.show({
            title: 'Действие',
            items: [{
              title: status.book ? 'Убрать из закладок' : 'В закладки',
              subtitle: 'Смотрите в меню (Закладки)',
              where: 'book'
            }, {
              title: status.like ? 'Убрать из понравившихся' : 'Нравится',
              subtitle: 'Смотрите в меню (Нравится)',
              where: 'like'
            }, {
              title: status.wath ? 'Убрать из ожидаемых' : 'Смотреть позже',
              subtitle: 'Смотрите в меню (Позже)',
              where: 'wath'
            }],
            onBack: function onBack() {
              Controller.toggle(enabled);
            },
            onSelect: function onSelect(a) {
              Favorite.toggle(a.where, data);

              _this.favorite();

              Controller.toggle(enabled);
            }
          });
        });
        this.image();
      };

      this.visible = function () {
        if (this.visibled) return;
        if (data.poster_path) img.src = Api.img(data.poster_path);else img.src = './img/img_broken.svg';
        this.visibled = true;
      };

      this.destroy = function () {
        img.onerror = function () {};

        img.onload = function () {};

        img.src = '';
        card.remove();
        card = null;
        img = null;
      };

      this.render = function () {
        return card;
      };
    }

    function init$8() {
      $(window).on('resize', update$4);
      toggleClasses();
      Storage.listener.follow('change', function (event) {
        if (event.name == 'interface_size') update$4();
        if (event.name == 'animation' || event.name == 'mask') toggleClasses();
      });
    }

    function size$1() {
      var sl = Storage.field('interface_size');
      var sz = {
        normal: 1,
        small: 0.9,
        bigger: 1.1
      };
      var fs = sz[sl];
      $('body').css({
        fontSize: Math.max(window.innerWidth / 84.17 * fs, 10.6) + 'px'
      });
    }

    function update$4() {
      size$1();
      $('.layer--width').css('width', window.innerWidth);
      $('.layer--height').css('height', window.innerHeight);
      var head = $('.head')[0].getBoundingClientRect();
      $('.layer--wheight').each(function () {
        var elem = $(this),
            heig = window.innerHeight - head.height;

        if (elem.data('mheight')) {
          heig -= elem.data('mheight')[0].getBoundingClientRect().height;
        }

        elem.css('height', heig);
      });
    }

    function toggleClasses() {
      $('body').toggleClass('no--animation', !Storage.field('animation'));
      $('body').toggleClass('no--mask', !Storage.field('mask'));
    }

    var Layer = {
      update: update$4,
      init: init$8
    };

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    canvas.width = 30;
    canvas.height = 17;

    function extract(img_data) {
      var data = img_data.data,
          colors = [];

      for (var i = 0, n = data.length; i < n; i += 4) {
        colors.push([data[i], data[i + 1], data[i + 2]]);
      }

      return colors;
    }

    function palette(palette) {
      var colors = {
        bright: [0, 0, 0],
        average: [127, 127, 127],
        dark: [255, 255, 255]
      };
      var ar = 0,
          ag = 0,
          ab = 0,
          at = palette.length;
      var bg = 0,
          dk = 765;

      for (var i = 0; i < palette.length; i++) {
        var p = palette[i],
            a = p[0] + p[1] + p[2];
        ar += p[0];
        ag += p[1];
        ab += p[2];

        if (a > bg) {
          bg = a;
          colors.bright = p;
        }

        if (a < dk) {
          dk = a;
          colors.dark = p;
        }
      }

      colors.average = [Math.round(ar / at), Math.round(ag / at), Math.round(ab / at)];
      return colors;
    }

    function rgba(c) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return 'rgba(' + c.join(',') + ',' + o + ')';
    }

    function tone(c) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
      var l = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 80;
      var hls = rgbToHsl(c[0], c[1], c[2]);
      var rgb = hslToRgb(hls[0], Math.min(s, hls[1]), l);
      return rgba(rgb, o);
    }
    /**
     * Converts an RGB color value to HSL.
     *
     * @param   {number}  r       The red color value
     * @param   {number}  g       The green color value
     * @param   {number}  b       The blue color value
     * @return  {Array}           The HSL representation
     */


    function rgbToHsl(r, g, b) {
      var rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
      rabs = r / 255;
      gabs = g / 255;
      babs = b / 255;
      v = Math.max(rabs, gabs, babs), diff = v - Math.min(rabs, gabs, babs);

      diffc = function diffc(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };

      percentRoundFn = function percentRoundFn(num) {
        return Math.round(num * 100) / 100;
      };

      if (diff == 0) {
        h = s = 0;
      } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
          h = bb - gg;
        } else if (gabs === v) {
          h = 1 / 3 + rr - bb;
        } else if (babs === v) {
          h = 2 / 3 + gg - rr;
        }

        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }

      return [Math.round(h * 360), percentRoundFn(s * 100), percentRoundFn(v * 100)];
    }
    /**
     * Converts an HSL color value to RGB.
     *
     * @param   {number}  h       The hue
     * @param   {number}  s       The saturation
     * @param   {number}  l       The lightness
     * @return  {Array}           The RGB representation
     */


    function hslToRgb(h, s, l) {
      s /= 100;
      l /= 100;
      var C = (1 - Math.abs(2 * l - 1)) * s;
      var hue = h / 60;
      var X = C * (1 - Math.abs(hue % 2 - 1));
      var r = 0,
          g = 0,
          b = 0;

      if (hue >= 0 && hue < 1) {
        r = C;
        g = X;
      } else if (hue >= 1 && hue < 2) {
        r = X;
        g = C;
      } else if (hue >= 2 && hue < 3) {
        g = C;
        b = X;
      } else if (hue >= 3 && hue < 4) {
        g = X;
        b = C;
      } else if (hue >= 4 && hue < 5) {
        r = X;
        b = C;
      } else {
        r = C;
        b = X;
      }

      var m = l - C / 2;
      r += m;
      g += m;
      b += m;
      r *= 255.0;
      g *= 255.0;
      b *= 255.0;
      return [Math.round(r), Math.round(g), Math.round(b)];
    }

    function get$2(img) {
      var ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
      var nw = img.width * ratio,
          nh = img.height * ratio;
      ctx.drawImage(img, -(nw - canvas.width) / 2, -(nh - canvas.height) / 2, nw, nh);
      return extract(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

    var Color = {
      get: get$2,
      extract: extract,
      palette: palette,
      rgba: rgba,
      tone: tone
    };

    var html$d = $("\n    <div class=\"background\">\n        <canvas class=\"background__one\"></canvas>\n        <canvas class=\"background__two\"></canvas>\n    </div>\n");
    var background = {
      one: {
        canvas: $('.background__one', html$d),
        ctx: $('.background__one', html$d)[0].getContext('2d')
      },
      two: {
        canvas: $('.background__two', html$d),
        ctx: $('.background__two', html$d)[0].getContext('2d')
      }
    };
    var view = 'one';
    var src = '';
    var loaded = {};
    var timer$4;

    function bg() {
      html$d.find('canvas').removeClass('visible');
      view = view == 'one' ? 'two' : 'one';
      return background[view];
    }

    function draw(data, item) {
      if (!Storage.get('background', 'true')) {
        background.one.canvas.removeClass('visible');
        background.two.canvas.removeClass('visible');
        return;
      }

      item.canvas[0].width = window.innerWidth;
      item.canvas[0].height = window.innerHeight;
      var palette = data.palette;
      var type = Storage.get('background_type', 'complex');

      if (type !== 'poster') {
        var angle = 90 * Math.PI / 180,
            x2 = item.canvas[0].width * Math.cos(angle),
            y2 = item.canvas[0].height * Math.sin(angle);
        var gradient = item.ctx.createLinearGradient(0, 0, x2, y2);
        gradient.addColorStop(1, Color.tone(palette.average, 0.7, 50, 80));
        gradient.addColorStop(0, Color.rgba(palette.dark, 0.2));
        item.ctx.fillStyle = gradient;
        item.ctx.fillRect(0, 0, item.canvas[0].width, item.canvas[0].height);
      } else {
        var ratio = Math.max(item.canvas[0].width / data.img.width, item.canvas[0].height / data.img.height);
        item.ctx.globalAlpha = data.img.width > 1000 ? 0.3 : 0.6;
        item.ctx.filter = data.img.width > 1000 ? '' : 'blur(14px)';
        var nw = data.img.width * ratio,
            nh = data.img.height * ratio;
        item.ctx.drawImage(data.img, -(nw - item.canvas[0].width) / 2, -(nh - item.canvas[0].height) / 2, nw, nh);
        item.ctx.globalAlpha = 0.7;
        var angle = 90 * Math.PI / 180,
            x2 = item.canvas[0].width * Math.cos(angle),
            y2 = item.canvas[0].height * Math.sin(angle);
        var gradient = item.ctx.createLinearGradient(0, 0, x2, y2);
        gradient.addColorStop(0, 'rgba(0,0,0,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        item.ctx.fillStyle = gradient;
        item.ctx.fillRect(0, 0, item.canvas[0].width, item.canvas[0].height);
      }

      if (type == 'complex') {
        for (var i = 0; i < 10; i++) {
          var x = window.innerWidth * Math.random(),
              y = window.innerHeight * Math.random(),
              r = Math.max(window.innerHeight / 8, window.innerHeight / 5 * Math.random());
          var circle = item.ctx.createRadialGradient(x, y, r, x, y, r * 2);
          circle.addColorStop(0, Color.tone(i < 5 ? palette.average : palette.bright, 0.1));
          circle.addColorStop(0.5, Color.tone(i < 5 ? palette.average : palette.bright, 0.05));
          circle.addColorStop(1, Color.tone(i < 5 ? palette.average : palette.bright, 0));
          item.ctx.beginPath();
          item.ctx.fillStyle = circle;
          item.ctx.arc(x, y, r * 2, 0, 2 * Math.PI);
          item.ctx.fill();
        }
      }

      item.canvas.addClass('visible');
    }

    function resize() {
      if (loaded[src]) draw(loaded[src], background[view]);
    }

    function limit$1() {
      var a = Arrays.getKeys(loaded);

      if (a.length > 30) {
        var u = a.slice(0, 1);
        delete loaded[u];
      }
    }

    function load() {
      if (loaded[src]) {
        draw(loaded[src], bg());
      } else if (src) {
        limit$1();
        var colors;
        var img = new Image();
        img.crossOrigin = "Anonymous";

        img.onload = function () {
          try {
            colors = Color.get(img);
          } catch (e) {
            colors = [[200, 200, 200], [100, 100, 100], [10, 10, 10]];
          }

          loaded[src] = {
            img: img,
            palette: Color.palette(colors)
          };
          draw(loaded[src], bg());
        };

        img.src = src;
      }
    }

    function change() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      url = url.replace('https://', 'http://');
      if (url == src) return;
      if (url) src = url;
      clearTimeout(timer$4);
      timer$4 = setTimeout(function () {
        load();
      }, 2000);
    }

    function immediately() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (url) src = url;
      clearTimeout(timer$4);
      load();
    }

    function render$9() {
      return html$d;
    }

    function init$7() {
      Storage.listener.follow('change', function (event) {
        if (event.name == 'background' || event.name == 'background_type') resize();
      });
      $(window).on('resize', resize);
    }

    var Background = {
      render: render$9,
      change: change,
      update: resize,
      init: init$7,
      immediately: immediately
    };

    function create$k() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var card = Template.get('more');

      if (params.card_small) {
        card.addClass('card-more--small');
      }

      this.create = function () {
        var _this = this;

        card.on('hover:focus', function (e) {
          _this.onFocus(e.target);
        }).on('hover:enter', function (e) {
          _this.onEnter(e.target);
        });
      };

      this.render = function () {
        return card;
      };

      this.destroy = function () {
        card.remove();
        card = null;
      };
    }

    function create$j(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var content = Template.get('items_line', {
        title: data.title
      });
      var body = content.find('.items-line__body');
      var scroll = new create$m({
        horizontal: true
      });
      var items = [];
      var active = 0;
      var more;
      var last;

      this.create = function () {
        scroll.render().find('.scroll__body').addClass('items-cards');
        content.find('.items-line__title').text(data.title);
        this.bind();
        body.append(scroll.render());
      };

      this.bind = function () {
        data.results.slice(0, 8).forEach(this.append.bind(this));
        if (data.results.length >= 20 && !params.nomore) this.more();
        this.visible();
        Layer.update();
      };

      this.append = function (element) {
        var _this = this;

        if (element.ready) return;
        element.ready = true;
        var card = new create$l(element, params);
        card.create();

        card.onFocus = function (target, card_data) {
          last = target;
          active = items.indexOf(card);
          data.results.slice(0, active + 5).forEach(_this.append.bind(_this));

          if (more) {
            more.render().detach();
            scroll.append(more.render());
          }

          scroll.update(items[active].render(), params.align_left ? false : true);

          _this.visible();

          if (!data.noimage) Background.change(Utils.cardImgBackground(card_data));
          if (_this.onFocus) _this.onFocus(card_data);
        };

        card.onEnter = function (target, card_data) {
          if (_this.onEnter) _this.onEnter();
          Activity$1.push({
            url: '',
            component: 'full',
            id: element.id,
            method: card_data.name ? 'tv' : 'movie',
            card: element
          });
        };

        scroll.append(card.render());
        items.push(card);
      };

      this.more = function () {
        var _this2 = this;

        more = new create$k(params);
        more.create();

        more.onFocus = function (target) {
          last = target;
          scroll.update(more.render(), params.align_left ? false : true);
        };

        more.onEnter = function () {
          if (_this2.onEnter) _this2.onEnter();

          if (_this2.onMore) {
            _this2.onMore();
          } else {
            Activity$1.push({
              url: data.url,
              title: 'Категория',
              component: 'category_full',
              page: 2,
              genres: params.genres
            });
          }
        };

        scroll.append(more.render());
      };

      this.visible = function () {
        items.slice(active, active + 8).forEach(function (item) {
          item.visible();
        });
      };

      this.toggle = function () {
        var _this3 = this;

        Controller.add('items_line', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(items.length ? last : false, scroll.render());

            _this3.visible();
          },
          right: function right() {
            Navigator.move('right');
            Controller.enable('items_line');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else if (_this3.onLeft) _this3.onLeft();else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('items_line');
      };

      this.render = function () {
        return content;
      };

      this.destroy = function () {
        Arrays.destroy(items);
        scroll.destroy();
        content.remove();
        if (more) more.destroy();
        items = null;
        more = null;
      };
    }

    function create$i() {
      var html;

      this.create = function () {
        html = Template.get('info');
      };

      this.update = function (data) {
        html.find('.info__title').text(data.title);
        html.find('.info__title-original').text(data.original_title);
        html.find('.info__create').text((data.release_date || data.first_air_date).slice(0, 4));
        html.find('.info__rate span').text(data.vote_average);
        html.find('.info__icon').removeClass('active');
        var status = Favorite.check(data);
        $('.icon--book', html).toggleClass('active', status.book);
        $('.icon--like', html).toggleClass('active', status.like);
        $('.icon--wath', html).toggleClass('active', status.wath);
      };

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        html.remove();
        html = null;
      };
    }

    function create$h() {
      var html = Template.get('empty');

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(html);
            Controller.collectionFocus(false, html);
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            Navigator.move('right');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.render = function (add) {
        if (add) html.append(add);
        return html;
      };
    }

    function component$8(object) {
      var network = new create$n();
      var scroll = new create$m({
        mask: true,
        over: true
      });
      var items = [];
      var html = $('<div></div>');
      var active = 0;
      var info;
      var lezydata;

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.main(object, this.build.bind(this), function () {
          var empty = new create$h();
          html.append(empty.render());
          _this.start = empty.start;

          _this.activity.loader(false);

          _this.activity.toggle();
        });
        return this.render();
      };

      this.build = function (data) {
        lezydata = data;
        info = new create$i();
        info.create();
        scroll.render().addClass('layer--wheight').data('mheight', info.render());
        html.append(info.render());
        html.append(scroll.render());
        data.slice(0, 2).forEach(this.append.bind(this));
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.append = function (element) {
        if (element.ready) return;
        element.ready = true;
        var item = new create$j(element, {
          url: element.url,
          card_small: true,
          genres: object.genres
        });
        item.create();
        item.onDown = this.down.bind(this);
        item.onUp = this.up;
        item.onFocus = info.update;
        item.onBack = this.back;
        scroll.append(item.render());
        items.push(item);
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.down = function () {
        active++;
        active = Math.min(active, items.length - 1);
        lezydata.slice(0, active + 2).forEach(this.append.bind(this));
        items[active].toggle();
        scroll.update(items[active].render());
      };

      this.up = function () {
        active--;

        if (active < 0) {
          active = 0;
          Controller.toggle('head');
        } else {
          items[active].toggle();
        }

        scroll.update(items[active].render());
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            if (items.length) {
              items[active].toggle();
            }
          },
          back: this.back
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        if (info) info.destroy();
        html.remove();
        items = null;
        network = null;
        lezydata = null;
      };
    }

    var player;
    var html$c;
    var timer$3;

    function create$g(id) {
      html$c = $('<div class="youtube-player"><div id="youtube-player"></div><div id="youtube-player__progress" class="youtube-player__progress"></div></div>');
      $('body').append(html$c);
      player = new YT.Player('youtube-player', {
        height: window.innerHeight,
        width: window.innerWidth,
        playerVars: {
          'controls': 0,
          'showinfo': 0,
          'autohide': 1,
          'modestbranding': 1,
          'autoplay': 1
        },
        videoId: id,
        events: {
          onReady: function onReady(event) {
            event.target.playVideo();
            update$3();
          },
          onStateChange: function onStateChange(state) {
            if (state.data == 0) {
              Controller.toggle('content');
            }
          }
        }
      });
    }

    function update$3() {
      timer$3 = setTimeout(function () {
        var progress = player.getCurrentTime() / player.getDuration() * 100;
        $('#youtube-player__progress').css('width', progress + '%');
        update$3();
      }, 400);
    }

    function play$2(id) {
      create$g(id);
      Controller.add('youtube', {
        invisible: true,
        toggle: function toggle() {},
        right: function right() {
          player.seekTo(player.getCurrentTime() + 10, true);
        },
        left: function left() {
          player.seekTo(player.getCurrentTime() - 10, true);
        },
        enter: function enter() {},
        gone: function gone() {
          destroy$7();
        },
        back: function back() {
          Controller.toggle('content');
        }
      });
      Controller.toggle('youtube');
    }

    function destroy$7() {
      clearTimeout(timer$3);
      player.destroy();
      html$c.remove();
      html$c = null;
    }

    var YouTube = {
      play: play$2
    };

    function create$f(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var html;
      var last;

      var follow = function follow() {
        var status = Storage.get('parser_use');
        html.find('.view--torrent').toggleClass('selector', status).toggleClass('hide', !status);
      };

      Arrays.extend(data.movie, {
        title: data.movie.name,
        original_title: data.movie.original_name,
        runtime: 0,
        img: data.movie.poster_path ? Api.img(data.movie.poster_path) : 'img/img_broken.svg'
      });

      this.create = function () {
        var genres = (data.movie.genres || ['---']).slice(0, 3).map(function (a) {
          return Utils.capitalizeFirstLetter(a.name);
        }).join(', ');
        html = Template.get('full_start', {
          title: data.movie.title,
          original_title: data.movie.original_title,
          descr: Utils.substr(data.movie.overview, 420),
          img: data.movie.img,
          time: Utils.secondsToTime(data.movie.runtime * 60, true),
          genres: genres,
          r_themovie: data.movie.vote_average,
          seasons: data.movie.number_of_seasons,
          episodes: data.movie.number_of_episodes
        });

        if (data.movie.number_of_seasons) {
          html.find('.is--serial').removeClass('hide');
        }

        html.find('.view--torrent').on('hover:enter', function () {
          var s = data.movie.original_title;

          if (!/\w{3}/.test(s)) {
            s = data.movie.title;
          }

          Activity$1.push({
            url: '',
            title: 'Торренты',
            component: 'torrents',
            search: s,
            movie: data.movie,
            page: 1
          });
        });

        if (data.videos && data.videos.results.length) {
          html.find('.view--trailer').on('hover:enter', function () {
            var items = [];
            data.videos.results.forEach(function (element) {
              items.push({
                title: element.name,
                subtitle: element.official ? 'Официальный' : 'Неофициальный',
                id: element.key
              });
            });
            Select.show({
              title: 'Трейлеры',
              items: items,
              onSelect: function onSelect(a) {
                YouTube.play(a.id);
              },
              onBack: function onBack() {
                Controller.toggle('full_start');
              }
            });
          });
        } else {
          html.find('.view--trailer').remove();
        }

        Background.immediately(Utils.cardImgBackground(data.movie));
        Storage.listener.follow('change', follow);
        follow();
        this.menu();
        this.favorite();
      };

      this.menu = function () {
        var _this = this;

        html.find('.open--menu').on('hover:enter', function () {
          var enabled = Controller.enabled().name;
          var status = Favorite.check(params.object.card);
          var menu = [];
          menu.push({
            title: status.book ? 'Убрать из закладок' : 'В закладки',
            subtitle: 'Смотрите в меню (Закладки)',
            where: 'book'
          });
          menu.push({
            title: status.like ? 'Убрать из понравившихся' : 'Нравится',
            subtitle: 'Смотрите в меню (Нравится)',
            where: 'like'
          });
          menu.push({
            title: status.wath ? 'Убрать из ожидаемых' : 'Смотреть позже',
            subtitle: 'Смотрите в меню (Позже)',
            where: 'wath'
          });
          Select.show({
            title: 'Действие',
            items: menu,
            onBack: function onBack() {
              Controller.toggle(enabled);
            },
            onSelect: function onSelect(a) {
              Favorite.toggle(a.where, params.object.card);

              _this.favorite();

              Controller.toggle(enabled);
            }
          });
        });
      };

      this.favorite = function () {
        var status = Favorite.check(params.object.card);
        $('.info__icon', html).removeClass('active');
        $('.icon--book', html).toggleClass('active', status.book);
        $('.icon--like', html).toggleClass('active', status.like);
        $('.icon--wath', html).toggleClass('active', status.wath);
      };

      this.toggle = function () {
        var _this2 = this;

        Controller.add('full_start', {
          toggle: function toggle() {
            Controller.collectionSet(_this2.render());
            Controller.collectionFocus(last, _this2.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_start');
      };

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        last = null;
        html.remove();
        Storage.listener.remove('change', follow);
      };
    }

    var html$b, active$3, scroll$1, last$4;

    function open$1(params) {
      active$3 = params;
      html$b = Template.get('modal', {
        title: params.title
      });
      title$2(params.title);
      html$b.toggleClass('modal--medium', params.size == 'medium' ? true : false);
      html$b.toggleClass('modal--large', params.size == 'large' ? true : false);
      scroll$1 = new create$m({
        over: true,
        mask: params.mask
      });
      html$b.find('.modal__body').append(scroll$1.render());
      bind$2(params.html);
      scroll$1.append(params.html);
      $('body').append(html$b);
      toggle$5();
    }

    function bind$2(where) {
      where.find('.selector').on('hover:focus', function (e) {
        last$4 = e.target;
        scroll$1.update($(e.target));
      }).on('hover:enter', function (e) {
        if (active$3.onSelect) active$3.onSelect($(e.target));
      });
    }

    function toggle$5() {
      Controller.add('modal', {
        invisible: true,
        toggle: function toggle() {
          Controller.collectionSet(scroll$1.render());
          Controller.collectionFocus(last$4, scroll$1.render());
        },
        up: function up() {
          Navigator.move('up');
        },
        down: function down() {
          Navigator.move('down');
        },
        back: function back() {
          if (active$3.onBack) active$3.onBack();
        }
      });
      Controller.toggle('modal');
    }

    function update$2(new_html) {
      last$4 = false;
      scroll$1.clear();
      scroll$1.append(new_html);
      bind$2(new_html);
      toggle$5();
    }

    function title$2(tit) {
      html$b.find('.modal__title').text(tit);
      html$b.toggleClass('modal--empty-title', tit ? false : true);
    }

    function destroy$6() {
      last$4 = false;
      scroll$1.destroy();
      html$b.remove();
    }

    function close$1() {
      destroy$6();
    }

    var Modal = {
      open: open$1,
      close: close$1,
      update: update$2,
      title: title$2
    };

    function create$e(data) {
      var html, body, last;

      this.create = function () {
        html = Template.get('items_line', {
          title: 'Подробно'
        });
        var genres = data.movie.genres.map(function (a) {
          return '<div class="full-descr__tag selector" data-genre="' + a.id + '">' + a.name + '</div>';
        }).join('');
        var companies = data.movie.production_companies.map(function (a) {
          return '<div class="full-descr__tag selector" data-company="' + a.id + '">' + a.name + '</div>';
        }).join('');
        var countries = data.movie.production_countries.map(function (a) {
          return a.name;
        }).join(', ');
        body = Template.get('full_descr', {
          text: data.movie.overview,
          genres: genres,
          companies: companies,
          relise: data.movie.release_date || data.movie.first_air_date,
          budget: '$ ' + Utils.numberWithSpaces(data.movie.budget || 0),
          countries: countries
        });
        body.find('.selector').on('hover:enter', function (e) {
          var item = $(e.target);

          if (item.data('genre')) {
            Activity$1.push({
              url: 'movie',
              component: 'category',
              genres: item.data('genre')
            });
          }

          if (item.data('company')) {
            Api.clear();
            Modal.open({
              title: 'Компания',
              html: Template.get('modal_loading'),
              size: 'medium',
              onBack: function onBack() {
                Modal.close();
                Controller.toggle('full_descr');
              }
            });
            Api.company({
              id: item.data('company')
            }, function (json) {
              if (Controller.enabled().name == 'modal') {
                Arrays.empty(json, {
                  homepage: '---',
                  origin_country: '---',
                  headquarters: '---'
                });
                Modal.update(Template.get('company', json));
              }
            }, function () {});
          }
        }).on('hover:focus', function (e) {
          last = e.target;
        });
        html.find('.items-line__body').append(body);
      };

      this.toggle = function () {
        var _this = this;

        Controller.add('full_descr', {
          toggle: function toggle() {
            Controller.collectionSet(_this.render());
            Controller.collectionFocus(last, _this.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');else _this.onDown();
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else _this.onUp();
          },
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_descr');
      };

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        body.remove();
        html.remove();
        html = null;
        body = null;
      };
    }

    function create$d(data) {
      var html, scroll, last;

      this.create = function () {
        html = Template.get('items_line', {
          title: 'Актеры'
        });
        scroll = new create$m({
          horizontal: true
        });
        scroll.render().find('.scroll__body').addClass('full-actors');
        html.find('.items-line__body').append(scroll.render());
        data.actors.cast.forEach(function (element) {
          var actor = Template.get('full_actor', {
            firstname: element.name,
            lastname: element.character,
            img: element.profile_path ? Api.img(element.profile_path) : './img/actor.svg'
          });
          actor.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
          }).on('hover:enter', function () {
            Activity$1.push({
              url: '',
              title: 'Актер',
              component: 'actor',
              id: element.id
            });
          });
          scroll.append(actor);
        });
      };

      this.toggle = function () {
        var _this = this;

        Controller.add('full_descr', {
          toggle: function toggle() {
            Controller.collectionSet(_this.render());
            Controller.collectionFocus(last, _this.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_descr');
      };

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        scroll.destroy();
        html.remove();
        html = null;
      };
    }

    var components$1 = {
      start: create$f,
      descr: create$e,
      actors: create$d,
      recomend: create$j,
      simular: create$j
    };

    function component$7(object) {
      var network = new create$n();
      var scroll = new create$m({
        mask: true
      });
      var items = [];
      var active = 0;
      scroll.render().addClass('layer--wheight');

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.full(object, function (data) {
          _this.activity.loader(false);

          if (data.movie) {
            _this.build('start', data);

            _this.build('descr', data);

            if (data.actors && data.actors.cast && data.actors.cast.length) _this.build('actors', data);

            if (data.recomend && data.recomend.results.length) {
              data.recomend.title = 'Рекомендации';
              data.recomend.noimage = true;

              _this.build('recomend', data.recomend);
            }

            if (data.simular && data.simular.results.length) {
              data.simular.title = 'Похожие';
              data.simular.noimage = true;

              _this.build('simular', data.simular);
            }

            Background.change(Utils.cardImgBackground(data.movie));

            _this.activity.toggle();
          }
        }, function () {});
        return this.render();
      };

      this.build = function (name, data) {
        var item = new components$1[name](data, {
          object: object
        });
        item.onDown = this.down;
        item.onUp = this.up;
        item.onBack = this.back;
        item.create();
        items.push(item);
        scroll.append(item.render());
      };

      this.down = function () {
        active++;
        active = Math.min(active, items.length - 1);
        items[active].toggle();
        scroll.update(items[active].render());
      };

      this.up = function () {
        active--;

        if (active < 0) {
          active = 0;
          Controller.toggle('head');
        } else {
          items[active].toggle();
        }

        scroll.update(items[active].render());
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            if (items.length) {
              items[active].toggle();
            }
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return scroll.render();
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        items = null;
        network = null;
      };
    }

    function component$6(object) {
      var network = new create$n();
      var scroll = new create$m({
        mask: true,
        over: true
      });
      var items = [];
      var html = $('<div></div>');
      var body = $('<div class="category-full"></div>');
      var total_pages = 0;
      var info;
      var last;
      var waitload;

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.categoryFull(object, this.build.bind(this), function () {
          var empty = new create$h();
          html.append(empty.render());
          _this.start = empty.start;

          _this.activity.loader(false);

          _this.activity.toggle();
        });
        return this.render();
      };

      this.next = function () {
        var _this2 = this;

        if (waitload) return;

        if (object.page < 15 && object.page < total_pages) {
          waitload = true;
          object.page++;
          Api.categoryFull(object, function (result) {
            _this2.append(result);

            waitload = false;
            Controller.enable('content');
          }, function () {});
        }
      };

      this.append = function (data) {
        var _this3 = this;

        data.results.forEach(function (element) {
          var card = new create$l(element, {
            card_category: true
          });
          card.create();

          card.onFocus = function (target, card_data) {
            last = target;
            scroll.update(card.render(), true);
            Background.change(Api.img(card_data.poster_path));
            info.update(card_data);
            var maxrow = Math.ceil(items.length / 7) - 1;
            if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
          };

          card.onEnter = function (target, card_data) {
            Activity$1.push({
              url: '',
              component: 'full',
              id: element.id,
              method: card_data.name ? 'tv' : 'movie',
              card: element
            });
          };

          card.visible();
          body.append(card.render());
          items.push(card);
        });
      };

      this.build = function (data) {
        total_pages = data.total_pages;
        info = new create$i();
        info.create();
        scroll.render().addClass('layer--wheight').data('mheight', info.render());
        html.append(info.render());
        html.append(scroll.render());
        this.append(data);
        scroll.append(body);
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        if (info) info.destroy();
        html.remove();
        body.remove();
        network = null;
        items = null;
        html = null;
        body = null;
        info = null;
      };
    }

    function component$5(object) {
      var network = new create$n();
      var scroll = new create$m({
        mask: true,
        over: true
      });
      var items = [];
      var html = $('<div></div>');
      var active = 0;
      var info;
      var lezydata;

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.category(object, this.build.bind(this), function () {
          var empty = new create$h();
          html.append(empty.render());
          _this.start = empty.start;

          _this.activity.loader(false);

          _this.activity.toggle();
        });
        return this.render();
      };

      this.build = function (data) {
        lezydata = data;
        info = new create$i();
        info.create();
        scroll.render().addClass('layer--wheight').data('mheight', info.render());
        html.append(info.render());
        html.append(scroll.render());
        data.slice(0, 2).forEach(this.append.bind(this));
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.append = function (element) {
        if (element.ready) return;
        element.ready = true;
        var item = new create$j(element, {
          url: element.url,
          card_small: true,
          genres: object.genres
        });
        item.create();
        item.onDown = this.down.bind(this);
        item.onUp = this.up;
        item.onFocus = info.update;
        item.onBack = this.back;
        scroll.append(item.render());
        items.push(item);
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.down = function () {
        active++;
        active = Math.min(active, items.length - 1);
        lezydata.slice(0, active + 2).forEach(this.append.bind(this));
        items[active].toggle();
        scroll.update(items[active].render());
      };

      this.up = function () {
        active--;

        if (active < 0) {
          active = 0;
          Controller.toggle('head');
        } else {
          items[active].toggle();
        }

        scroll.update(items[active].render());
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            if (items.length) {
              items[active].toggle();
            }
          },
          back: this.back
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        if (info) info.destroy();
        html.remove();
        html = null;
        network = null;
        lezydata = null;
      };
    }

    function create$c(data) {
      var html;
      var last;

      this.create = function () {
        html = Template.get('actor_start', {
          name: data.name,
          birthday: data.birthday,
          descr: Utils.substr(data.biography, 1020),
          img: Api.img(data.profile_path),
          place: data.place_of_birth
        });
      };

      this.toggle = function () {
        var _this = this;

        Controller.add('full_start', {
          toggle: function toggle() {
            Controller.collectionSet(_this.render());
            Controller.collectionFocus(last, _this.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_start');
      };

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        last = null;
        html.remove();
      };
    }

    var components = {
      start: create$c,
      movie: create$j,
      tv: create$j
    };

    function component$4(object) {
      var network = new create$n();
      var scroll = new create$m({
        mask: true
      });
      var items = [];
      var active = 0;
      scroll.render().addClass('layer--wheight');

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.actor(object, function (data) {
          _this.activity.loader(false);

          if (data.actor) {
            _this.build('start', data.actor);

            if (data.movie && data.movie.results.length) {
              data.movie.title = 'Фильмы';
              data.movie.noimage = true;

              _this.build('movie', data.movie);
            }

            if (data.tv && data.tv.results.length) {
              data.tv.title = 'Сериалы';
              data.tv.noimage = true;

              _this.build('tv', data.tv);
            }

            _this.activity.toggle();
          }
        }, function () {});
        return this.render();
      };

      this.build = function (name, data) {
        var item = new components[name](data, {
          nomore: true
        });
        item.onDown = this.down;
        item.onUp = this.up;
        item.onBack = this.back;
        item.create();
        items.push(item);
        scroll.append(item.render());
      };

      this.down = function () {
        active++;
        active = Math.min(active, items.length - 1);
        items[active].toggle();
        scroll.update(items[active].render());
      };

      this.up = function () {
        active--;

        if (active < 0) {
          active = 0;
          Controller.toggle('head');
        } else {
          items[active].toggle();
        }

        scroll.update(items[active].render());
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            if (items.length) {
              items[active].toggle();
            }
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return scroll.render();
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        items = null;
        network = null;
      };
    }

    function component$3(object) {
      var network = new create$n();
      var scroll = new create$m({
        mask: true
      });
      var items = [];
      var html = $('<div></div>');
      var body = $('<div class="category-full"></div>');
      var total_pages = 0;
      var info;
      var last;
      var waitload;

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.favorite(object, this.build.bind(this), function () {
          var empty = new create$h();
          html.append(empty.render());
          _this.start = empty.start;

          _this.activity.loader(false);

          _this.activity.toggle();
        });
        return this.render();
      };

      this.next = function () {
        var _this2 = this;

        if (waitload) return;

        if (object.page < 15 && object.page < total_pages) {
          waitload = true;
          object.page++;
          Api.favorite(object, function (result) {
            _this2.append(result);

            waitload = false;
            Controller.enable('content');
          }, function () {});
        }
      };

      this.append = function (data) {
        var _this3 = this;

        data.results.forEach(function (element) {
          var card = new create$l(element, {
            card_category: true
          });
          card.create();

          card.onFocus = function (target, card_data) {
            last = target;
            scroll.update(card.render(), true);
            Background.change(Utils.cardImgBackground(card_data));
            info.update(card_data);
            var maxrow = Math.ceil(items.length / 7) - 1;
            if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
          };

          card.onEnter = function (target, card_data) {
            Activity$1.push({
              url: '',
              component: 'full',
              id: element.id,
              method: card_data.name ? 'tv' : 'movie',
              card: element
            });
          };

          card.visible();
          body.append(card.render());
          items.push(card);
        });
      };

      this.build = function (data) {
        total_pages = data.total_pages;
        info = new create$i();
        info.create();
        scroll.render().addClass('layer--wheight').data('mheight', info.render());
        html.append(info.render());
        html.append(scroll.render());
        this.append(data);
        scroll.append(body);
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        if (info) info.destroy();
        html.remove();
        body.remove();
        network = null;
        items = null;
        html = null;
        body = null;
        info = null;
      };
    }

    function create$b() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var html = Template.get('files', params.movie);

      this.render = function () {
        return html;
      };

      this.append = function (add) {
        html.find('.files__body').append(add);
      };

      this.destroy = function () {
        html.remove();
        html = null;
      };

      this.clear = function () {
        html.find('.files__body').empty();
      };
    }

    function create$a() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var search = Template.get('search_box');
      var input = '';

      function destroy() {
        keyboard.destroy();
        search.remove();
        search = null;
      }

      function back() {
        destroy();
        params.onBack();
      }

      function enter() {
        destroy();
        params.onSearch(input);
      }

      function change(text) {
        input = text.trim();

        if (input) {
          search.find('.search-box__input').text(input);
        } else {
          search.find('.search-box__input').text('Введите текст...');
        }
      }

      $('body').append(search);
      var keyboard = new create$4({
        layout: {
          'en': ['1 2 3 4 5 6 7 8 9 0 {bksp}', 'q w e r t y u i o p', 'a s d f g h j k l', 'z x c v b n m', '{RU} {space} {enter}'],
          'default': ['1 2 3 4 5 6 7 8 9 0 {bksp}', 'й ц у к е н г ш щ з х ъ', 'ф ы в а п р о л д ж э', 'я ч с м и т ь б ю', '{EN} {space} {enter}']
        }
      });
      keyboard.create();
      keyboard.listener.follow('change', function (event) {
        change(event.value);
      });
      keyboard.listener.follow('back', back);
      keyboard.listener.follow('enter', enter);
      keyboard.value(params.input);
      change(params.input);
      keyboard.toggle();
    }

    function create$9() {
      var _this = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var line = Template.get('filter');
      var empty = $('<div class="simple-button selector" style="margin: 2em auto 0 auto">Уточнить поиск</div>');
      var data = {
        sort: [],
        filter: []
      };
      empty.on('hover:enter', function () {
        new create$a({
          input: params.search,
          onSearch: _this.onSearch,
          onBack: _this.onBack
        });
      });
      line.find('.filter--search').on('hover:enter', function () {
        new create$a({
          input: params.search,
          onSearch: _this.onSearch,
          onBack: _this.onBack
        });
      });
      line.find('.filter--sort').on('hover:enter', function () {
        _this.show('Сортировать', 'sort');
      });
      line.find('.filter--filter').on('hover:enter', function () {
        _this.show('Фильтр', 'filter');
      });

      this.show = function (title, type) {
        var _this2 = this;

        var where = data[type];
        Select.show({
          title: title,
          items: where,
          onBack: this.onBack,
          onSelect: function onSelect(a) {
            if (a.items) {
              Select.show({
                title: a.title,
                items: a.items,
                onBack: function onBack() {
                  _this2.show(title, type);
                },
                onSelect: function onSelect(b) {
                  _this2.selected(a.items, b);

                  _this2.onSelect(type, a, b);
                }
              });
            } else {
              _this2.selected(where, a);

              _this2.onSelect(type, a);
            }
          }
        });
      };

      this.selected = function (items, a) {
        items.forEach(function (element) {
          element.selected = false;
        });
        a.selected = true;
      };

      this.render = function () {
        return line;
      };

      this.append = function (add) {
        html.find('.files__body').append(add);
      };

      this.empty = function () {
        return empty;
      };

      this.toggle = function () {
        line.find('.filter--sort').toggleClass('selector', data.sort.length ? true : false).toggleClass('hide', data.sort.length ? false : true);
        line.find('.filter--filter').toggleClass('selector', data.filter.length ? true : false).toggleClass('hide', data.filter.length ? false : true);
      };

      this.set = function (type, items) {
        data[type] = items;
        this.toggle();
      };

      this.get = function (type) {
        return data[type];
      };

      this.sort = function (items, by) {
        items.sort(function (c, b) {
          if (c[by] < b[by]) return 1;
          if (c[by] > b[by]) return -1;
          return 0;
        });
      };

      this.destroy = function () {
        empty.remove();
        line.remove();
        empty = null;
        line = null;
        data = null;
      };
    }

    var listener$7 = start$3();
    var html$a = Template.get('player_video');
    var display = html$a.find('.player-video__display');
    var paused = html$a.find('.player-video__paused');
    var timer$2 = {};
    var rewind_position = 0;
    var video;
    var wait;

    function bind$1() {
      video.addEventListener("waiting", function () {
        loader(true);
      });
      video.addEventListener("playing", function () {
        loader(false);
      });
      video.addEventListener('ended', function () {
        listener$7.send('ended', {});
      });
      video.addEventListener('error', function (e) {
        var error = video.error || {};
        var msg = (error.message || '').toUpperCase();

        if (msg.indexOf('EMPTY SRC') == -1) {
          if (error.code == 3) {
            listener$7.send('error', {
              error: 'Не удалось декодировать видео'
            });
          } else if (error.code == 4) {
            listener$7.send('error', {
              error: 'Видео не найдено или повреждено'
            });
          } else {
            listener$7.send('error', {
              error: 'code [' + error.code + '] details [' + msg + ']'
            });
          }
        }
      });
      video.addEventListener('progress', function (e) {
        var duration = video.duration;

        if (duration > 0) {
          for (var i = 0; i < video.buffered.length; i++) {
            if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
              var down = Math.max(0, Math.min(100, video.buffered.end(video.buffered.length - 1 - i) / duration * 100)) + "%";
              listener$7.send('progress', {
                down: down
              });
              break;
            }
          }
        }
      });
      video.addEventListener('canplay', function () {
        listener$7.send('canplay', {});
      });
      video.addEventListener('timeupdate', function () {
        listener$7.send('timeupdate', {
          duration: video.duration,
          current: video.currentTime
        });
      });
      video.volume = 1;
      video.muted = false;
    }

    function create$8() {
      var videobox = $('<video class="player-video__video" poster="./img/video_poster.png" crossorigin="anonymous"></video>');
      display.append(videobox);
      video = videobox[0];
      bind$1();
    }

    function loader(status) {
      wait = status;
      html$a.toggleClass('video--load', status);
    }

    function url$1(src) {
      create$8();
      video.src = src;
      video.load();
      play$1();
    }

    function play$1() {
      var playPromise;

      try {
        playPromise = video.play();
      } catch (e) {}

      if (playPromise !== undefined) {
        playPromise.then(function () {
          console.log('Player', 'start plaining');
        })["catch"](function (e) {
          console.log('Player', 'play promise error');
        });
      }

      paused.addClass('hide');
      listener$7.send('play', {});
    }

    function pause() {
      var pausePromise;

      try {
        pausePromise = video.pause();
      } catch (e) {}

      if (pausePromise !== undefined) {
        pausePromise.then(function () {
          console.log('Player', 'pause');
        })["catch"](function () {
          console.log('Player', 'pause promise error');
        });
      }

      paused.removeClass('hide');
      listener$7.send('pause', {});
    }

    function playpause() {
      if (wait || rewind_position) return;

      if (video.paused) {
        play$1();
        listener$7.send('play', {});
      } else {
        pause();
        listener$7.send('pause', {});
      }
    }

    function rewindEnd(immediately) {
      clearTimeout(timer$2.rewind_call);
      timer$2.rewind_call = setTimeout(function () {
        video.currentTime = rewind_position;
        rewind_position = 0;
        play$1();
      }, immediately ? 0 : 500);
    }

    function rewindStart(position_time, immediately) {
      if (!video.duration) return;
      rewind_position = Math.max(0, Math.min(position_time, video.duration));
      pause();
      if (rewind_position == 0) video.currentTime = 0;else if (rewind_position == video.duration) video.currentTime = video.duration;
      timer$2.rewind = Date.now();
      listener$7.send('timeupdate', {
        duration: video.duration,
        current: rewind_position
      });
      listener$7.send('rewind', {});
      rewindEnd(immediately);
    }

    function rewind$1(forward, custom_step) {
      if (video.duration) {
        var time = Date.now(),
            step = video.duration / (30 * 60),
            mini = time - (timer$2.rewind || 0) > 50 ? 20 : 60;
        if (rewind_position == 0) rewind_position = video.currentTime;

        if (forward) {
          rewind_position += Math.min(mini, custom_step || 30 * step);
        } else {
          rewind_position -= Math.min(mini, custom_step || 30 * step);
        }

        rewindStart(rewind_position);
      }
    }

    function size(type) {
      html$a.attr('data-size', type);
    }

    function destroy$5() {
      video.src = "";
      video.load();
      display.empty();
    }

    function render$8() {
      return html$a;
    }

    var Video = {
      listener: listener$7,
      url: url$1,
      render: render$8,
      destroy: destroy$5,
      playpause: playpause,
      rewind: rewind$1,
      play: play$1,
      pause: pause,
      size: size
    };

    function create$7(object) {
      this.state = object.state;

      this.start = function () {
        this.dispath(this.state);
      };

      this.dispath = function (action_name) {
        var action = object.transitions[action_name];

        if (action) {
          action.call(this);
        } else {
          console.log('invalid action');
        }
      };
    }

    var html$9 = Template.get('player_info');
    var listener$6 = start$3();

    function set$2(data) {
      html$9.find('.player-info__name').html(Utils.pathToNormalTitle(data.title));
    }

    function toggle$4(status) {
      html$9.toggleClass('info--visible', status);
    }

    function render$7() {
      return html$9;
    }

    function destroy$4() {}

    var Info = {
      listener: listener$6,
      render: render$7,
      set: set$2,
      toggle: toggle$4,
      destroy: destroy$4
    };

    var html$8 = Template.get('player_panel');
    var listener$5 = start$3();
    var condition = {};
    var timer$1 = {};
    var elems = {
      peding: $('.player-panel__peding', html$8),
      position: $('.player-panel__position', html$8),
      time: $('.player-panel__time', html$8),
      timenow: $('.player-panel__timenow', html$8),
      timeend: $('.player-panel__timeend', html$8),
      title: $('.player-panel__filename', html$8)
    };
    var last$3;
    var state = new create$7({
      state: 'start',
      transitions: {
        start: function start() {
          clearTimeout(timer$1.hide);
          clearTimeout(timer$1.rewind);
          this.dispath('canplay');
        },
        canplay: function canplay() {
          if (condition.canplay) this.dispath('visible');else _visible(true);
        },
        visible: function visible() {
          if (condition.visible) _visible(true);else this.dispath('rewind');
        },
        rewind: function rewind() {
          var _this = this;

          clearTimeout(timer$1.rewind);

          if (condition.rewind) {
            _visible(true);

            timer$1.rewind = setTimeout(function () {
              condition.rewind = false;

              _this.dispath('hide');
            }, 1000);
          } else {
            this.dispath('hide');
          }
        },
        hide: function hide() {
          clearTimeout(timer$1.hide);
          timer$1.hide = setTimeout(function () {
            _visible(false);
          }, 1000);
        }
      }
    });
    html$8.find('.selector').on('hover:focus', function (e) {
      last$3 = e.target;
    });
    html$8.find('.player-panel__playpause').on('hover:enter', function (e) {
      listener$5.send('playpause', {});
    });
    html$8.find('.player-panel__next').on('hover:enter', function (e) {
      listener$5.send('next', {});
    });
    html$8.find('.player-panel__prev').on('hover:enter', function (e) {
      listener$5.send('prev', {});
    });
    html$8.find('.player-panel__rprev').on('hover:enter', function (e) {
      listener$5.send('rprev', {});
    });
    html$8.find('.player-panel__rnext').on('hover:enter', function (e) {
      listener$5.send('rnext', {});
    });
    html$8.find('.player-panel__playlist').on('hover:enter', function (e) {
      listener$5.send('playlist', {});
    });
    html$8.find('.player-panel__size').on('hover:enter', function (e) {
      var select = Storage.get('player_size', 'default');
      var items = [{
        title: 'По умолчанию',
        subtitle: 'Размер видео по умолчанию',
        value: 'default',
        selected: select == 'default'
      }, {
        title: 'Расширить',
        subtitle: 'Расширяет видео на весь экран',
        value: 'cover',
        selected: select == 'cover'
      }];
      Select.show({
        title: 'Размер видео',
        items: items,
        onSelect: function onSelect(a) {
          listener$5.send('size', {
            size: a.value
          });
          Controller.toggle('player_panel');
        },
        onBack: function onBack() {
          Controller.toggle('player_panel');
        }
      });
    });

    function update$1(need, value) {
      if (need == 'position') {
        elems.position.css({
          width: value
        });
        elems.time.css({
          left: value
        });
      }

      if (need == 'peding') {
        elems.peding.css({
          width: value
        });
      }

      if (need == 'time') {
        elems.time.text(value);
      }

      if (need == 'timeend') {
        elems.timeend.text(value);
      }

      if (need == 'timenow') {
        elems.timenow.text(value);
      }

      if (need == 'play') {
        html$8.toggleClass('panel--paused', false);
      }

      if (need == 'pause') {
        html$8.toggleClass('panel--paused', true);
      }
    }

    function title$1(title) {
      elems.title.text(title);
    }

    function _visible(status) {
      Info.toggle(status);
      html$8.toggleClass('panel--visible', status);
    }

    function canplay() {
      condition.canplay = true;
      state.start();
    }

    function rewind() {
      condition.rewind = true;
      state.start();
    }

    function toggle$3() {
      var _this2 = this;

      Controller.add('player_panel', {
        invisible: true,
        toggle: function toggle() {
          Controller.collectionSet(_this2.render());
          Controller.collectionFocus(last$3 || $('.player-panel__playpause', html$8)[0], _this2.render());
          condition.visible = true;
          state.start();
        },
        up: function up() {
          Controller.toggle('player');
        },
        down: function down() {
          Controller.toggle('player');
        },
        right: function right() {
          Navigator.move('right');
        },
        left: function left() {
          Navigator.move('left');
        },
        gone: function gone() {
          html$8.find('.selector').removeClass('focus');
          hide();
        },
        back: function back() {
          Controller.toggle('player');
        }
      });
      Controller.toggle('player_panel');
    }

    function show$2() {
      state.start();
    }

    function hide() {
      condition.visible = false;

      _visible(false);
    }

    function destroy$3() {
      last$3 = false;
      condition = {};
      elems.peding.css({
        width: 0
      });
      elems.position.css({
        width: 0
      });
      elems.time.text('00:00');
      elems.timenow.text('00:00');
      elems.timeend.text('00:00');
      html$8.toggleClass('panel--paused', false);
    }

    function render$6() {
      return html$8;
    }

    var Panel = {
      listener: listener$5,
      render: render$6,
      toggle: toggle$3,
      show: show$2,
      destroy: destroy$3,
      hide: hide,
      canplay: canplay,
      update: update$1,
      title: title$1,
      rewind: rewind
    };

    var listener$4 = start$3();
    var current = '';
    var playlist$1 = [];
    var position = 0;

    function show$1() {
      active$2();
      var enabled = Controller.enabled();
      Select.show({
        title: 'Плейлист',
        items: playlist$1,
        onSelect: function onSelect(a) {
          Controller.toggle(enabled.name);
          listener$4.send('select', {
            item: a
          });
        },
        onBack: function onBack() {
          Controller.toggle(enabled.name);
        }
      });
    }

    function active$2() {
      playlist$1.forEach(function (element) {
        element.selected = element.url == current;
        if (element.selected) position = playlist$1.indexOf(element);
      });
    }

    function prev() {
      active$2();

      if (position > 1) {
        listener$4.send('select', {
          item: playlist$1[position - 1]
        });
      }
    }

    function next() {
      active$2();

      if (position < playlist$1.length - 1) {
        listener$4.send('select', {
          item: playlist$1[position + 1]
        });
      }
    }

    function set$1(p) {
      playlist$1 = p;
    }

    function url(u) {
      current = u;
    }

    var Playlist = {
      listener: listener$4,
      show: show$1,
      url: url,
      set: set$1,
      prev: prev,
      next: next
    };

    var html$7 = Template.get('player');
    html$7.append(Video.render());
    html$7.append(Panel.render());
    html$7.append(Info.render());
    var callback$1;
    Video.listener.follow('timeupdate', function (e) {
      Panel.update('time', Utils.secondsToTime(e.current | 0, true));
      Panel.update('timenow', Utils.secondsToTime(e.current || 0));
      Panel.update('timeend', Utils.secondsToTime(e.duration || 0));
      Panel.update('position', e.current / e.duration * 100 + '%');
    });
    Video.listener.follow('progress', function (e) {
      Panel.update('peding', e.down);
    });
    Video.listener.follow('canplay', function (e) {
      Panel.canplay();
    });
    Video.listener.follow('play', function (e) {
      Panel.update('play');
    });
    Video.listener.follow('pause', function (e) {
      Panel.update('pause');
    });
    Video.listener.follow('rewind', function (e) {
      Panel.rewind();
    });
    Video.listener.follow('ended', function (e) {
      Playlist.next();
    });
    Panel.listener.follow('playpause', function (e) {
      Video.playpause();
    });
    Panel.listener.follow('playlist', function (e) {
      Playlist.show();
    });
    Panel.listener.follow('size', function (e) {
      Video.size(e.size);
      Storage.set('player_size', e.size);
    });
    Panel.listener.follow('prev', function (e) {
      Playlist.prev();
    });
    Panel.listener.follow('next', function (e) {
      Playlist.next();
    });
    Panel.listener.follow('rprev', function (e) {
      Video.rewind(false);
    });
    Panel.listener.follow('rnext', function (e) {
      Video.rewind(true);
    });
    Playlist.listener.follow('select', function (e) {
      destroy$2();
      play(e.item);
    });

    function toggle$2() {
      Controller.add('player', {
        invisible: true,
        toggle: function toggle() {
          Panel.hide();
        },
        up: function up() {
          Panel.toggle();
        },
        down: function down() {
          Panel.toggle();
        },
        right: function right() {
          Video.rewind(true);
        },
        left: function left() {
          Video.rewind(false);
        },
        gone: function gone() {},
        enter: function enter() {
          Video.playpause();
        },
        back: function back() {
          destroy$2();
          if (callback$1) callback$1();else Controller.toggle('content');
          callback$1 = false;
        }
      });
      Controller.toggle('player');
    }

    function destroy$2() {
      Video.destroy();
      Panel.destroy();
      html$7.detach();
    }

    function play(data) {
      Playlist.url(data.url);
      Video.url(data.url);
      Video.size(Storage.get('player_size', 'default'));
      Info.set(data);
      $('body').append(html$7);
      toggle$2();
      Panel.show(true);
    }

    function playlist(playlist) {
      Playlist.set(playlist);
    }

    function onBack(back) {
      callback$1 = back;
    }

    function render$5() {
      return html$7;
    }

    var Player = {
      play: play,
      playlist: playlist,
      render: render$5,
      callback: onBack
    };

    var network = new create$n();
    var SERVER = {};
    var timers = {};
    var formats = ['asf', 'wmv', 'divx', 'avi', 'mp4', 'm4v', 'mov', '3gp', '3g2', 'mkv', 'trp', 'tp', 'mts', 'mpg', 'mpeg', 'dat', 'vob', 'rm', 'rmvb', 'm2ts', 'bdmv', 'ts'];

    function start$2(element) {
      SERVER.object = element;

      if (Storage.get('torrserver_url')) {
        SERVER.url = Utils.checkHttp(Storage.get('torrserver_url'));
        loading();
        connect();
        hash();
      } else install();
    }

    function loading() {
      Modal.open({
        title: '',
        html: Template.get('modal_loading'),
        size: 'large',
        mask: true,
        onBack: function onBack() {
          Modal.close();
          close();
        }
      });
    }

    function connect() {
      network.timeout(3000);
      var ip = Storage.get('torrserver_url');
      network.silent(SERVER.url + '/settings', function (json) {
        if (!json.CacheSize) {
          var tpl = Template.get('torrent_nocheck', {
            title: 'Ошибка',
            ip: ip,
            text: 'Не удалось проверить на наличие TorrServer',
            echo: Utils.shortText(JSON.stringify(json), 100)
          });
          Modal.update(tpl);
          network.clear();
        }
      }, function (a, c) {
        var tpl = Template.get('torrent_noconnect', {
          title: 'Ошибка',
          text: 'Не удалось подключиться к TorrServer',
          ip: ip,
          echo: network.errorDecode(a, c)
        });

        if (!(ip.indexOf('127.') >= 0 || ip.indexOf(':8090') == -1)) {
          tpl.find('.nocorect').remove();
        }

        Modal.update(tpl);
        network.clear();
      }, JSON.stringify({
        action: 'get'
      }));
    }

    function hash() {
      var data = {
        action: 'add',
        link: SERVER.object.MagnetUri || SERVER.object.Link,
        title: SERVER.object.title,
        poster: SERVER.object.poster,
        save_to_db: Storage.get('torrserver_savedb', 'false')
      };
      network.timeout(20000);
      network.silent(SERVER.url + '/torrents', function (json) {
        SERVER.hash = json.hash;
        files();
      }, function () {
        var jac = Storage.field('parser_torrent_type') == 'jackett';
        var tpl = Template.get('torrent_nohash', {
          title: 'Ошибка',
          text: 'Не удалось получить HASH',
          url: data.link
        });
        if (jac) tpl.find('.is--torlook').remove();else tpl.find('.is--jackett').remove();
        Modal.update(tpl);
        network.clear();
      }, JSON.stringify(data));
    }

    function files() {
      var data = JSON.stringify({
        action: 'get',
        hash: SERVER.hash
      });
      var repeat = 0;
      timers.files = setInterval(function () {
        repeat++;
        network.clear();
        network.timeout(2000);
        network.silent(SERVER.url + '/torrents', function (json) {
          if (json.file_stats) {
            clearInterval(timers.files);
            show(json.file_stats);
          }
        }, false, data);

        if (repeat >= 45) {
          Modal.update(Template.get('error', {
            title: 'Ошибка',
            text: 'Время ожидания истекло'
          }));
          network.clear();
        }
      }, 2000);
    }

    function install() {
      Modal.open({
        title: 'Необходим TorrServer',
        html: $('<div class="about"><div>Для просмотра торрента онлайн, необходимо установить TorrServer. Подробнее что такое TorrServer и как установить, вы можете найти на сайте https://github.com/YouROK/TorrServer</div></div>'),
        onBack: function onBack() {
          Modal.close();
          Controller.toggle('content');
        }
      });
    }

    function show(files) {
      var html = $('<div class="torrent-files"></div>');
      var plays = files.filter(function (a) {
        var exe = a.path.split('.').pop().toLowerCase();
        return formats.indexOf(exe) >= 0;
      });
      var playlist = [];
      plays.forEach(function (element) {
        Arrays.extend(element, {
          title: Utils.pathToNormalTitle(element.path),
          size: Utils.bytesToSize(element.length),
          url: SERVER.url + '/stream?link=' + SERVER.hash + '&index=' + element.id + '&play'
        });
        playlist.push(element);
        var item = Template.get('torrent_file', element);
        item.on('hover:enter', function () {
          Player.play({
            title: element.title,
            url: element.url
          });
          Player.callback(function () {
            Controller.toggle('modal');
          });
          Player.playlist(playlist);
        });
        html.append(item);
      });
      if (plays.length == 0) html = Template.get('error', {
        title: 'Пусто',
        text: 'Не удалось извлечь подходящие файлы'
      });else Modal.title('Файлы');
      Modal.update(html);
    }

    function close() {
      network.clear();
      clearInterval(timers.files);
      Controller.toggle('content');
    }

    var Torrent = {
      start: start$2
    };

    function component$2(object) {
      var network = new create$n();
      var scroll = new create$m({
        mask: true
      });
      var files = new create$b(object);
      var filter = new create$9(object);
      var results = [];
      var filtred = [];
      var total_pages = 1;
      var count = 0;
      var last;
      var url;
      var filter_items = {
        quality: ['Любое', '4k', '1080p', '720p'],
        hdr: ['Не выбрано', 'Да', 'Нет'],
        sub: ['Не выбрано', 'Да', 'Нет'],
        voice: []
      };
      var voices = ["Laci", "Kerob", "LE-Production", "Parovoz Production", "Paradox", "Omskbird", "LostFilm", "Причудики", "BaibaKo", "NewStudio", "AlexFilm", "FocusStudio", "Gears Media", "Jaskier", "ViruseProject", "Кубик в Кубе", "IdeaFilm", "Sunshine Studio", "Ozz.tv", "Hamster Studio", "Сербин", "To4ka", "Кравец", "Victory-Films", "SNK-TV", "GladiolusTV", "Jetvis Studio", "ApofysTeam", "ColdFilm", "Agatha Studdio", "KinoView", "Jimmy J.", "Shadow Dub Project", "Amedia", "Red Media", "Selena International", "Гоблин", "Universal Russia", "Kiitos", "Paramount Comedy", "Кураж-Бамбей", "Студия Пиратского Дубляжа", "Чадов", "Карповский", "RecentFilms", "Первый канал", "Alternative Production", "NEON Studio", "Колобок", "Дольский", "Синема УС", "Гаврилов", "Живов", "SDI Media", "Алексеев", "GreenРай Studio", "Михалев", "Есарев", "Визгунов", "Либергал", "Кузнецов", "Санаев", "ДТВ", "Дохалов", "Sunshine Studio", "Горчаков", "LevshaFilm", "CasStudio", "Володарский", "ColdFilm", "Шварко", "Карцев", "ETV+", "ВГТРК", "Gravi-TV", "1001cinema", "Zone Vision Studio", "Хихикающий доктор", "Murzilka", "turok1990", "FOX", "STEPonee", "Elrom", "Колобок", "HighHopes", "SoftBox", "GreenРай Studio", "NovaFilm", "Четыре в квадрате", "Greb&Creative", "MUZOBOZ", "ZM-Show", "RecentFilms", "Kerems13", "Hamster Studio", "New Dream Media", "Игмар", "Котов", "DeadLine Studio", "Jetvis Studio", "РенТВ", "Андрей Питерский", "Fox Life", "Рыбин", "Trdlo.studio", "Studio Victory Аsia", "Ozeon", "НТВ", "CP Digital", "AniLibria", "STEPonee", "Levelin", "FanStudio", "Cmert", "Интерфильм", "SunshineStudio", "Kulzvuk Studio", "Кашкин", "Вартан Дохалов", "Немахов", "Sedorelli", "СТС", "Яроцкий", "ICG", "ТВЦ", "Штейн", "AzOnFilm", "SorzTeam", "Гаевский", "Мудров", "Воробьев Сергей", "Студия Райдо", "DeeAFilm Studio", "zamez", "ViruseProject", "Иванов", "STEPonee", "РенТВ", "СВ-Дубль", "BadBajo", "Комедия ТВ", "Мастер Тэйп", "5-й канал СПб", "SDI Media", "Гланц", "Ох! Студия", "СВ-Кадр", "2x2", "Котова", "Позитив", "RusFilm", "Назаров", "XDUB Dorama", "Реальный перевод", "Kansai", "Sound-Group", "Николай Дроздов", "ZEE TV", "Ozz.tv", "MTV", "Сыендук", "GoldTeam", "Белов", "Dream Records", "Яковлев", "Vano", "SilverSnow", "Lord32x", "Filiza Studio", "Sony Sci-Fi", "Flux-Team", "NewStation", "XDUB Dorama", "Hamster Studio", "Dream Records", "DexterTV", "ColdFilm", "Good People", "RusFilm", "Levelin", "AniDUB", "SHIZA Project", "AniLibria.TV", "StudioBand", "AniMedia", "Kansai", "Onibaku", "JWA Project", "MC Entertainment", "Oni", "Jade", "Ancord", "ANIvoice", "Nika Lenina", "Bars MacAdams", "JAM", "Anika", "Berial", "Kobayashi", "Cuba77", "RiZZ_fisher", "OSLIKt", "Lupin", "Ryc99", "Nazel & Freya", "Trina_D", "JeFerSon", "Vulpes Vulpes", "Hamster", "KinoGolos", "Fox Crime", "Денис Шадинский", "AniFilm", "Rain Death", "LostFilm", "New Records", "Ancord", "Первый ТВЧ", "RG.Paravozik", "Profix Media", "Tycoon", "RealFake", "HDrezka", "Jimmy J.", "AlexFilm", "Discovery", "Viasat History", "AniMedia", "JAM", "HiWayGrope", "Ancord", "СВ-Дубль", "Tycoon", "SHIZA Project", "GREEN TEA", "STEPonee", "AlphaProject", "AnimeReactor", "Animegroup", "Shachiburi", "Persona99", "3df voice", "CactusTeam", "AniMaunt", "AniMedia", "AnimeReactor", "ShinkaDan", "Jaskier", "ShowJet", "RAIM", "RusFilm", "Victory-Films", "АрхиТеатр", "Project Web Mania", "ko136", "КураСгречей", "AMS", "СВ-Студия", "Храм Дорам ТВ", "TurkStar", "Медведев", "Рябов", "BukeDub", "FilmGate", "FilmsClub", "Sony Turbo", "ТВЦ", "AXN Sci-Fi", "NovaFilm", "DIVA Universal", "Курдов", "Неоклассика", "fiendover", "SomeWax", "Логинофф", "Cartoon Network", "Sony Turbo", "Loginoff", "CrezaStudio", "Воротилин", "LakeFilms", "Andy", "CP Digital", "XDUB Dorama + Колобок", "SDI Media", "KosharaSerials", "Екатеринбург Арт", "Julia Prosenuk", "АРК-ТВ Studio", "Т.О Друзей", "Anifilm", "Animedub", "AlphaProject", "Paramount Channel", "Кириллица", "AniPLague", "Видеосервис", "JoyStudio", "HighHopes", "TVShows", "AniFilm", "GostFilm", "West Video", "Формат AB", "Film Prestige", "West Video", "Екатеринбург Арт", "SovetRomantica", "РуФилмс", "AveBrasil", "Greb&Creative", "BTI Studios", "Пифагор", "Eurochannel", "NewStudio", "Кармен Видео", "Кошкин", "Кравец", "Rainbow World", "Воротилин", "Варус-Видео", "ClubFATE", "HiWay Grope", "Banyan Studio", "Mallorn Studio", "Asian Miracle Group", "Эй Би Видео", "AniStar", "Korean Craze", "LakeFilms", "Невафильм", "Hallmark", "Netflix", "Mallorn Studio", "Sony Channel", "East Dream", "Bonsai Studio", "Lucky Production", "Octopus", "TUMBLER Studio", "CrazyCatStudio", "Amber", "Train Studio", "Анастасия Гайдаржи", "Мадлен Дюваль", "Fox Life", "Sound Film", "Cowabunga Studio", "Фильмэкспорт", "VO-Production", "Sound Film", "Nickelodeon", "MixFilm", "GreenРай Studio", "Sound-Group", "Back Board Cinema", "Кирилл Сагач", "Bonsai Studio", "Stevie", "OnisFilms", "MaxMeister", "Syfy Universal", "TUMBLER Studio", "NewStation", "Neo-Sound", "Муравский", "IdeaFilm", "Рутилов", "Тимофеев", "Лагута", "Дьяконов", "Zone Vision Studio", "Onibaku", "AniMaunt", "Voice Project", "AniStar", "Пифагор", "VoicePower", "StudioFilms", "Elysium", "AniStar", "BeniAffet", "Selena International", "Paul Bunyan", "CoralMedia", "Кондор", "Игмар", "ViP Premiere", "FireDub", "AveTurk", "Sony Sci-Fi", "Янкелевич", "Киреев", "Багичев", "2x2", "Лексикон", "Нота", "Arisu", "Superbit", "AveDorama", "VideoBIZ", "Киномания", "DDV", "Alternative Production", "WestFilm", "Анастасия Гайдаржи + Андрей Юрченко", "Киномания", "Agatha Studdio", "GreenРай Studio", "VSI Moscow", "Horizon Studio", "Flarrow Films", "Amazing Dubbing", "Asian Miracle Group", "Видеопродакшн", "VGM Studio", "FocusX", "CBS Drama", "NovaFilm", "Novamedia", "East Dream", "Дасевич", "Анатолий Гусев", "Twister", "Морозов", "NewComers", "kubik&ko", "DeMon", "Анатолий Ашмарин", "Inter Video", "Пронин", "AMC", "Велес", "Volume-6 Studio", "Хоррор Мэйкер", "Ghostface", "Sephiroth", "Акира", "Деваль Видео", "RussianGuy27", "neko64", "Shaman", "Franek Monk", "Ворон", "Andre1288", "Selena International", "GalVid", "Другое кино", "Студия NLS", "Sam2007", "HaseRiLLoPaW", "Севастьянов", "D.I.M.", "Марченко", "Журавлев", "Н-Кино", "Lazer Video", "SesDizi", "Red Media", "Рудой", "Товбин", "Сергей Дидок", "Хуан Рохас", "binjak", "Карусель", "Lizard Cinema", "Варус-Видео", "Акцент", "RG.Paravozik", "Max Nabokov", "Barin101", "Васька Куролесов", "Фортуна-Фильм", "Amalgama", "AnyFilm", "Студия Райдо", "Козлов", "Zoomvision Studio", "Пифагор", "Urasiko", "VIP Serial HD", "НСТ", "Кинолюкс", "Project Web Mania", "Завгородний", "AB-Video", "Twister", "Universal Channel", "Wakanim", "SnowRecords", "С.Р.И", "Старый Бильбо", "Ozz.tv", "Mystery Film", "РенТВ", "Латышев", "Ващенко", "Лайко", "Сонотек", "Psychotronic", "DIVA Universal", "Gremlin Creative Studio", "Нева-1", "Максим Жолобов", "Good People", "Мобильное телевидение", "Lazer Video", "IVI", "DoubleRec", "Milvus", "RedDiamond Studio", "Astana TV", "Никитин", "КТК", "D2Lab", "НСТ", "DoubleRec", "Black Street Records", "Останкино", "TatamiFilm", "Видеобаза", "Crunchyroll", "Novamedia", "RedRussian1337", "КонтентикOFF", "Creative Sound", "HelloMickey Production", "Пирамида", "CLS Media", "Сонькин", "Мастер Тэйп", "Garsu Pasaulis", "DDV", "IdeaFilm", "Gold Cinema", "Че!", "Нарышкин", "Intra Communications", "OnisFilms", "XDUB Dorama", "Кипарис", "Королёв", "visanti-vasaer", "Готлиб", "Paramount Channel", "СТС", "диктор CDV", "Pazl Voice", "Прямостанов", "Zerzia", "НТВ", "MGM", "Дьяков", "Вольга", "АРК-ТВ Studio", "Дубровин", "МИР", "Netflix", "Jetix", "Кипарис", "RUSCICO", "Seoul Bay", "Филонов", "Махонько", "Строев", "Саня Белый", "Говинда Рага", "Ошурков", "Horror Maker", "Хлопушка", "Хрусталев", "Антонов Николай", "Золотухин", "АрхиАзия", "Попов", "Ultradox", "Мост-Видео", "Альтера Парс", "Огородников", "Твин", "Хабар", "AimaksaLTV", "ТНТ", "FDV", "3df voice", "The Kitchen Russia", "Ульпаней Эльром", "Видеоимпульс", "GoodTime Media", "Alezan", "True Dubbing Studio", "FDV", "Карусель", "Интер", "Contentica", "Мельница", "RealFake", "ИДДК", "Инфо-фильм", "Мьюзик-трейд", "Кирдин | Stalk", "ДиоНиК", "Стасюк", "TV1000", "Hallmark", "Тоникс Медиа", "Бессонов", "Gears Media", "Бахурани", "NewDub", "Cinema Prestige", "Набиев", "New Dream Media", "ТВ3", "Малиновский Сергей", "Superbit", "Кенс Матвей", "LE-Production", "Voiz", "Светла", "Cinema Prestige", "JAM", "LDV", "Videogram", "Индия ТВ", "RedDiamond Studio", "Герусов", "Элегия фильм", "Nastia", "Семыкина Юлия", "Электричка", "Штамп Дмитрий", "Пятница", "Oneinchnales", "Gravi-TV", "D2Lab", "Кинопремьера", "Бусов Глеб", "LE-Production", "1001cinema", "Amazing Dubbing", "Emslie", "1+1", "100 ТВ", "1001 cinema", "2+2", "2х2", "3df voice", "4u2ges", "5 канал", "A. Lazarchuk", "AAA-Sound", "AB-Video", "AdiSound", "ALEKS KV", "AlexFilm", "AlphaProject", "Alternative Production", "Amalgam", "AMC", "Amedia", "AMS", "Andy", "AniLibria", "AniMedia", "Animegroup", "Animereactor", "AnimeSpace Team", "Anistar", "AniUA", "AniWayt", "Anything-group", "AOS", "Arasi project", "ARRU Workshop", "AuraFilm", "AvePremier", "AveTurk", "AXN Sci-Fi", "Azazel", "AzOnFilm", "BadBajo", "BadCatStudio", "BBC Saint-Petersburg", "BD CEE", "Black Street Records", "Bonsai Studio", "Boльгa", "Brain Production", "BraveSound", "BTI Studios", "Bubble Dubbing Company", "Byako Records", "Cactus Team", "Cartoon Network", "CBS Drama", "CDV", "Cinema Prestige", "CinemaSET GROUP", "CinemaTone", "ColdFilm", "Contentica", "CP Digital", "CPIG", "Crunchyroll", "Cuba77", "D1", "D2lab", "datynet", "DDV", "DeadLine", "DeadSno", "DeMon", "den904", "Description", "DexterTV", "Dice", "Discovery", "DniproFilm", "DoubleRec", "DreamRecords", "DVD Classic", "East Dream", "Eladiel", "Elegia", "ELEKTRI4KA", "Elrom", "ELYSIUM", "Epic Team", "eraserhead", "erogg", "Eurochannel", "Extrabit", "F-TRAIN", "Family Fan Edition", "FDV", "FiliZa Studio", "Film Prestige", "FilmGate", "FilmsClub", "FireDub", "Flarrow Films", "Flux-Team", "FocusStudio", "FOX", "Fox Crime", "Fox Russia", "FoxLife", "Foxlight", "Franek Monk", "Gala Voices", "Garsu Pasaulis", "Gears Media", "Gemini", "General Film", "GetSmart", "Gezell Studio", "Gits", "GladiolusTV", "GoldTeam", "Good People", "Goodtime Media", "GoodVideo", "GostFilm", "Gramalant", "Gravi-TV", "GREEN TEA", "GreenРай Studio", "Gremlin Creative Studio", "Hallmark", "HamsterStudio", "HiWay Grope", "Horizon Studio", "hungry_inri", "ICG", "ICTV", "IdeaFilm", "IgVin &amp; Solncekleshka", "ImageArt", "INTERFILM", "Ivnet Cinema", "IНТЕР", "Jakob Bellmann", "JAM", "Janetta", "Jaskier", "JeFerSon", "jept", "JetiX", "Jetvis", "JimmyJ", "KANSAI", "KIHO", "kiitos", "KinoGolos", "Kinomania", "KosharaSerials", "Kолобок", "L0cDoG", "LakeFilms", "LDV", "LE-Production", "LeDoyen", "LevshaFilm", "LeXiKC", "Liga HQ", "Line", "Lisitz", "Lizard Cinema Trade", "Lord32x", "lord666", "LostFilm", "Lucky Production", "Macross", "madrid", "Mallorn Studio", "Marclail", "Max Nabokov", "MC Entertainment", "MCA", "McElroy", "Mega-Anime", "Melodic Voice Studio", "metalrus", "MGM", "MifSnaiper", "Mikail", "Milirina", "MiraiDub", "MOYGOLOS", "MrRose", "MTV", "Murzilka", "MUZOBOZ", "National Geographic", "NemFilm", "Neoclassica", "NEON Studio", "New Dream Media", "NewComers", "NewStation", "NewStudio", "Nice-Media", "Nickelodeon", "No-Future", "NovaFilm", "Novamedia", "Octopus", "Oghra-Brown", "OMSKBIRD", "Onibaku", "OnisFilms", "OpenDub", "OSLIKt", "Ozz TV", "PaDet", "Paramount Comedy", "Paramount Pictures", "Parovoz Production", "PashaUp", "Paul Bunyan", "Pazl Voice", "PCB Translate", "Persona99", "PiratVoice", "Postmodern", "Profix Media", "Project Web Mania", "Prolix", "QTV", "R5", "Radamant", "RainDeath", "RATTLEBOX", "RealFake", "Reanimedia", "Rebel Voice", "RecentFilms", "Red Media", "RedDiamond Studio", "RedDog", "RedRussian1337", "Renegade Team", "RG Paravozik", "RinGo", "RoxMarty", "Rumble", "RUSCICO", "RusFilm", "RussianGuy27", "Saint Sound", "SakuraNight", "Satkur", "Sawyer888", "Sci-Fi Russia", "SDI Media", "Selena", "seqw0", "SesDizi", "SGEV", "Shachiburi", "SHIZA", "ShowJet", "Sky Voices", "SkyeFilmTV", "SmallFilm", "SmallFilm", "SNK-TV", "SnowRecords", "SOFTBOX", "SOLDLUCK2", "Solod", "SomeWax", "Sony Channel", "Sony Turbo", "Sound Film", "SpaceDust", "ssvss", "st.Elrom", "STEPonee", "SunshineStudio", "Superbit", "Suzaku", "sweet couple", "TatamiFilm", "TB5", "TF-AniGroup", "The Kitchen Russia", "The Mike Rec.", "Timecraft", "To4kaTV", "Tori", "Total DVD", "TrainStudio", "Troy", "True Dubbing Studio", "TUMBLER Studio", "turok1990", "TV 1000", "TVShows", "Twister", "Twix", "Tycoon", "Ultradox", "Universal Russia", "VashMax2", "VendettA", "VHS", "VicTeam", "VictoryFilms", "Video-BIZ", "Videogram", "ViruseProject", "visanti-vasaer", "VIZ Media", "VO-production", "Voice Project Studio", "VoicePower", "VSI Moscow", "VulpesVulpes", "Wakanim", "Wayland team", "WestFilm", "WiaDUB", "WVoice", "XL Media", "XvidClub Studio", "zamez", "ZEE TV", "Zendos", "ZM-SHOW", "Zone Studio", "Zone Vision", "Агапов", "Акопян", "Алексеев", "Артемьев", "Багичев", "Бессонов", "Васильев", "Васильцев", "Гаврилов", "Герусов", "Готлиб", "Григорьев", "Дасевич", "Дольский", "Карповский", "Кашкин", "Киреев", "Клюквин", "Костюкевич", "Матвеев", "Михалев", "Мишин", "Мудров", "Пронин", "Савченко", "Смирнов", "Тимофеев", "Толстобров", "Чуев", "Шуваев", "Яковлев", "ААА-sound", "АБыГДе", "Акалит", "Акира", "Альянс", "Амальгама", "АМС", "АнВад", "Анубис", "Anubis", "Арк-ТВ", "АРК-ТВ Studio", "Б. Федоров", "Бибиков", "Бигыч", "Бойков", "Абдулов", "Белов", "Вихров", "Воронцов", "Горчаков", "Данилов", "Дохалов", "Котов", "Кошкин", "Назаров", "Попов", "Рукин", "Рутилов", "Варус Видео", "Васька Куролесов", "Ващенко С.", "Векшин", "Велес", "Весельчак", "Видеоимпульс", "Витя «говорун»", "Войсовер", "Вольга", "Ворон", "Воротилин", "Г. Либергал", "Г. Румянцев", "Гей Кино Гид", "ГКГ", "Глуховский", "Гризли", "Гундос", "Деньщиков", "Есарев", "Нурмухаметов", "Пучков", "Стасюк", "Шадинский", "Штамп", "sf@irat", "Держиморда", "Домашний", "ДТВ", "Дьяконов", "Е. Гаевский", "Е. Гранкин", "Е. Лурье", "Е. Рудой", "Е. Хрусталёв", "ЕА Синема", "Екатеринбург Арт", "Живаго", "Жучков", "З Ранку До Ночі", "Завгородний", "Зебуро", "Зереницын", "И. Еремеев", "И. Клушин", "И. Сафронов", "И. Степанов", "ИГМ", "Игмар", "ИДДК", "Имидж-Арт", "Инис", "Ирэн", "Ист-Вест", "К. Поздняков", "К. Филонов", "К9", "Карапетян", "Кармен Видео", "Карусель", "Квадрат Малевича", "Килька", "Кипарис", "Королев", "Котова", "Кравец", "Кубик в Кубе", "Кураж-Бамбей", "Л. Володарский", "Лазер Видео", "ЛанселаП", "Лапшин", "Лексикон", "Ленфильм", "Леша Прапорщик", "Лизард", "Люсьена", "Заугаров", "Иванов", "Иванова и П. Пашут", "Латышев", "Ошурков", "Чадов", "Яроцкий", "Максим Логинофф", "Малиновский", "Марченко", "Мастер Тэйп", "Махонько", "Машинский", "Медиа-Комплекс", "Мельница", "Мика Бондарик", "Миняев", "Мительман", "Мост Видео", "Мосфильм", "Муравский", "Мьюзик-трейд", "Н-Кино", "Н. Антонов", "Н. Дроздов", "Н. Золотухин", "Н.Севастьянов seva1988", "Набиев", "Наталья Гурзо", "НЕВА 1", "Невафильм", "НеЗупиняйПродакшн", "Неоклассика", "Несмертельное оружие", "НЛО-TV", "Новий", "Новый диск", "Новый Дубляж", "Новый Канал", "Нота", "НСТ", "НТВ", "НТН", "Оверлорд", "Огородников", "Омикрон", "Гланц", "Карцев", "Морозов", "Прямостанов", "Санаев", "Парадиз", "Пепелац", "Первый канал ОРТ", "Переводман", "Перец", "Петербургский дубляж", "Петербуржец", "Пирамида", "Пифагор", "Позитив-Мультимедиа", "Прайд Продакшн", "Премьер Видео", "Премьер Мультимедиа", "Причудики", "Р. Янкелевич", "Райдо", "Ракурс", "РенТВ", "Россия", "РТР", "Русский дубляж", "Русский Репортаж", "РуФилмс", "Рыжий пес", "С. Визгунов", "С. Дьяков", "С. Казаков", "С. Кузнецов", "С. Кузьмичёв", "С. Лебедев", "С. Макашов", "С. Рябов", "С. Щегольков", "С.Р.И.", "Сolumbia Service", "Самарский", "СВ Студия", "СВ-Дубль", "Светла", "Селена Интернешнл", "Синема Трейд", "Синема УС", "Синта Рурони", "Синхрон", "Советский", "Сокуров", "Солодухин", "Сонотек", "Сонькин", "Союз Видео", "Союзмультфильм", "СПД - Сладкая парочка", "Строев", "СТС", "Студии Суверенного Лепрозория", "Студия «Стартрек»", "KOleso", "Студия Горького", "Студия Колобок", "Студия Пиратского Дубляжа", "Студия Райдо", "Студия Трёх", "Гуртом", "Супербит", "Сыендук", "Так Треба Продакшн", "ТВ XXI век", "ТВ СПб", "ТВ-3", "ТВ6", "ТВИН", "ТВЦ", "ТВЧ 1", "ТНТ", "ТО Друзей", "Толмачев", "Точка Zрения", "Трамвай-фильм", "ТРК", "Уолт Дисней Компани", "Хихидок", "Хлопушка", "Цікава Ідея", "Четыре в квадрате", "Швецов", "Штамп", "Штейн", "Ю. Живов", "Ю. Немахов", "Ю. Сербин", "Ю. Товбин", "Я. Беллманн"];
      var torlook_site = Utils.checkHttp(Storage.field('torlook_site')) + '/';
      scroll.minus();
      scroll.body().addClass('torrent-list');

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Background.change(Utils.cardImgBackground(object.movie));
        Storage.set('torrents_filter', '{}');

        if (Storage.field('parser_torrent_type') == 'jackett') {
          if (Storage.field('jackett_url')) {
            url = Utils.checkHttp(Storage.field('jackett_url'));
            this.loadJackett();
          } else {
            this.empty();
          }
        } else {
          if (Storage.get('native')) {
            this.loadTorlook();
          } else if (Storage.field('torlook_parse_type') == 'site' && Storage.field('parser_website_url')) {
            url = Utils.checkHttp(Storage.field('parser_website_url'));
            this.loadTorlook();
          } else if (Storage.field('torlook_parse_type') == 'native') {
            this.loadTorlook();
          } else this.empty();
        }

        filter.onSearch = function (value) {
          Activity$1.replace({
            search: value
          });
        };

        filter.onBack = function () {
          _this.start();
        };

        return this.render();
      };

      this.loadTorlook = function () {
        var _this2 = this;

        network.timeout(1000 * 60);
        var u = Storage.get('native') || Storage.field('torlook_parse_type') == 'native' ? torlook_site + encodeURIComponent(object.search) : url.replace('{q}', encodeURIComponent(torlook_site + encodeURIComponent(object.search)));
        network["native"](u, function (str) {
          var math = str.replace(/\n|\r/g, '').match(new RegExp('<div class="webResult item">(.*?)<\/div>', 'g'));
          var data = {
            Results: []
          };
          $.each(math, function (i, a) {
            a = a.replace(/<img[^>]+>/g, '');
            var element = $(a + '</div>'),
                item = {};
            item.Title = $('>p>a', element).text();
            item.Tracker = $('.h2 > a', element).text();
            item.size = $('.size', element).text();
            item.Size = Utils.sizeToBytes(item.size);
            item.PublishDate = $('.date', element).text() + 'T22:00:00';
            item.Seeders = parseInt($('.seeders', element).text());
            item.Peers = parseInt($('.leechers', element).text());
            item.reguest = $('.magneto', element).attr('data-src');
            item.PublisTime = Utils.strToTime(item.PublishDate);
            element.remove();
            if (item.Title && item.reguest) data.Results.push(item);
          });
          results = data;

          _this2.build();

          _this2.activity.loader(false);

          _this2.activity.toggle();
        }, function (a, c) {
          _this2.empty();
        }, false, {
          dataType: 'text'
        });
      };

      this.loadJackett = function () {
        var _this3 = this;

        network.timeout(1000 * 15);
        var u = url + '/api/v2.0/indexers/all/results?apikey=' + Storage.get('jackett_key') + '&Query=' + encodeURIComponent(object.search);
        var genres = object.movie.genres.map(function (a) {
          return a.name;
        });

        if (object.search == object.movie.original_title) {
          u = Utils.addUrlComponent(u, 'title=' + encodeURIComponent(object.movie.title));
          u = Utils.addUrlComponent(u, 'title_original=' + encodeURIComponent(object.movie.original_title));
        }

        u = Utils.addUrlComponent(u, 'year=' + encodeURIComponent((object.movie.release_date || object.movie.first_air_date || '0000').slice(0, 4)));
        u = Utils.addUrlComponent(u, 'is_serial=' + (object.movie.first_air_date ? 'true' : 'false'));
        u = Utils.addUrlComponent(u, 'genres=' + encodeURIComponent(genres.join(',')));
        network["native"](u, function (json) {
          json.Results.forEach(function (element) {
            element.PublisTime = Utils.strToTime(element.PublishDate);
          });
          results = json;

          _this3.build();

          _this3.activity.loader(false);

          _this3.activity.toggle();
        }, this.empty.bind(this));
      };

      this.empty = function () {
        var empty = new create$h();
        files.append(empty.render(filter.empty()));
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.buildSorted = function () {
        var need = Storage.get('torrents_sort', 'Seeders');
        var select = [{
          title: 'По раздающим',
          sort: 'Seeders'
        }, {
          title: 'По размеру',
          sort: 'Size'
        }, {
          title: 'По названию',
          sort: 'Title'
        }, {
          title: 'По источнику',
          sort: 'Tracker'
        }, {
          title: 'По дате',
          sort: 'PublisTime'
        }];
        select.forEach(function (element) {
          if (element.sort == need) element.selected = true;
        });
        filter.sort(results.Results, need);
        filter.set('sort', select);
      };

      this.buildFilterd = function () {
        var need = Storage.get('torrents_filter', '{}');
        var select = [];

        var add = function add(type, title) {
          var items = filter_items[type];
          var subitems = [];
          items.forEach(function (name, i) {
            subitems.push({
              title: name,
              selected: need[type] == i,
              index: i
            });
          });
          select.push({
            title: title,
            subtitle: need[type] ? items[need[type]] : items[0],
            items: subitems,
            stype: type
          });
        };

        filter_items.voice = ["Любой", "Дубляж", "Многоголосый", "Двухголосый", "Любительский"];
        results.Results.forEach(function (element) {
          var title = element.Title.toLowerCase();

          for (var i = 0; i < voices.length; i++) {
            var voice = voices[i].toLowerCase();

            if (title.indexOf(voice) >= 0) {
              if (filter_items.voice.indexOf(voices[i]) == -1) filter_items.voice.push(voices[i]);
            }
          }
        });
        add('quality', 'Качество');
        add('hdr', 'HDR');
        add('sub', 'Субтитры');
        add('voice', 'Перевод');
        filter.set('filter', select);
      };

      this.build = function () {
        var _this4 = this;

        this.buildSorted();
        this.buildFilterd();
        this.filtred();

        filter.onSelect = function (type, a, b) {
          if (type == 'sort') {
            Storage.set('torrents_sort', a.sort);
            filter.sort(results.Results, a.sort);
          } else {
            var filter_data = Storage.get('torrents_filter', '{}');
            filter_data[a.stype] = b.index;
            a.subtitle = b.title;
            Storage.set('torrents_filter', filter_data);
          }

          _this4.filtred();

          _this4.reset();

          _this4.showResults();

          last = scroll.render().find('.torrent-item:eq(0)')[0];

          _this4.start();
        };

        if (results.Results.length) this.showResults();else {
          this.empty();
        }
      };

      this.filtred = function () {
        var filter_data = Storage.get('torrents_filter', '{}');
        var filter_any = false;

        for (var i in filter_data) {
          if (filter_data[i]) filter_any = true;
        }

        filtred = results.Results.filter(function (element) {
          if (filter_any) {
            var passed = false,
                nopass = false,
                title = element.Title.toLowerCase();
            var qua = filter_data.quality,
                hdr = filter_data.hdr,
                sub = filter_data.sub,
                voi = filter_data.voice;

            var check = function check(search, invert) {
              var rex = new RegExp(search);

              if (rex.test(title)) {
                if (invert) nopass = true;else passed = true;
              } else {
                if (invert) passed = true;else nopass = true;
              }
            };

            if (qua) {
              if (qua == 1) check('(4k|uhd)[ |\\]|,|$]|2160[pр]|ultrahd');else if (qua == 2) check('fullhd|1080[pр]');else check('720[pр]');
            }

            if (hdr) {
              if (hdr == 1) check('[\\[| ]hdr[10| |\\]|,|$]');else check('[\\[| ]hdr[10| |\\]|,|$]', true);
            }

            if (sub) {
              if (sub == 1) check(' sub');else if (/ sub/.test(title)) nopass = true;
            }

            if (voi) {
              if (voi == 1) {
                check('дублирован|дубляж|  apple| d[,| |$]');
              } else if (voi == 2) {
                check('многоголос| p[,| |$]');
              } else if (voi == 3) {
                check('двухголос|двуголос| l2[,| |$]');
              } else if (voi == 4) {
                check('любитель|авторский| l1[,| |$]');
              } else check(filter_items.voice[voi].toLowerCase());
            }

            return nopass ? false : passed ? true : false;
          } else return true;
        });
      };

      this.showResults = function () {
        total_pages = Math.ceil(filtred.length / 20);
        filter.render().addClass('torrent-filter');
        scroll.append(filter.render());
        this.append(filtred.slice(0, 20));
        files.append(scroll.render());
      };

      this.reset = function () {
        last = false;
        filter.render().detach();
        scroll.clear();
      };

      this.next = function () {
        if (object.page < 15 && object.page < total_pages) {
          object.page++;
          var offset = (object.page - 1) * 20;
          this.append(filtred.slice(offset, offset + 20));
          Controller.enable('content');
        }
      };

      this.loadMagnet = function (element) {
        network.timeout(1000 * 15);
        var u = Storage.get('native') || Storage.field('torlook_parse_type') == 'native' ? torlook_site + element.reguest : url.replace('{q}', encodeURIComponent(torlook_site + element.reguest));
        network.silent(u, function (html) {
          var math = html.match(/magnet:(.*?)'/);

          if (math && math[1]) {
            Modal.close();
            element.MagnetUri = 'magnet:' + math[1];
            Torrent.start(element);
          } else {
            Modal.update(Template.get('error', {
              title: 'Ошибка',
              text: 'Неудалось получить magnet ссылку'
            }));
          }
        }, function (a, c) {
          Modal.update(Template.get('error', {
            title: 'Ошибка',
            text: network.errorDecode(a, c)
          }));
        }, false, {
          dataType: 'text'
        });
        Modal.open({
          title: '',
          html: Template.get('modal_pending', {
            text: 'Запрашиваю magnet ссылку'
          }),
          onBack: function onBack() {
            Modal.close();
            network.clear();
            Controller.toggle('content');
          }
        });
      };

      this.append = function (items) {
        var _this5 = this;

        items.forEach(function (element) {
          count++;
          var date = Utils.parseTime(element.PublishDate);
          var pose = count;
          Arrays.extend(element, {
            title: element.Title,
            date: date.full,
            tracker: element.Tracker,
            size: element.Size ? Utils.bytesToSize(element.Size) : element.size,
            seeds: element.Seeders,
            grabs: element.Peers
          });
          var item = Template.get('torrent', element);
          item.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
            if (pose > object.page * 20 - 4) _this5.next();
          }).on('hover:enter', function () {
            if (element.reguest && !element.MagnetUri) {
              _this5.loadMagnet(element);
            } else {
              Torrent.start(element);
            }
          });
          scroll.append(item);
        });
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          back: this.back
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return files.render();
      };

      this.destroy = function () {
        network.clear();
        files.destroy();
        scroll.destroy();
        results = null;
        network = null;
      };
    }

    var component$1 = {
      main: component$8,
      full: component$7,
      category: component$5,
      category_full: component$6,
      actor: component$4,
      favorite: component$3,
      torrents: component$2
    };

    function create$6(object) {
      return new component$1[object.component](object);
    }

    var where;
    var data = {};
    var notices = [];

    function init$6() {
      data = Storage.get('notice', '{}');
      notices = [{
        time: '2021-10-07 17:00',
        title: 'Обновление 1.2.1',
        descr: '1. Исправлен баг с кнопкой назад в MSX<br>2. Исправлен баг с поиском<br>3. Добавлен фильтр в торрентах<br>4. Визуально доработан плеер<br>5. Добавлены настройки быстродействия<br>6. Исправлены имена в торрент-файлах<br>7. Исправлен баг с паузой в плеере<br>8. Исправлены другие мелкие ошибки и баги'
      }, {
        time: '2021-10-03 12:00',
        title: 'Обновление 1.0.10',
        descr: '1. Доработана подгрузка карточек в мелком режиме<br>2. Добавлены логи, для просмотра логов наведите на шапку и щелкайте вверх 10 раз'
      }, {
        time: '2021-10-01 09:00',
        title: 'Обновление 1.0.9',
        descr: '1. Доработан фон в закладках и в фильме<br>2. Изменены инструкции<br>3. Доделан плагин под Orsay'
      }, {
        time: '2021-09-30 18:00',
        title: 'Обновление 1.0.8',
        descr: '1. Доработан фон<br>2. Выведена кнопка (Торренты)<br>3. Добавлена сортировка торрентов<br>4. Доделан выход под Tizen и WebOS<br> 5. Возможно доделаны кнопки управления под Orsay'
      }, {
        time: '2021-09-29 17:00',
        title: 'Обновление 1.0.7',
        descr: '1. Оптимизирована главная страница и каталоги<br>2. Добавлена авторизация для TorServer<br> 3. Добавлены подсказки ошибок в TorServer'
      }, {
        time: '2021-09-28 16:00',
        title: 'Исправления',
        descr: '1. Исправлена ошибка (Невозможно получить HASH)<br>2. Доделан парсер для MSX, теперь не нужно указывать явную ссылку, только по желанию<br> 3. Улучшен парсер jac.red, теперь точнее ищет'
      }, {
        time: '2021-09-27 15:00',
        title: 'Исправлен парсер',
        descr: 'В парсере была выявлена ошибка, из за которой jac.red не выдавал результаты'
      }, {
        time: '2021-09-26 17:00',
        title: 'Добро пожаловать!',
        descr: 'Это ваш первый запуск приложения, надеемся вам очень понравится. Приятного вам просмотра.'
      }];
      Arrays.extend(data, {
        time: 0
      });
    }

    function open() {
      var html = $('<div></div>');
      var items = notices.slice(0, 5);
      items.forEach(function (element) {
        var item = Template.get('notice', element);
        html.append(item);
      });
      Modal.open({
        title: 'Уведомления',
        size: 'medium',
        html: html,
        onBack: function onBack() {
          Modal.close();
          Controller.toggle('head');
        }
      });
      data.time = maxtime();
      Storage.set('notice', data);
      icon();
    }

    function maxtime() {
      var max = 0;
      notices.forEach(function (element) {
        var time = new Date(element.time).getTime();
        max = Math.max(max, time);
      });
      return max;
    }

    function any() {
      return maxtime() > data.time;
    }

    function icon() {
      where.find('.notice--icon').toggleClass('active', any());
    }

    function start$1(html) {
      where = html;
      icon();
    }

    var Notice = {
      open: open,
      start: start$1,
      init: init$6
    };

    var html$6;
    var last$2;

    function init$5() {
      html$6 = Template.get('head');
      Utils.time(html$6);
      Notice.start(html$6);
      html$6.find('.selector').on('hover:focus', function (event) {
        last$2 = event.target;
      });
      html$6.find('.open--settings').on('hover:enter', function () {
        Controller.toggle('settings');
      });
      html$6.find('.open--notice').on('hover:enter', function () {
        Notice.open();
      });
      Controller.add('head', {
        toggle: function toggle() {
          Controller.collectionSet(html$6);
          Controller.collectionFocus(last$2, html$6);
        },
        right: function right() {
          Navigator.move('right');
        },
        left: function left() {
          if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
        },
        down: function down() {
          Controller.toggle('content');
        },
        back: function back() {
          Activity$1.backward();
        }
      });
    }

    function title(title) {
      html$6.find('.head__title').text(title ? '- ' + title : '');
    }

    function render$4() {
      return html$6;
    }

    var Head = {
      render: render$4,
      title: title,
      init: init$5
    };

    var listener$3 = start$3();
    var activites = [];
    var callback = false;
    var fullout = false;
    var content;
    var slides;
    var maxsave;

    function Activity(component) {
      var slide = Template.get('activity');
      var body = slide.find('.activity__body');
      this.stoped = false;
      this.started = false;
      /**
       * Добовляет активити в список активитис
       */

      this.append = function () {
        slides.append(slide);
      };
      /**
       * Создает новую активность
       */


      this.create = function () {
        component.create(body);
        body.append(component.render());
      };
      /**
       * Показывает загрузку
       * @param {Boolean} status 
       */


      this.loader = function (status) {
        slide.toggleClass('activity--load', status);
      };
      /**
       * Создает повторно
       */


      this.restart = function () {
        this.append();
        this.stoped = false;
        component.start();
      };
      /**
       * Стартуем активную активность
       */


      this.start = function () {
        this.started = true;
        Controller.add('content', {
          invisible: true,
          toggle: function toggle() {},
          left: function left() {
            Controller.toggle('menu');
          },
          up: function up() {
            Controller.toggle('head');
          },
          back: function back() {
            Activity.backward();
          }
        });
        Controller.toggle('content');
        if (this.stoped) this.restart();else component.start();
      };
      /**
       * пауза
       */


      this.pause = function () {
        this.started = false;
        component.pause();
      };
      /**
       * Включаем активность если она активна
       */


      this.toggle = function () {
        if (this.started) this.start();
      };
      /**
       * Стоп
       */


      this.stop = function () {
        this.started = false;
        if (this.stoped) return;
        this.stoped = true;
        component.stop();
        slide.detach();
      };
      /**
       * Рендер
       */


      this.render = function () {
        return slide;
      };
      /**
       * Уничтожаем активность
       */


      this.destroy = function () {
        component.destroy();
        slide.remove();
      };

      this.append();
    }

    function init$4() {
      content = Template.get('activitys');
      slides = content.find('.activitys__slides');
      maxsave = Storage.get('pages_save_total', 5);
      empty();
      window.addEventListener('popstate', function () {
        if (fullout) return;
        empty();
        listener$3.send('popstate', {
          count: activites.length
        });
        if (callback) callback();else {
          backward();
        }
      });
      Storage.listener.follow('change', function (event) {
        if (event.name == 'pages_save_total') maxsave = Storage.get('pages_save_total', 5);
      });
    }
    /**
     * Лимит активностей, уничтожать если больше maxsave
     */


    function limit() {
      var curent = active$1();
      if (curent && curent.activity) curent.activity.pause();
      var tree_stop = activites.slice(-2);
      if (tree_stop.length > 1 && tree_stop[0].activity) tree_stop[0].activity.stop();
      var tree_destroy = activites.slice(-maxsave);

      if (tree_destroy.length > maxsave - 1) {
        var first = tree_destroy[0];

        if (first.activity) {
          first.activity.destroy();
          first.activity = null;
        }
      }
    }
    /**
     * Добавить новую активность
     * @param {Object} object 
     */


    function push(object) {
      limit();
      create$5(object);
      activites.push(object);
      start(object);
    }
    /**
     * Создать новую активность
     * @param {Object} object 
     */


    function create$5(object) {
      var comp = create$6(object);
      object.activity = new Activity(comp);
      comp.activity = object.activity;
      object.activity.create();
    }

    function back$2() {
      window.history.back();
    }

    function active$1() {
      return activites[activites.length - 1];
    }

    function empty() {
      window.history.pushState(null, null, window.location.pathname);
    }

    function backward() {
      callback = false;
      listener$3.send('backward', {
        count: activites.length
      });
      if (activites.length == 1) return;
      slides.find('>div').removeClass('activity--active');
      var curent = activites.pop();

      if (curent) {
        setTimeout(function () {
          curent.activity.destroy();
        }, 200);
      }

      var previous_tree = activites.slice(-maxsave);

      if (previous_tree.length > maxsave - 1) {
        create$5(previous_tree[0]);
      }

      previous_tree = activites.slice(-1)[0];

      if (previous_tree) {
        if (previous_tree.activity) start(previous_tree);else {
          create$5(previous_tree);
          start(previous_tree);
        }
      }
    }

    function save(object) {
      var saved = {};

      for (var i in object) {
        if (i !== 'activity') saved[i] = object[i];
      }

      Storage.set('activity', saved);
    }

    function extractObject(object) {
      var saved = {};

      for (var i in object) {
        if (i !== 'activity') saved[i] = object[i];
      }

      return saved;
    }

    function start(object) {
      save(object);
      object.activity.start();
      slides.find('> div').removeClass('activity--active');
      object.activity.render().addClass('activity--active');
      Head.title(object.title);
    }

    function last$1() {
      var active = Storage.get('activity', 'false');

      if (active) {
        push(active);
      } else {
        push({
          url: '',
          title: 'Главная',
          component: 'main'
        });
      }
    }

    function render$3() {
      return content;
    }

    function call(call) {
      callback = call;
    }

    function out() {
      fullout = true;
      back$2();

      for (var i = 0; i < window.history.length; i++) {
        back$2();
      }

      setTimeout(function () {
        fullout = false;
        empty();
      }, 100);
    }

    function replace() {
      var replace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var object = extractObject(active$1());

      for (var i in replace) {
        object[i] = replace[i];
      }

      active$1().activity.destroy();
      activites.pop();
      push(object);
    }

    var Activity$1 = {
      init: init$4,
      listener: listener$3,
      push: push,
      back: back$2,
      render: render$3,
      backward: backward,
      call: call,
      last: last$1,
      out: out,
      replace: replace
    };

    var listener$2 = start$3();
    var active;
    var active_name = '';
    var controlls = {};
    var selects;
    var select_active;
    /**
     * Добавить контроллер
     * @param {String} name 
     * @param {Object} calls 
     */

    function add$1(name, calls) {
      controlls[name] = calls;
    }
    /**
     * Запустить функцию
     * @param {String} name 
     * @param {Object} params 
     */


    function run(name, params) {
      if (active) {
        if (active[name]) {
          if (typeof active[name] == 'function') active[name](params);else if (typeof active[name] == 'string') {
            run(active[name], params);
          }
        }
      }
    }
    /**
     * Двигать
     * @param {String} direction 
     */


    function move(direction) {
      run(direction);
    }
    /**
     * Вызов enter
     */


    function enter() {
      if (active && active.enter) run('enter');else if (select_active) {
        select_active.trigger('hover:enter');
      }
    }
    /**
     * Вызов long
     */


    function _long() {
      if (active && active["long"]) run('long');else if (select_active) {
        select_active.trigger('hover:long');
      }
    }
    /**
     * Завершить
     */


    function finish() {
      run('finish');
    }
    /**
     * Нажали назад
     */


    function back$1() {
      run('back');
    }
    /**
     * Переключить контроллер
     * @param {String} name 
     */


    function toggle$1(name) {
      if (active && active.gone) active.gone(name);

      if (controlls[name]) {
        active = controlls[name];
        active_name = name;
        Activity$1.call(function () {
          run('back');
        });
        if (active.toggle) active.toggle();
        selects = $('.selector');
        listener$2.send('toggle', {
          name: name
        });
      }
    }

    function enable$1(name) {
      if (active_name == name) toggle$1(name);
    }

    function clearSelects() {
      select_active = false;
      $('.selector').removeClass('focus enter');
      if (selects) selects.unbind('.hover');
    }
    /**
     * Вызвать событие
     * @param {String} name 
     * @param {Object} params 
     */


    function trigger$1(name, params) {
      run(name, params);
    }
    /**
     * Фокус на элементе
     * @param {Object} target 
     */


    function focus(target) {
      if (selects) selects.removeClass('focus enter');
      $(target).addClass('focus').trigger('hover:focus');
      select_active = $(target);
    }

    function collectionSet(html) {
      var colection = html.find('.selector').toArray();

      if (colection.length || active.invisible) {
        clearSelects();
        Navigator.setCollection(colection);
      }
    }

    function collectionFocus(target, html) {
      if (target) {
        Navigator.focus(target);
      } else {
        var colection = html.find('.selector').toArray();
        if (colection.length) Navigator.focus(colection[0]);
      }
    }

    function enabled$1() {
      return {
        name: active_name,
        controller: active
      };
    }

    var Controller = {
      listener: listener$2,
      add: add$1,
      move: move,
      enter: enter,
      finish: finish,
      toggle: toggle$1,
      trigger: trigger$1,
      back: back$1,
      focus: focus,
      collectionSet: collectionSet,
      collectionFocus: collectionFocus,
      enable: enable$1,
      enabled: enabled$1,
      "long": _long
    };

    function create$4() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _keyClass = window.SimpleKeyboard["default"],
          _keyBord;

      var last;
      var _default_layout = {
        'en': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{RU} q w e r t y u i o p', 'a s d f g h j k l {enter}', '{shift} z x c v b n m , . : http://', '{space}'],
        'en-shift': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{RU} Q W E R T Y U I O P', 'A S D F G H J K L {enter}', '{shift} Z X C V B N M , . : http://', '{space}'],
        'abc': ['1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '! @ # $ % ^ & * ( ) [ ]', '- _ = + \\ | [ ] { } {enter}', '; : \' " , . < > / ?', '{rus} {space} {eng}'],
        'default': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{EN} й ц у к е н г ш щ з х ъ', 'ф ы в а п р о л д ж э {enter}', '{shift} я ч с м и т ь б ю , . : http://', '{space}'],
        'ru-shift': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{EN} Й Ц У К Е Н Г Ш Щ З Х Ъ', 'Ф Ы В А П Р О Л Д Ж Э {enter}', '{shift} Я Ч С М И Т Ь Б Ю , . : http://', '{space}']
      };
      this.listener = start$3();

      this.create = function () {
        var _this = this;

        _keyBord = new _keyClass({
          display: {
            '{bksp}': '&nbsp;',
            '{enter}': '&nbsp;',
            '{shift}': '&nbsp;',
            '{space}': '&nbsp;',
            '{RU}': '&nbsp;',
            '{EN}': '&nbsp;',
            '{abc}': '&nbsp;',
            '{rus}': 'русский',
            '{eng}': 'english'
          },
          layout: params.layout || _default_layout,
          onChange: function onChange(value) {
            _this.listener.send('change', {
              value: value
            });
          },
          onKeyPress: function onKeyPress(button) {
            if (button === "{shift}" || button === "{abc}" || button === "{EN}" || button === "{RU}" || button === "{rus}" || button === "{eng}") _this._handle(button);else if (button === '{enter}') {
              _this.listener.send('enter');
            }
          }
        });
      };

      this.value = function (value) {
        _keyBord.setInput(value);

        this.listener.send('change', {
          value: value
        });
      };

      this._layout = function () {
        var keys = $('.simple-keyboard .hg-button').addClass('selector');
        Controller.collectionSet($('.simple-keyboard'));
        Controller.collectionFocus(last || keys[0], $('.simple-keyboard'));
        $('.simple-keyboard .hg-button:not(.binded)').on('hover:enter', function (e, click) {
          Controller.collectionFocus($(this)[0]);
          if (!click) _keyBord.handleButtonClicked($(this).attr('data-skbtn'), e);
        }).on('hover:focus', function (e) {
          last = e.target;
        });
        keys.addClass('binded');
      };

      this._handle = function (button) {
        var current_layout = _keyBord.options.layoutName,
            layout = 'default';

        if (button == '{shift}') {
          if (current_layout == 'default') layout = 'ru-shift';else if (current_layout == 'ru-shift') layout = 'default';else if (current_layout == 'en') layout = 'en-shift';else if (current_layout == 'en-shift') layout = 'en';
        } else if (button == '{abc}') layout = 'abc';else if (button == '{EN}' || button == '{eng}') layout = 'en';else if (button == '{RU}' || button == '{rus}') layout = 'default';

        _keyBord.setOptions({
          layoutName: layout
        });

        last = false;
        Controller.toggle('keybord');
      };

      this.toggle = function () {
        var _this2 = this;

        Controller.add('keybord', {
          toggle: function toggle() {
            _this2._layout();
          },
          up: function up() {
            if (!Navigator.canmove('up')) {
              _this2.listener.send('up');
            } else Navigator.move('up');
          },
          down: function down() {
            if (!Navigator.canmove('down')) {
              _this2.listener.send('down');
            } else Navigator.move('down');
          },
          left: function left() {
            if (!Navigator.canmove('left')) {
              _this2.listener.send('left');
            } else Navigator.move('left');
          },
          right: function right() {
            if (!Navigator.canmove('right')) {
              _this2.listener.send('right');
            } else Navigator.move('right');
          },
          back: function back() {
            _this2.listener.send('back');
          }
        });
        Controller.toggle('keybord');
      };

      this.destroy = function () {
        _keyBord.destroy();

        this.listener.destroy();
      };
    }

    var html$5, keyboard$1, input$1;

    function edit(params, call) {
      html$5 = Template.get('settings_input');
      input$1 = html$5.find('.settings-input__input');
      $('body').append(html$5);
      keyboard$1 = new create$4();
      keyboard$1.listener.follow('change', function (event) {
        input$1.text(event.value.trim());
      });
      keyboard$1.listener.follow('enter', function (event) {
        call(input$1.text());
        back();
      });
      keyboard$1.listener.follow('down', function (event) {
        Select.show({
          title: 'Ссылки',
          items: [{
            title: Utils.shortText('api.scraperapi.com/?url={q}&api_key=', 35),
            subtitle: 'scraperapi.com',
            url: 'api.scraperapi.com/?url={q}&api_key='
          }, {
            title: Utils.shortText('Для торрентов jac.red', 35),
            subtitle: 'jac.red',
            url: 'jac.red'
          }, {
            title: Utils.shortText('Для локального TorrServ', 35),
            subtitle: '127.0.0.1:8090',
            url: '127.0.0.1:8090'
          }],
          onSelect: function onSelect(a) {
            keyboard$1.value(a.url);
            keyboard$1.toggle();
          },
          onBack: function onBack() {
            keyboard$1.toggle();
          }
        });
      });
      keyboard$1.listener.follow('back', back);
      keyboard$1.create();
      keyboard$1.value(params.value);
      keyboard$1.toggle();
    }

    function back() {
      destroy$1();
      Controller.toggle('settings_component');
    }

    function destroy$1() {
      keyboard$1.destroy();
      html$5.remove();
      html$5 = null;
      keyboard$1 = null;
      input$1 = null;
    }

    var Input = {
      edit: edit
    };

    var values = {};
    var defaults = {};

    function trigger(name, _default) {
      values[name] = {
        'true': 'Да',
        'false': 'Нет'
      };
      defaults[name] = _default;
    }

    function select(name, _select, _default) {
      values[name] = _select;
      defaults[name] = _default;
    }

    function bind(elems) {
      elems.on('hover:enter', function (event) {
        var elem = $(event.target);
        var type = elem.data('type');
        var name = elem.data('name');

        if (type == 'toggle') {
          var params = values[name];
          var keys = Arrays.isArray(params) ? params : Arrays.getKeys(params),
              value = Storage.get(name, defaults[name]) + '',
              position = keys.indexOf(value);
          position++;
          if (position >= keys.length) position = 0;
          position = Math.max(0, Math.min(keys.length - 1, position));
          value = keys[position];
          Storage.set(name, value);
          update(elem);
        }

        if (type == 'input') {
          Input.edit({
            elem: elem,
            name: name,
            value: Storage.get(name, defaults[name]) + ''
          }, function (new_value) {
            Storage.set(name, new_value);
            update(elem);
          });
        }
      }).each(function () {
        update($(this));
      });
    }

    function update(elem) {
      var name = elem.data('name');
      var key = Storage.get(name, defaults[name] + '');
      var val = typeof values[name] == 'string' ? key : values[name][key] || values[name][defaults[name]];
      var plr = elem.attr('placeholder');
      if (!val && plr) val = plr;
      elem.find('.settings-param__value').text(val);
    }

    function field$1(name) {
      return Storage.get(name, defaults[name] + '');
    }

    select('interface_size', {
      'small': 'Меньше',
      'normal': 'Нормальный'
    }, 'normal');
    select('parser_torrent_type', {
      'jackett': 'Jackett',
      'torlook': 'Torlook'
    }, 'jackett');
    select('torlook_parse_type', {
      'native': 'Напрямую',
      'site': 'Через API сайта'
    }, 'native');
    select('background_type', {
      'complex': 'Сложный',
      'simple': 'Простой',
      'poster': 'Картинка'
    }, 'complex');
    select('pages_save_total', {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5'
    }, '5');
    trigger('animation', true);
    trigger('background', true);
    trigger('torrserver_savedb', false);
    trigger('parser_use', false);
    trigger('torrserver_auth', false);
    trigger('mask', true);
    select('jackett_url', '', 'jac.red');
    select('jackett_key', '', '');
    select('torrserver_url', '', '');
    select('torrserver_login', '', '');
    select('torrserver_password', '', '');
    select('parser_website_url', '', '');
    select('torlook_site', '', 'w41.torlook.info');
    var Params = {
      bind: bind,
      update: update,
      field: field$1
    };

    var listener$1 = start$3();

    function get$1(name, empty) {
      var value = window.localStorage.getItem(name) || empty || '';
      var convert = parseInt(value);
      if (!isNaN(convert) && /^\d+$/.test(value)) return convert;

      if (value == 'true' || value == 'false') {
        return value == 'true' ? true : false;
      }

      try {
        value = JSON.parse(value);
      } catch (error) {}

      return value;
    }

    function set(name, value) {
      if (Arrays.isObject(value) || Arrays.isArray(value)) {
        var str = JSON.stringify(value);
        window.localStorage.setItem(name, str);
      } else {
        window.localStorage.setItem(name, value);
      }

      listener$1.send('change', {
        name: name,
        value: value
      });
    }

    function field(name) {
      return Params.field(name);
    }

    var Storage = {
      listener: listener$1,
      get: get$1,
      set: set,
      field: field
    };

    function init$3() {
      if (typeof webOS !== 'undefined') {
        Storage.set('platform', 'webos');
      } else if (typeof webapis !== 'undefined' && typeof tizen !== 'undefined') {
        Storage.set('platform', 'tizen');
      } else {
        Storage.set('platform', '');
      }

      Storage.set('native', Storage.get('platform') ? true : false);
    }

    function get() {
      return Storage.get('platform', '');
    }

    var Platform = {
      init: init$3,
      get: get
    };

    var widgetAPI,
        tvKey,
        pluginAPI,
        orsay_loaded,
        orsay_call = Date.now(),
        orsay_tap_back = Date.now(),
        orsay_tap_back_count = 1,
        orsay_tap_back_timer;

    function init$2() {
      $('body').append($("<div style=\"position: absolute; left: -1000px; top: -1000px;\">\n    <object id=\"pluginObjectNNavi\" border=\"0\" classid=\"clsid:SAMSUNG-INFOLINK-NNAVI\" style=\"opacity: 0.0; background-color: #000; width: 1px; height: 1px;\"></object>\n    <object id=\"pluginObjectTVMW\" border=\"0\" classid=\"clsid:SAMSUNG-INFOLINK-TVMW\" style=\"opacity: 0.0; background-color: #000; width: 1px; height: 1px;\"></object>\n</div>"));
      Utils.putScript(['$MANAGER_WIDGET/Common/API/Widget.js', '$MANAGER_WIDGET/Common/API/TVKeyValue.js', '$MANAGER_WIDGET/Common/API/Plugin.js', '$CAPH/1.0.0/caph-level1-unified.min.js', '$MANAGER_WIDGET/Common/webapi/1.0/webapis.js'], function () {
        window.addEventListener("keydown", function (event) {
          try {
            switch (event.keyCode) {
              case tvKey.KEY_RETURN:
                window.history.back();
                widgetAPI.blockNavigation(event);
                break;

              case tvKey.KEY_VOLUME_UP:
                webapis.audiocontrol.setVolumeUp();
                break;

              case tvKey.KEY_VOLUME_DOWN:
                webapis.audiocontrol.setVolumeDown();
                break;

              case tvKey.KEY_VOL_UP:
                webapis.audiocontrol.setVolumeUp();
                break;

              case tvKey.KEY_VOL_DOWN:
                webapis.audiocontrol.setVolumeDown();
                break;

              case tvKey.KEY_MUTE:
                if (webapis.audiocontrol.getMute) webapis.audiocontrol.setMute(0);else webapis.audiocontrol.setMute(1);
                break;

              case tvKey.KEY_EXIT:
                if (orsay_tap_back + 200 < Date.now()) {
                  orsay_tap_back_count = 1;
                } else {
                  orsay_tap_back_count++;
                }

                if (orsay_tap_back_count >= 2) {
                  widgetAPI.sendExitEvent(event);
                } else {
                  widgetAPI.sendReturnEvent(event);
                }

                clearTimeout(orsay_tap_back_timer);
                orsay_tap_back_timer = setTimeout(function () {
                  orsay_tap_back = Date.now();
                }, 200);
                break;
            }
          } catch (e) {}
        });
        orsayOnLoad();
      });
    }

    function orsayOnshow() {
      if (orsay_loaded) return;
      orsay_loaded = true;

      try {
        pluginAPI.SetBannerState(1);
        pluginAPI.unregistKey(tvKey.KEY_VOL_UP);
        pluginAPI.unregistKey(tvKey.KEY_VOL_DOWN);
        pluginAPI.unregistKey(tvKey.KEY_MUTE);
        pluginAPI.unregistKey(tvKey.KEY_TOOLS);
      } catch (e) {}

      try {
        var NNaviPlugin = caph.platform.dtv.Device.plugin('NNAVI');
        NNaviPlugin.SetBannerState(1);
        caph.platform.dtv.Device.unRegisterKey(caph.platform.Key.VOL_UP);
        caph.platform.dtv.Device.unRegisterKey(caph.platform.Key.VOL_DOWN);
        caph.platform.dtv.Device.unRegisterKey(caph.platform.Key.MUTE);
      } catch (e) {}
    }

    function orsayOnLoad() {
      try {
        if (typeof Common !== 'undefined' && Common.API && Common.API.TVKeyValue && Common.API.Plugin && Common.API.Widget) {
          widgetAPI = new Common.API.Widget();
          tvKey = new Common.API.TVKeyValue();
          pluginAPI = new Common.API.Plugin();
          window.onShow = orsayOnshow;
          setTimeout(function () {
            orsayOnshow();
          }, 2000);
          widgetAPI.sendReadyEvent();
        } else {
          if (orsay_call + 5 * 1000 > Date.now()) setTimeout(orsayOnLoad, 50);
        }
      } catch (e) {}
    }

    var Orsay = {
      init: init$2
    };

    var html$4;
    var last;
    var genres = [];

    function init$1() {
      html$4 = Template.get('menu');
      html$4.find('.selector').on('hover:enter', function (e) {
        var action = $(e.target).data('action');
        var type = $(e.target).data('type');
        if (action == 'catalog') catalog();

        if (action == 'movie' || action == 'tv') {
          Activity$1.push({
            url: action,
            title: action == 'movie' ? 'Фильмы' : 'Сериалы',
            component: 'category'
          });
        }

        if (action == 'main') {
          Activity$1.push({
            url: '',
            title: 'Главная',
            component: 'main'
          });
        }

        if (action == 'search') Controller.toggle('search');
        if (action == 'settings') Controller.toggle('settings');

        if (action == 'about') {
          Modal.open({
            title: 'О приложении',
            html: Template.get('about'),
            size: 'medium',
            onBack: function onBack() {
              Modal.close();
              Controller.toggle('content');
            }
          });
        }

        if (action == 'favorite') {
          Activity$1.push({
            url: '',
            title: type == 'book' ? 'Закладки' : type == 'like' ? 'Нравится' : 'Позже',
            component: 'favorite',
            type: type,
            page: 1
          });
        }
      }).on('hover:focus', function (e) {
        last = e.target;
      });
      Api.genres({}, function (json) {
        genres = json.genres;
      });
      Controller.add('menu', {
        toggle: function toggle() {
          Controller.collectionSet(html$4);
          Controller.collectionFocus(last, html$4);
          $('body').toggleClass('menu--open', true);
        },
        right: function right() {
          Controller.toggle('content');
        },
        up: function up() {
          if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
        },
        down: function down() {
          Navigator.move('down');
        },
        gone: function gone() {
          $('body').toggleClass('menu--open', false);
        },
        back: function back() {
          Activity$1.backward();
        }
      });
    }

    function catalog() {
      var menu = [];
      genres.forEach(function (element) {
        menu.push({
          title: element.name,
          id: element.id
        });
      });
      Select.show({
        title: 'Каталог',
        items: menu,
        onSelect: function onSelect(a) {
          Activity$1.push({
            url: 'movie',
            title: a.title,
            component: 'category',
            genres: a.id
          });
        },
        onBack: function onBack() {
          Controller.toggle('menu');
        }
      });
    }

    function render$2() {
      return html$4;
    }

    var Menu = {
      render: render$2,
      init: init$1
    };

    function component(name) {
      var scrl = new create$m({
        mask: true,
        over: true
      });
      var comp = Template.get('settings_' + name);
      var last;

      if (Storage.get('native')) {
        comp.find('.is--torllok').remove();
      }

      scrl.render().find('.scroll__content').addClass('layer--wheight').data('mheight', $('.settings__head'));
      comp.find('.selector').on('hover:focus', function (e) {
        last = e.target;
        scrl.update($(e.target), true);
      });
      Params.bind(comp.find('.selector'));
      Controller.add('settings_component', {
        toggle: function toggle() {
          Controller.collectionSet(comp);
          Controller.collectionFocus(last, comp);
        },
        up: function up() {
          Navigator.move('up');
        },
        down: function down() {
          Navigator.move('down');
        },
        back: function back() {
          scrl.destroy();
          comp.remove();
          Controller.toggle('settings');
        }
      });

      this.destroy = function () {
        scrl.destroy();
        comp.remove();
        comp = null;
      };

      this.render = function () {
        return scrl.render(comp);
      };
    }

    function main$1() {
      var _this = this;

      var comp;
      var scrl = new create$m({
        mask: true,
        over: true
      });
      var last;

      this.create = function () {
        comp = Template.get('settings_main');
        comp.find('.selector').on('hover:focus', function (event) {
          last = event.target;
          scrl.update($(event.target), true);
        }).on('hover:enter', function (event) {
          _this.render().detach();

          _this.onCreate($(event.target).data('component'));
        });
      };

      this.active = function () {
        Controller.collectionSet(comp);
        Controller.collectionFocus(last, comp);
      };

      this.render = function () {
        return scrl.render(comp);
      };
    }

    var html$3 = Template.get('settings');
    var body = html$3.find('.settings__body');

    function create$3(name) {
      var comp = new component(name);
      body.empty().append(comp.render());
      Controller.toggle('settings_component');
    }

    var main = new main$1();
    main.onCreate = create$3;
    main.create();
    Controller.add('settings', {
      toggle: function toggle() {
        body.empty().append(main.render());
        main.active();
        $('body').toggleClass('settings--open', true);
      },
      up: function up() {
        Navigator.move('up');
      },
      down: function down() {
        Navigator.move('down');
      },
      left: function left() {
        main.render().detach();
        Controller.toggle('content');
      },
      gone: function gone(to) {
        if (to !== 'settings_component') $('body').toggleClass('settings--open', false);
      },
      back: function back() {
        main.render().detach();
        Controller.toggle('head');
      }
    });

    function render$1() {
      return html$3;
    }

    var Settings = {
      render: render$1
    };

    function create$2() {
      var scroll,
          timer,
          items = [],
          active = 0,
          query;
      this.listener = start$3();

      this.create = function () {
        scroll = new create$m({
          over: true
        });
      };

      this.search = function (value) {
        var _this = this;

        clearTimeout(timer);
        query = value;
        timer = setTimeout(function () {
          Api.search({
            query: encodeURIComponent(value)
          }, function (data) {
            _this.clear();

            if (data.movie && data.movie.results.length) _this.build(data.movie, 'movie');
            if (data.tv && data.tv.results.length) _this.build(data.tv, 'tv');
            Controller.enable('search_results');
          });
        }, 1000);
      };

      this.build = function (data, type) {
        var _this2 = this;

        var item = new create$j(data, {
          align_left: true
        });
        item.onDown = this.down;
        item.onUp = this.up;
        item.onBack = this.back.bind(this);

        item.onLeft = function () {
          _this2.listener.send('left');
        };

        item.onEnter = function () {
          _this2.listener.send('enter');
        };

        item.onMore = function () {
          Activity$1.push({
            url: 'search/' + type,
            title: 'Поиск - ' + query,
            component: 'category_full',
            page: 2,
            query: encodeURIComponent(query)
          });
        };

        item.create();
        items.push(item);
        scroll.append(item.render());
      };

      this.back = function () {
        this.listener.send('back');
      };

      this.down = function () {
        active++;
        active = Math.min(active, items.length - 1);
        items[active].toggle();
        scroll.update(items[active].render());
      };

      this.up = function () {
        active--;

        if (active < 0) {
          active = 0;
        } else {
          items[active].toggle();
        }

        scroll.update(items[active].render());
      };

      this.clear = function () {
        scroll.reset();
        active = 0;
        Arrays.destroy(items);
        items = [];
      };

      this.toggle = function () {
        var _this3 = this;

        Controller.add('search_results', {
          invisible: true,
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            if (items.length) items[0].toggle();
          },
          back: function back() {
            _this3.listener.send('back');
          },
          left: function left() {
            _this3.listener.send('left');
          }
        });
        Controller.toggle('search_results');
      };

      this.render = function () {
        return scroll.render();
      };

      this.destroy = function () {
        clearTimeout(timer);
        this.clear();
        scroll.destroy();
        this.listener.destroy();
      };
    }

    function create$1() {
      var scroll,
          last,
          keys = [];
      this.listener = start$3();

      this.create = function () {
        var _this = this;

        scroll = new create$m({
          over: true,
          mask: false,
          nopadding: true
        });
        keys = Storage.get('search_history', '[]');
        keys.forEach(function (key) {
          _this.append(key);
        });
      };

      this.append = function (value) {
        var _this2 = this;

        var key = $('<div class="search-history-key selector"><div>' + value + '</div></div>');
        key.on('hover:enter', function () {
          _this2.listener.send('enter', {
            value: value
          });
        }).on('hover:focus', function (e) {
          last = e.target;
          scroll.update($(e.target));
        });
        scroll.append(key);
      };

      this.add = function (value) {
        if (keys.indexOf(value) == -1) {
          Arrays.insert(keys, 0, value);
          Storage.set('search_history', keys);
        }
      };

      this.toggle = function () {
        var _this3 = this;

        Controller.add('search_history', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else _this3.listener.send('up');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            _this3.listener.send('right');
          },
          back: function back() {
            _this3.listener.send('back');
          }
        });
        Controller.toggle('search_history');
      };

      this.render = function () {
        return scroll.render();
      };

      this.destroy = function () {
        scroll.destroy();
        this.listener.destroy();
        keys = null;
        last = null;
      };
    }

    var html$2 = $('<div></div>'),
        search,
        results,
        history,
        keyboard,
        input = '';

    function create() {
      search = Template.get('search');
      html$2.append(search);
      createHistory();
      createResults();
      createKeyboard();
    }

    function createHistory() {
      history = new create$1();
      history.create();
      history.listener.follow('right', function () {
        results.toggle();
      });
      history.listener.follow('up', function () {
        keyboard.toggle();
      });
      history.listener.follow('enter', function (event) {
        results.clear();
        keyboard.value(event.value);
        results.toggle();
      });
      history.listener.follow('back', destroy);
      search.find('.search__history').append(history.render());
    }

    function createResults() {
      results = new create$2();
      results.create();
      results.listener.follow('left', function () {
        keyboard.toggle();
      });
      results.listener.follow('enter', function () {
        if (input) history.add(input);
        destroy();
      });
      results.listener.follow('back', destroy);
      search.find('.search__results').append(results.render());
    }

    function createKeyboard() {
      keyboard = new create$4({
        layout: {
          'en': ['1 2 3 4 5 6 7 8 9 0', 'q w e r t y u i o p', 'a s d f g h j k l', 'z x c v b n m', '{RU} {space} {bksp}'],
          'default': ['1 2 3 4 5 6 7 8 9 0', 'й ц у к е н г ш щ з х ъ', 'ф ы в а п р о л д ж э', 'я ч с м и т ь б ю', '{EN} {space} {bksp}']
        }
      });
      keyboard.create();
      keyboard.listener.follow('change', function (event) {
        input = event.value.trim();

        if (input) {
          search.find('.search__input').text(input);
          results.search(input);
        } else {
          search.find('.search__input').text('Введите текст...');
        }
      });
      keyboard.listener.follow('right', function () {
        results.toggle();
      });
      keyboard.listener.follow('down', function () {
        history.toggle();
      });
      keyboard.listener.follow('back', destroy);
      keyboard.toggle();
    }

    function render() {
      return html$2;
    }

    function destroy() {
      keyboard.destroy();
      results.destroy();
      history.destroy();
      search.remove();
      html$2.empty();
      Controller.toggle('content');
    }

    Controller.add('search', {
      invisible: true,
      toggle: function toggle() {
        create();
      },
      back: destroy
    });
    var Search = {
      render: render
    };

    function app() {
      var app = $('#app').empty();
      var wrap = Template.get('wrap');
      wrap.find('.wrap__left').append(Menu.render());
      wrap.find('.wrap__content').append(Activity$1.render());
      app.append(Background.render());
      app.append(Head.render());
      app.append(wrap);
      app.append(Settings.render());
      app.append(Search.render());
    }

    var Render = {
      app: app
    };

    var enabled = false;
    var listener = start$3();
    var time = 0;
    var lastdown = 0;
    var timer;

    function toggle(new_status) {
      enabled = new_status;
      listener.send('toggle', {
        status: enabled
      });
    }

    function enable() {
      toggle(true);
    }

    function disable() {
      toggle(false);
    }

    function isEnter(keycode) {
      return keycode == 13 || keycode == 29443 || keycode == 117 || keycode == 65385;
    }

    function keyCode(e) {
      var keycode;

      if (window.event) {
        keycode = e.keyCode;
      } else if (e.which) {
        keycode = e.which;
      }

      return keycode;
    }

    window.addEventListener("keydown", function (e) {
      lastdown = keyCode(e);
      time = Date.now();

      if (!timer) {
        timer = setTimeout(function () {
          if (isEnter(lastdown)) {
            listener.send('longdown', {});
            Controller["long"]();
          }
        }, 800);
      }
    });
    window.addEventListener("keyup", function (e) {
      clearTimeout(timer);
      timer = null;

      if (Date.now() - time > 40) {
        if (isEnter(keyCode(e))) Controller.enter();
      }
    });
    window.addEventListener("keydown", function (e) {
      var keycode = keyCode(e);
      listener.send('keydown', {
        code: keycode,
        enabled: enabled
      });
      if (isEnter(keycode)) return;
      if (!enabled) return; //отключить все
      //4 - Samsung orsay

      if (keycode == 37 || keycode == 4) {
        Controller.move('left');
      } //29460 - Samsung orsay


      if (keycode == 38 || keycode == 29460) {
        Controller.move('up');
      } //5 - Samsung orsay


      if (keycode == 39 || keycode == 5) {
        Controller.move('right');
      } //5 - Samsung orsay
      //29461 - Samsung orsay


      if (keycode == 40 || keycode == 29461) {
        Controller.move('down');
      } //33 - LG; 427 - Samsung


      if (keycode == 33 || keycode == 427) {
        Controller.move('toup');
      } //34 - LG; 428 - Samsung


      if (keycode == 34 || keycode == 428) {
        Controller.move('todown');
      } //Абсолютный Enter


      if (keycode == 32 || keycode == 179) {
        Controller.trigger('playpause');
      } //Samsung media
      //71 - Samsung orsay


      if (keycode == 415 || keycode == 71) {
        Controller.trigger('play');
      } //Samsung stop


      if (keycode == 413) {
        Controller.trigger('stop');
      } //69 - Samsung orsay


      if (keycode == 412 || keycode == 69 || keycode == 177) {
        Controller.trigger('rewindBack');
      } //72 - Samsung orsay


      if (keycode == 418 || keycode == 417 || keycode == 72 || keycode == 176) {
        Controller.trigger('rewindForward');
      } //74 - Samsung orsay


      if (keycode == 19 || keycode == 74) {
        Controller.trigger('pause');
      }

      if (keycode == 457) {
        Controller.trigger('info');
      } //E-Manual


      if (keycode == 10146) {
        e.preventDefault();
      }

      if (keycode == 10133) {
        Controller.toggle('settings');
      } //Кнопка назад
      //8 - браузер
      //27
      //461 - LG
      //10009 - Samsung
      //88 - Samsung orsay


      if (keycode == 8 || keycode == 27 || keycode == 461 || keycode == 10009 || keycode == 88) {
        e.preventDefault();
        Activity$1.back();
        return false;
      }

      e.preventDefault();
    });
    var Keypad = {
      listener: listener,
      enable: enable,
      disable: disable
    };

    var items = [];
    var times = 0;
    var html$1;
    var scroll;

    function init() {
      Keypad.listener.follow('keydown', function (e) {
        if (e.code == 38 || e.code == 29460) {
          var enable = Controller.enabled();

          if (enable.name == 'head') {
            times++;

            if (times > 10) {
              Controller.toggle('console');
            }
          } else {
            times = 0;
          }
        }
      });
      Controller.add('console', {
        toggle: function toggle() {
          build();
          Controller.collectionSet(html$1);
          Controller.collectionFocus(false, html$1);
        },
        up: function up() {
          Navigator.move('up');
        },
        down: function down() {
          Navigator.move('down');
        },
        back: function back() {
          times = 0;
          scroll.destroy();
          html$1.remove();
          Controller.toggle('head');
        }
      });
      follow();
    }

    function build() {
      html$1 = Template.get('console');
      scroll = new create$m({
        over: true
      });
      scroll.minus();
      items.forEach(function (element) {
        var item = $(element);
        item.on('hover:focus', function (e) {
          scroll.update($(e.target));
        });
        scroll.append(item);
      });
      html$1.append(scroll.render());
      $('body').append(html$1);
    }

    function add(message) {
      try {
        Arrays.insert(items, 0, '<div class="console__line selector"><span>' + message + '</span></div>');
      } catch (e) {
        Arrays.insert(items, 0, '<div class="console__line selector"><span>Failed to print line</span></div>');
      }

      if (items.length > 50) items.pop();
    }

    function escapeHtml(text) {
      return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    function decode(arr) {
      if (Arrays.isObject(arr) || Arrays.isArray(arr)) {
        arr = JSON.stringify(arr);
      } else if (typeof arr === 'string' || typeof arr === 'number' || typeof arr === 'boolean') {
        arr = escapeHtml(arr + '');
      } else {
        var a = [];

        for (var i in arr) {
          a.push(i + ': ' + arr[i]);
        }

        arr = JSON.stringify(a);
      }

      arr = Utils.shortText(arr, 600);
      return arr;
    }

    function follow() {
      var log = console.log;

      console.log = function () {
        var msgs = [];
        var mcon = [];

        while (arguments.length) {
          var arr = [].shift.call(arguments);
          msgs.push(decode(arr));
          mcon.push(arr);
        }

        msgs[0] = '<span style="color: ' + Utils.stringToHslColor(msgs[0], 50, 65) + '">' + msgs[0] + '</span>';
        add(msgs.join(' '));
        log.apply(console, mcon);
      };

      window.addEventListener("error", function (e) {
        add((e.error || e).message + '<br><br>' + (e.error ? e.error.stack : e.stack || '').split("\n").join('<br>'));
      });
    }

    var Console = {
      init: init
    };

    Console.init();
    Platform.init();
    Favorite.init();
    Background.init();
    Notice.init();
    Head.init();
    Menu.init();
    Activity$1.init();
    Orsay.init();
    Layer.init();
    Template.get('styles').appendTo('body');
    Controller.listener.follow('toggle', function () {
      Layer.update();
    });
    Activity$1.listener.follow('backward', function (event) {
      if (event.count == 1) {
        var enabled = Controller.enabled();
        Select.show({
          title: 'Выход',
          items: [{
            title: 'Да выйти',
            out: true
          }, {
            title: 'Продолжить'
          }],
          onSelect: function onSelect(a) {
            if (a.out) {
              Activity$1.out();
              Controller.toggle(enabled.name);
              if (Platform.get() == 'tizen') tizen.application.getCurrentApplication().exit();
              if (Platform.get() == 'webos') window.close();
            } else {
              Controller.toggle(enabled.name);
            }
          },
          onBack: function onBack() {
            Controller.toggle(enabled.name);
          }
        });
      }
    });
    Navigator.follow('focus', function (event) {
      Controller.focus(event.elem);
    });
    Render.app();
    Activity$1.last();
    setTimeout(function () {
      Keypad.enable();
      $('.welcome').fadeOut(500);
    }, 1000);
    Utils.putScript(['https://js.sentry-cdn.com/6e63d90a0fc743f3a4bc219d9849fc62.min.js'], function () {});

}());
