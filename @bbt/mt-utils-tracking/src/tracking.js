/**
 * 接入埋点T0003接口.
 */

import {ObjUtils,UrlUtils} from '@bbt/mt-utils-util';
import {Env} from '@bbt/mt-utils-env';
import TrackingUtils from './tracking.utils';
import ClientUtils from './clientUtils';


//埋点发送地址.
const trackPrefix = '//tracking.babytree.com/warlock-collector/service/T0003';


//埋点可能需要发送的字段信息.
const supportKey = {};
supportKey['timestamp'] = 'ts';//时间戳
supportKey['os'] = 'os';//平台信息 1：android 2：iOS 3：windows phone 4：wap 5：pc 6：其他
supportKey['os_version'] = 'ov';//平台的操作系统版本
supportKey['device_brand'] = 'db';//设备品牌，如华为.
supportKey['device_model'] = 'dm';//机型，如M7.
supportKey['device_re'] = 'dr';//设备分辨率	.
supportKey['mac'] = 'mac';//mac地址
supportKey['cookie'] = 'cookie';//cookie信息
supportKey['browser'] = 'br';//浏览器信息.
supportKey['browser_version'] = 'bv';//浏览器版本
supportKey['net_type'] = 'nt';//网络信息.1：wifi 2：4g 3：3g 4：2.5g 5：2g 6：手机自带网络 7：未知网络 8：没有网络（断网） 9：其他
supportKey['version'] = 'pw'; //产品的版本号
supportKey['sdk_version'] = 'sv';//统计sdk的版本号

supportKey['app_id'] = 'px';//产品名词  1：宝宝树孕育app 2：新版小时光app 3：孕育内嵌美囤 4：美囤独立app 5：宝宝树孕育M站 6：宝宝树孕育PC站 7：美囤M站 8：美囤PC站 9：小时光app_繁体版 12：小时光app
supportKey['enc_user_id'] = 'user_id';//用户id
supportKey['bpreg_birthday'] = 'bb';//用户id
supportKey['other_public'] = 'op';//用户id
supportKey['referer_pageid'] = 'rp';//前跳页ID
supportKey['referer_pagevalue'] = 'rf';//前跳页页面值，有容器时传值
supportKey['referer_pagetype'] = 'rt';//前跳页页面类型
supportKey['referer_trackerid'] = 'ri';//来源页唯一访问ID
supportKey['referer_url'] = 'ru';//前跳页URL
supportKey['pagetype'] = 'pt';//当前页页面类型
supportKey['pagevalue'] = 'pv';//当前页页面值 ，有容器时传值
supportKey['pageid'] = 'pi';//当前页ID
supportKey['trackerid'] = 'ti';//当前页唯一访问ID
supportKey['url'] = 'url';//当前页URL
supportKey['item_id'] = 'ii';//栏位ID 存储trackcode
supportKey['item_posh'] = 'ps';//区域内横向顺位，如左数第X个	
supportKey['item_posv'] = 'po';//区域内纵向顺位，如向下第Y个
supportKey['content_id'] = 'ci';//当前展示或点击的内容id或物料id
supportKey['content_source'] = 'cs';//内容来源id，如来自算法或来自运营后台	
supportKey['content_source_type'] = 'cy';//数据来源类型id，如来自算法A或来自算法B	
supportKey['content_type'] = 'ct';//内容类型id	
supportKey['content_extend'] = 'ce';//栏位ID 存储tcode
supportKey['action_event'] = 'an';//⌚事件类型 0：停留 1：曝光 2：点击 3：上拉加载 4：下拉刷新 5：左滑 6：右滑 7：长按 8：启动 9：退出
supportKey['action_params'] = 'ap';//事件参数id，当前行为的具体描述	
supportKey['action_extend'] = 'ae';//href
supportKey['bussiness_event'] = 'be';//href

supportKey['device_unique_id'] = 'du_id';//设备指纹ID	
supportKey['serialize'] = 'sr';//设备指纹ID	
supportKey['xpath'] = 'xpath';//无埋点控件路径信息	
supportKey['xinfo'] = 'xinfo';//无埋点扩展字段	
supportKey['business_extend'] = 'business_extend';//业务参数扩展字段	
supportKey['referer_item_id'] = 'referer_item_id';//来源栏位ID

let Track = {};

class Tracking {
    constructor(){
        var  params = {};

        //获取浏览器信息.
        params[supportKey["browser"]] = ClientUtils.getBrowerInfo().browser;

        let clientInfo = null;
        if(Env.isIn66App()){
            clientInfo = Env.get66UserInfo();
        }else{
            clientInfo = ClientUtils.getGlobalInfo();
        }
        params[supportKey["mac"]] = clientInfo.uuid;
        params[supportKey["cookie"]] = clientInfo.uuid;
        params[supportKey["app_id"]] = clientInfo.app_id || '7';
        params[supportKey["os"]] = clientInfo.os || '4';
        params[supportKey["enc_user_id"]] = clientInfo.userId;
        params[supportKey['version']]= clientInfo.yversion;

         //设置tcode
        params[supportKey["content_extend"]] = UrlUtils.getUrlParamByName("tcode");


        params[supportKey["url"]] = TrackingUtils.getCurrentUrl();
        params[supportKey["pageid"]] = TrackingUtils.getCurrentPageId();
        params[supportKey['pagetype']] = TrackingUtils.getCurrentPageId();


        params[supportKey["referer_pageid"]] = TrackingUtils.getReferer();
        params[supportKey["referer_pagetype"]] = TrackingUtils.getReferer();

        let href = TrackingUtils.getHref();
        if(href){
            params[supportKey["action_extend"]] = href;          
            href = href.replace(/-/g,"$").replace(/&/g,"$");
            params[supportKey["bussiness_event"]] = href;
        }
        params[supportKey["item_id"]] = UrlUtils.getUrlParamByName("referer_code");

        this.params = params;
        this.sendUrl = trackPrefix;
    }


    addParam(key,value){
        let _this = this,_params = _this.params;
        _params[key] = value;
    }

    addParams(params){
        this.params = ObjUtils.extend(this.params,params);
    }

    send(){
        var _this = this;
      var image = new Image(1, 1);
      var _url = _this.sendUrl;
      _this.params[supportKey["timestamp"]] = new Date().getTime() + "";
      var paramsStr = JSON.stringify(_this.params);
      paramsStr = '{"body":{"ja":['+paramsStr +']}}';
      _url+='?json=' + encodeURIComponent(paramsStr);
      image.src = _url;
    }

}



/**
 * 
 * @param {*} logEvent 
 * @param {*} params  url、href、trackerCode
 */
Track.doPublicTracker = function(logEvent,params){

    let tracking = new Tracking();
    

    if(params){
        let trackCode = params.trackerCode;
        let url = params.url;
        let href = params.href;
        let itemPosh = params.item_posh;
        let itemPosv = params.item_posv;
        if(trackCode && trackCode.indexOf('_dsp')>0){
            logEvent = 1;
        }
    
        logEvent && tracking.addParam(supportKey['action_event'],logEvent+'');
    
        url && tracking.addParam(supportKey['pageid'],url);
        url && tracking.addParam(supportKey['pagetype'],url);
        href && tracking.addParam(supportKey['action_extend'],href);
        href && tracking.addParam(supportKey['bussiness_event'],href);
        itemPosh && tracking.addParam(supportKey['item_posh'],itemPosh);
        itemPosv && tracking.addParam(supportKey['item_posv'],itemPosv);
        trackCode && tracking.addParam(supportKey['item_id'],trackCode);
        tracking.send();
    }else{
        logEvent && tracking.addParam(supportKey['action_event'],logEvent+'');
        tracking.send();
    }
    tracking = null;

    
};

Track.doTracker = function(logEvent, trackCode, toHref, orderNo, tCode) {

    let tracking = new Tracking();

    if(trackCode && trackCode.indexOf('_dsp')>0){
        logEvent = 1;
    }

    logEvent && tracking.addParam(supportKey["action_event"],logEvent+'');
    trackCode && tracking.addParam(supportKey["item_id"],trackCode);
    //订单id写入href字段中.
    if(orderNo && toHref){
      if(toHref.indexOf('?')>=0){
        toHref=toHref+'&orderId='+orderNo;
      }else{
        toHref=toHref+'?orderId='+orderNo;
      }
    }
    toHref && tracking.addParam(supportKey["action_extend"],toHref);
    tCode && tracking.addParam(supportKey["content_extend"],tCode);
    tracking.send();
    tracking = null;
};

Track.doOrderTracker = function(trackCode, orderNo){
    Track.doTracker(2, trackCode, '', orderNo);
}


Track.Tracking = Tracking;

export default Track;