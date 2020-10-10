/**
 *
 * 客户端的相关操作
 * Created by lizeqiang on 2018/5/8.
 */
import {Env,Token} from '@bbt/mt-utils-env';
import { Cookie} from '@bbt/mt-utils-storage';



let ClientUtils = {
    //获取浏览器相关的信息.
    getBrowerInfo(){
        let browserColorDeep = window.screen ? screen.colorDepth + "-bit" : "-",
            isJavaAddon = navigator.javaEnabled() ? 1 : 0,
            browser = navigator.userAgent ? navigator.userAgent.replace(/,/g, "/") : '-';

        function _getUserDevice() {
            let devices = {
                iphone: /^mozilla(.*)iphone(.*)mobile/,
                ipad: /^mozilla(.*)ipad/,
                android: /^mozilla(.*)linux(.*)android/,
                browser: /(^mozilla(.*)(msie|firefox|chrome|presto|safari))|(opera)/
            };

            let br = navigator.userAgent.toLowerCase();
            for (let key in devices) {
                if (devices.hasOwnProperty(key)) {
                    if (br.match(devices[key])) {
                        return key;
                    }
                }
            }
            return null;
        }

        let device = _getUserDevice() || '-';
        return {
            "browser": browser,
            "colorDepth": browserColorDeep,
            "javaEnabled": isJavaAddon,
            "device": device
        }
    },
    getGlobalInfo(){
        let _this = this;
        let uuid = '';
        let sourceType = '';
        let isInApp = Env.isInApp();
        let clientVersion = '';
        let pid = '';
        let os = '';

        if (isInApp) {
            let clientInfo = Env.getMtClientInfo();
            if (clientInfo) {
                var appType = clientInfo.apptype;
                if(appType == 2){//孕育内嵌美囤IOS
                    sourceType = 'btm-ios';
                    pid = '3';
                    os = '2';
                }else if(appType == 3){//孕育内嵌美囤安卓
                    sourceType='btm-android';
                    pid = '3';
                    os = '1';
                }else if(appType == 6){//美囤独立app ios
                    sourceType='ios';
                    pid = '4';
                    os = '2';
                }else if(appType == 7){//美囤独立app 安卓
                    sourceType='android';
                    pid = '4';
                    os = '1';
                }

                uuid = clientInfo.devicekey;
                cookieId = clientInfo.devicekey;
                clientVersion = clientInfo.clientVersion;

            }

        } else {
            var cookieId = Cookie.get("cookieId");
            if (!cookieId) {
                cookieId = _this.uuid(10, 16);
                Cookie.set("cookieId", cookieId, 24 * 30);
            }
            sourceType = 'm';
            uuid = cookieId;
            pid = '7';
            os = '4';
        }
        return {
            "uuid": uuid,
            "cookieId": uuid,
            "sourceType": sourceType,
            "yversion":clientVersion,
            "userId": Token.getEncUserId(),
            "app_id":pid,
            "os":os
        }

    },
    
    //生成uuid
    uuid(len, radix) {
    // Private array of chars to use
        let CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let chars = CHARS, uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
            // rfc4122, version 4 form
            var r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }
};

export default ClientUtils;