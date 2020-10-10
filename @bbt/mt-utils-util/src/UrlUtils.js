/**
 * URL操作工具模块
 * @module @bbt/mt-utils-util/UrlUtils
 * 
 */
import ObjUtils from './ObjUtils';

let UrlUtils = {
    /**
     * 解析URL
     * @param {String} url 需要解析的url
     * @returns {Object}解析后返回的对象, {"loc": loc,"params": params, "append": append}
     * @kind function
     * @alias module:@bbt/mt-utils-util/UrlUtils
     * @example
     * const url = 'https://m.meitun.com/pdetails.html?mtoapp=0&mtomeitun=302&sid=18405&pid=08010200640101&promotionId=18405&promotionType=1&topicType=1&url=//m.meitun.com/h5/group/group.html&index=1&referer_url=joingroup&referer_code=joingroupHot'
     * UrlUtils.parseUrl(url)
     * //return {'loc':'https://m.meitun.com/pdetails.html',params:{mtoapp:'0',mtomeitun:'302',sid:'18405',pid:'08010200640101',promotionId:'18405','promotionType':'1','topicType':'1',url:'//m.meitun.com/h5/group/group.html',index:'1',referer_url:'joingroup',referer_code:'joingroupHot'},append:{}}
     */
    parseUrl(url) {
        if(!url){
            return null;
        }
        var append="",loc="",_paramsUrl="",params={},
            arr=url.split("#"),
            arrlength=arr.length,
            locationWithParams=arr[0],
            sublength = locationWithParams.indexOf("?"),
            length = locationWithParams.length;
        //考虑存在多个#号的问题.
        if(arrlength>=2){
            for (var i = 1; i <arrlength; i++) {
                append += "#" + arr[i];
            }
        }
        //参数处理.
        if (sublength > 0) {
            //不带参数的URL信息.
            loc = locationWithParams.substring(0, sublength);
            //参数信息.
            _paramsUrl = locationWithParams.substring(sublength + 1, length);
        } else {
            loc = locationWithParams;
        }
        //如果存在参数,把参数存储在params对象中.
        if (_paramsUrl) {
            // 这里的pairs是一个字符串数组
            var pairs = _paramsUrl.split("&");
            for (var i = 0, len = pairs.length; i < len; i++) {
                var sign = pairs[i].indexOf("=");
                // 如果没有找到=号，那么就跳过，跳到下一个字符串（下一个循环）。
                if (sign == -1) {
                    continue;
                }
                var aKey = pairs[i].substring(0, sign);
                var aValue = pairs[i].substring(sign + 1);
                params[aKey] = aValue;
            }
        }
        return {
            "loc": loc,
            "params": params,
            "append": append
        };
    },
    /**
     * 获取URL的qs
     * @param {String} url 
     * @returns {Object} 返回qs 
     * @kind function
     * @alias module:@bbt/mt-utils-util/UrlUtils
     * @example
     * 
     * const url = 'https://m.meitun.com/pdetails.html?mtoapp=0&mtomeitun=302&sid=18405&pid=08010200640101&promotionId=18405&promotionType=1&topicType=1&url=//m.meitun.com/h5/group/group.html&index=1&referer_url=joingroup&referer_code=joingroupHot'
     * UrlUtils.getParams(url)
     * //return {mtoapp:'0',mtomeitun:'302',sid:'18405',pid:'08010200640101',promotionId:'18405','promotionType':'1','topicType':'1',url:'//m.meitun.com/h5/group/group.html',index:'1',referer_url:'joingroup',referer_code:'joingroupHot'}
     */
    getParams(url) {
        var _this=UrlUtils,
            parsedObj = _this.parseUrl(url);
        return parsedObj ? parsedObj.params : null;
    },
    /**
     * 组装URL
     * @kind function
     * @alias module:@bbt/mt-utils-util/UrlUtils
     * @param {Object} obj 类型{"loc": loc,"params": params, "append": append}
     * @example
     * let obj = {loc: "https://m.meitun.com/pdetails.html",params: {a: 1, b: 2},append: "#aaa"}
     * let url = UrlUtils.toCusString(obj);
     * //return 'https://m.meitun.com/pdetails.html?a=1&b=2#aaa'
     */
    toCusString(obj){
        var _this=this;
        var result = [];
        result.push(obj.loc);
        var params = obj.params;
        if (!ObjUtils.isEmptyObject(params)) {
            result.push("?");

            var flag = 0;
            for (var key in params) {
                if (params.hasOwnProperty(key) && params[key]) {
                    if (flag) {
                        result.push("&");
                    }
                    result.push(key + "=" + params[key]);
                    flag++;
                }
            }
        }
        if (obj.append) {
            result.push(obj.append);
        }
        return result.join("");
    },
    /**
     * 往给定url上追加参数
     * @param {String} url 给定的url
     * @param {Object} obj 需要追加的参数键值对
     * @kind function
     * @alias module:@bbt/mt-utils-util/UrlUtils
     * @example
     * let url = 'https://m.meitun.com/pdetails.html?a=1&b=2#aaa';
     * UrlUtils.appendParams(url, {a: 1})
     * //return 'https://m.meitun.com/pdetails.html?a=1&b=2#aaa'
     */
    appendParams(url,obj){
        var _this=this;
        if(ObjUtils.isEmptyObject(obj)){
            return url;
        }
        var parsedObj=_this.parseUrl(url);
        if(!parsedObj){
            return url;
        }
        var params=parsedObj.params;
        //参数合并
        for (var key in obj) {
            if (obj.hasOwnProperty(key) && obj[key]) {
                params[key] = obj[key];
            }
        }
        parsedObj.params = params;
        return _this.toCusString(parsedObj);
    },
    /**
     * 判断给定的URL是否带有query string
     * @kind function
     * @alias module:@bbt/mt-utils-util/UrlUtils
     * @param {String} url 给定的url
     */
    hasParam(url){
        let _this=UrlUtils,
            obj = _this.getParams(url);

        return !ObjUtils.isEmptyObject(obj);

    },
    removeParams(url,arr){
        var _this=this;
        if (!arr || arr.length==0) {
            return url;
        }
        var parsedObj = _this.parseUrl(url);
        if (!parsedObj) {
            return url;
        }
        var params = parsedObj.params;
        //参数合并
        for (var i = 0, len = arr.length; i < len; i++) {
            if(typeof params[arr[i]] != 'undefined' && params[arr[i]]!=null){
                delete params[arr[i]];
            }
        }
        parsedObj.params = params;
        return _this.toCusString(parsedObj);
    },
    /**
     * 查询location.href的queryString
     * @kind function
     * @alias module:@bbt/mt-utils-util/UrlUtils
     * @param name    url 查询参数名
     * @returns {*}   返回url 查询参数值 没有则返回null
     */
    getUrlParamByName(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的 正则表达式 对象
        var r = decodeURI(window.location.search).substr(1).match(reg);  //匹配目标参数
        if (r != null) {
            return r[2];
        } else {
            return null;
        }
    },
    /**
     * 给指定的href增加参数
     * @param {String} href 指定的href
     * @param {String} key 需要增加的参数名称
     * @param {Number|String|Array} value 需要增加的参数值
     * @kind function
     * @alias module:@bbt/mt-utils-util/UrlUtils
     * @example
     * let url = 'https://m.meitun.com/pdetails.html?a=1&b=2#aaa';
     * UrlUtils.appendHref(url, a,1)
     * //return 'https://m.meitun.com/pdetails.html?a=1&b=2#aaa'
     */
    appendHref(href='',key,value){
        if(!value){
            return href;
        }
        return this.appendParams(href,{[`${key}`]:value});
    }
};

export default  UrlUtils;

