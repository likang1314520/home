/**
 * 风控项目需要用到，生成唯一的duid.
 */

import {Cookie} from "@bbt/mt-utils-storage";
import {LoadScript} from '@bbt/mt-utils-util';


let duid = {};

duid.getDuID = function(callback){
    var MT_USER_INFO = decodeURIComponent(Cookie.get('MT_USER_INFO'));
    if (MT_USER_INFO !== 'undefined' && MT_USER_INFO !== 'null' && MT_USER_INFO) {
        var mt_array = MT_USER_INFO.split(',');
        var duid = null;
        if(mt_array.length >=7 ){
            duid = mt_array[6];
        } 
        callback(duid);
    }else{
        //独立app里面单独生成duid.
        genDuID(callback);    
    }    
};

//生成duid.
function genDuID(callback){

    LoadScript({url:'//fp.babytree.com/const-id.js'},function(){
        var options = {
            appId: '7a0d42b97002353426c47d18f1cc0fbe', // 唯一标识，必填，风控提供
            server: location.protocol+'//fp.babytree.com/udid/c1' // ConstId 服务接口，可选
        };
        if(typeof _dx!='undefined'){
            _dx.ConstID(options, function (e, id) {
                callback(id);
            });    
        }else{
            callback();
        }
    });
}

export default duid;

