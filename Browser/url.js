import axios from 'axios'
const T = {

  getPrePath(req) {
    if (
      !req &&
      Object.prototype.toString.apply(req) !== "[object Object]" &&
      !global.location
    ) {
      return "";
    }
    let pathname;
    if (req) {
      pathname = req.originalUrl || "";
    } else {
      //url的路径  /hk/xx
      pathname = location.pathname;
    }
    let pathMatch = pathname.match(/^\/(\w+)(\/|\b+)/) || [];
    let path = pathMatch[1];
    let prepath;
    if (LangPath.includes(path)) {
      prepath = path;
    } else {
      prepath = T.defaultLangPath(req);
    }
    return "/" + prepath;
  },
  jump(path, openBlank = false) {
    if (!/^https?:\/\//.test(path)) {
      path = T.getPrePath() + "/" + path.replace(/^\/+/, "");
    }
    if (openBlank) {
      window.open(path);
    } else {
      location.href = path;
    }
  },
  cookie: {
    get(name) {
      if (!global.document ?? !name) {
        return "";
      }
      let cookie = global.document?.cookie ?? "";
      let reg = new RegExp("(^|(;\\s*))" + name + "=[^;]+", "gi");
      let value = (cookie.match(reg) ?? [])[0] ?? "";
      value = value.replace(/[\s;]*/gi, "").split("=")[1] ?? "";
      return value;
    },
    set(name, value, param) {
      if (!global.document) {
        return;
      }
      let text = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      param = param || {};
      param.path = param.path || "/";
      param.domain =
        param.domain || "." + location.hostname.split(".").slice(-2).join(".");
      let expires = param.expires;
      if (expires instanceof Date) {
        text += ";expires=" + expires.toGMTString();
      } else if (typeof expires === "number") {
        text += ";expires=" + new Date(expires).toGMTString();
      }
      if (param.path) {
        text += ";path=" + param.path;
      }
      if (param.domain) {
        text += ";domain=" + param.domain;
      }
      if (param.secure) {
        text += ";secure";
      }
      global.domain.cookie = text;
    },
    unset(name, path, domain, secure) {
      this.set(name, "", new Date(0), path, domain, secure);
    },
  },
  //禁止浏览器返回
  preventBrowserBack(callback = () => {}) {
    window.history.pushState({}, "", "#");
    window.onpopstate = () => {
      window.history.pushState({}, "", "#");
      callback();
    };
  },
};
