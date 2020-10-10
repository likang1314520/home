/**
 *
 * 获取token操作处理.
 *
 * Created by lvhaizhen on 2018/5/8.
 */

import {Cookie,SyncStorage} from "@bbt/mt-utils-storage";
import {Base64Utils} from "@bbt/mt-utils-util";
import  {UA} from "@bbt/mt-utils-ua";


let ua = new UA(window.navigator.userAgent), // 判断浏览内核
    wx_UserInfo = localStorage.getItem('MT-UserInfo-WX') ? JSON.parse(localStorage.getItem('MT-UserInfo-WX')) : null, // 微信 用户信息
    h5_UserInfo = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null, // H5 用户信息
    mt_UserInfo = Cookie.get('MT_USER_INFO') != "undefined" ? Cookie.get('MT_USER_INFO') : SyncStorage.get('MT_USER_INFO'), // 美囤 用户信息
    bbt_UserInfo = Cookie.get('BBT_USER_INFO') != "undefined" ? Cookie.get('BBT_USER_INFO') : SyncStorage.get('BBT_USER_INFO'), // 孕育 用户信息
    bbt66_UserInfo = Cookie.get('BBT66_USER_INFO') != "undefined" ? Cookie.get('BBT66_USER_INFO') : SyncStorage.get('BBT66_USER_INFO'); //宝宝树66小区 用户信息


let getMeitunAppToken = function () {
    var MT_USER_INFO = Cookie.get('MT_USER_INFO');
    var MT_Array = [];
    if(MT_USER_INFO!='undefined' && MT_USER_INFO!='') {
        MT_Array = MT_USER_INFO.split(',');
        if (MT_Array.length < 4) {
            return null;
        } else {
            let token = Base64Utils.base64Decode(MT_Array[3]);
            const mt_UserInfo_arr = mt_UserInfo.split(",");

            var userinfo;

            if (mt_UserInfo_arr[4]) {
                userinfo = {
                    "token": token,
                    "telephone": Base64Utils.base64Decode(mt_UserInfo_arr[4]),
                    "name": "",
                    "userpic": ""
                };

                localStorage.setItem("userinfo", JSON.stringify(userinfo));
                localStorage.setItem("token", token);

                // 缓存MT_USER_INFO
                SyncStorage.set('MT_USER_INFO', MT_USER_INFO);
            }
            return token;
        }
    }else {
        return null;
    }
};

let get66Token = function () {
    //app type，app version，token，enuserid , device , uuid
    var token = null;
    var MT_Array  = bbt66_UserInfo.split(",");
    if(MT_Array && MT_Array.length > 2 && MT_Array[2]){
        token = base64Decode(MT_Array[2]);
    }

    var userinfo = {
        "token": token,
        "telephone": "",
        "name":"",
        "userpic":""
    };

    localStorage.setItem("userinfo", JSON.stringify(userinfo));
    localStorage.setItem("token", token);
    return token;
}

let token = {
    getToken(){

        let token = null;

        if(mt_UserInfo && mt_UserInfo != "undefined" && mt_UserInfo != "null") {//美囤app
            token = getMeitunAppToken(); // 美囤 app
        }else if(bbt66_UserInfo && bbt66_UserInfo != "undefined" && bbt66_UserInfo != "null"){//66小区app
             token = get66Token();
        }else if(ua.browser.wx && wx_UserInfo && wx_UserInfo.user && wx_UserInfo.user.length > 0){//微信的用户信息
            var vshop = SyncStorage.get('vshop');
            if(vshop && vshop == 1){
                token = localStorage.getItem('vshop-token')
            }else {
                token = wx_UserInfo.user[0].token; // 微信
            }
        }else if(h5_UserInfo){
            token = h5_UserInfo.token; // H5
        }else{
            token = localStorage['token']; // 获取本地缓存
        }
        if (token == '' || token == null || token == 'undefined' || token == undefined){
            token = null;
        }
        return token;
    },

    getEncUserId(){
        var enuserId = '';
        if(mt_UserInfo && mt_UserInfo != "undefined" && mt_UserInfo != "null") {
            /**
             * cookie value为:
             platForm,app version,”babytree",token,telephone,enuserid.这些字段的值分别base64,然后以逗号分割拼接成的字符串.
             */
            var MT_Array = mt_UserInfo.split(",");
            if(MT_Array && MT_Array.length > 5 && MT_Array[5]){
                enuserId = Base64Utils.base64Decode(MT_Array[5]);
            }
        }else if(bbt66_UserInfo && bbt66_UserInfo != "undefined" && bbt66_UserInfo != "null"){
            //app type，app version，token，enuserid , device , uuid
            var MT_Array  = bbt66_UserInfo.split(",");
            if(MT_Array && MT_Array.length > 3 && MT_Array[3]){
                enuserId = Base64Utils.base64Decode(MT_Array[3]);
            }
        }else if(h5_UserInfo){
            enuserId = h5_UserInfo.encUserId; // H5
        }else if(ua.browser.wx && wx_UserInfo && wx_UserInfo.user && wx_UserInfo.user.length > 0){
            enuserId = wx_UserInfo.user[0].encUserId; // 微信
        }
        if (!enuserId && (enuserId == 'undefined' || enuserId == undefined || enuserId == 'null')){
            enuserId = '';
        }

        return enuserId;
    }

};

export default token;
