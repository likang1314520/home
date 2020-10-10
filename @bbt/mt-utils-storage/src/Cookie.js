/**
 *
 * 对cookie操作的工具类.
 *
 * Created by lvhaizhen on 2018/5/8.
 */


let cookieUtils = {};

var getCookiesObj  = function(){
    var cookies = {};
    if(document.cookie){
        var objs = document.cookie.split('; ');
        for(var i in objs){
            var index = objs[i].indexOf('='),
                name = objs[i].substr(0, index),
                value = objs[i].substr(index + 1, objs[i].length);
            cookies[name] = value;
        }
    }
    return cookies;
};

/**
 *
 * @param name  名称
 * @param value 值
 * @param opts  maxAge, path, domain, secure
 * @returns {*}
 */
cookieUtils.set = function (name, value, opts) {
    //opts maxAge, path, domain, secure
    if(name && value){
        var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        //可选参数
        if(opts){
            if(opts.maxAge){
                cookie += '; max-age=' + opts.maxAge;
            }
            if(opts.path){
                cookie += '; path=' + opts.path;
            }
            if(opts.domain){
                cookie += '; domain=' + opts.domain;
            }
            if(opts.secure){
                cookie += '; secure';
            }
        }
        document.cookie = cookie;
        return cookie;
    }else{
        return '';
    }
};

cookieUtils.get = function (name) {
    let value = getCookiesObj()[name];
    return value ? decodeURIComponent(value) : null;
};

cookieUtils.remove = function (name) {
    if(getCookiesObj()[name]){
        document.cookie = name + '=; max-age=0';
    }
};

cookieUtils.clear = function () {
    var cookies = getCookiesObj();
    for(var key in cookies){
        document.cookie = key + '=; max-age=0';
    }
};

cookieUtils.getCookies = function () {
    return getCookiesObj();
};

export default cookieUtils;

