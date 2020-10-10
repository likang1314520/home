/**
 *
 * 获取当前用户环境.
 *
 * Created by lvhaizhen on 2018/5/8.
 */
import {Cookie,SyncStorage} from '@bbt/mt-utils-storage';
import {Base64Utils} from "@bbt/mt-utils-util";
import  {UA} from "@bbt/mt-utils-ua";


let env = {
    getAppType(){
        var MT_USER_INFO = Cookie.get('MT_USER_INFO');
        var MT_Array = [];
        var apptype = '1';
        if(MT_USER_INFO && MT_USER_INFO != 'undefined' && MT_USER_INFO != ''){
            MT_Array = MT_USER_INFO.split(',');
            if(MT_Array.length > 0){
                apptype = Base64Utils.base64Decode(MT_Array[0]);
                if(!apptype || apptype == 'undefined'){
                    apptype = '1';
                }
            }
        }
        return apptype;
    },
    getPlatForm(){
        /**
         * cookie value为:
         platForm,app version,”babytree",token,telephone,enuserid.这些字段的值分别base64,然后以逗号分割拼接成的字符串.
         */
        var platForm = 1;
        var isInAPP = this.isInApp();
        var isInbbtAPP = this.isIn66App();
        var ua = new UA(window.navigator.userAgent);

        // 是否是Android
        var isAndroid = ua.os.android;
        // 是否是iOS
        var isIOS = ua.os.ios;
        // 是否是微信
        var isWX = ua.browser.wx;
        // var isfromBbt = localStorage.getItem("isFromBbt");

        // baby tree 嵌入
        // 1 wap, 2 孕育iOS, 3 孕育安卓，4 BTM，5 微信，6 独立iOS, 7 独立安卓,10 孕育微信商城
        if (isInbbtAPP || isInAPP) {
            platForm = this.getAppType();
        }else{ // 浏览器
            if(isWX){ // 微信
                platForm = 5;
            }else{
                platForm = 1;  // WAP
            }
        }
        return platForm;
    },
    /**
     * 判断是否是在宝宝树66小区中  1-是   0-否
     */
    isIn66App(){
        var BBT66_USER_INFO = Cookie.get('BBT66_USER_INFO');
        if (BBT66_USER_INFO && BBT66_USER_INFO !== "undefined" && BBT66_USER_INFO !== "null" ) {
            return 1;
        } else {
            return 0;
        }
    },
    isInApp(){
        var mtUserInfo = Cookie.get("MT_USER_INFO");
        return mtUserInfo !== 'undefined' && mtUserInfo;
    },
    /**
     * 获取真实的app版本号.
     * @returns {*}
     */
    getAppRealVersion(){
        var version = null;
        var MT_USER_INFO = Cookie.get('MT_USER_INFO');
        if(MT_USER_INFO && MT_USER_INFO != 'undefined' && MT_USER_INFO != ''){
            var MT_Array = MT_USER_INFO.split(',');
            if(MT_Array && MT_Array.length >= 2 && MT_Array[1] != null && MT_Array[1] != ''){
                version =  Base64Utils.base64Decode(MT_Array[1]);
            }
        }
        return version;
    },

    /**
     * 获取数字类型的app版本号
     * @returns {*}
     */
    getAppVersion(){
        var version = this.getAppRealVersion();
        if(version){
            return parseInt(version.replace(/\./g, ''));
        }
        return null;
    },
    /***
     * 判断来源：区分66和美囤
     * return 12：表示是在66APP中或者66分享出去时链接的source=1来判断
     */
    getOrderSource(){
        var orderSource = null;
        var source = SyncStorage.get('source');
        if((isInBBT66App() && isInBBT66App() == 1) || (source && source == 1)){
            orderSource = 12;
        }
        return orderSource;
    },

    get66UserInfo(){
        if (!this.isIn66App()) {
            return null;
        }
        //MQ==,NC4zLjM=,MnA5aHYzUUhMNjdkd3Nuc21sM0ZnTXhzRi9nYUtmV20xcUxaZnRZYTV4bz0=,dTE1NzAyNjAzNTg=,MjhCMTFFM0EtM0U1RS00QzMzLUJBNjgtMjhGNjJGMEFBNkQ5,QkQxOTIyQjctMjQ3OC00RjkxLUE5RjQtMTdCRkY1NTI5NUI5;
        var bbt66UserInfo = Cookie.get("BBT66_USER_INFO");

        var arr = bbt66UserInfo.split(",");
        if (arr.length >= 6) {
            var userId = Base64Utils.base64Decode(arr[3]);
            var uuid = Base64Utils.base64Decode(arr[5]);
            return {
                "uuid": uuid,
                "cookieId": uuid,
                "sourceType": 'm',
                "userId": userId
            }
        }
        return null;
    },


    getMtClientInfo(){
        if (!this.isInApp()) {
            return null;
        }

        var mtClientInfo = Cookie.get("MT_CLIENT_INFO");
        if (!mtClientInfo) {
            return null;
        }

        try {
            mtClientInfo = decodeURIComponent(mtClientInfo);
            return JSON.parse(mtClientInfo);
        } catch (e) {
        }

        return null;
    }

};


export default  env;

