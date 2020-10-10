/**
 * 
 * 同时存储sessionStorage 和 Cookie 的方法
 *
 * Created by lvhaizhen on 2018/5/8.
 */

import {default as Cookie} from "./Cookie";

let SyncStorage = {
    set:function(name,value){             // 存储sessionStorage 和 Cookie
        if(!name){
            throw  new Error(('set()参数不足，请指定key和value'));
        }
        sessionStorage.setItem(name,value);
        Cookie.set(name,value,{
            path:'/'
        });
    },
    get:function(name){       // 先读sessionStorage 后读Cookie
        if(!name){              // 如果没有指定要返回的键值,则返回
            throw  new Error(('get()参数不足，请指定key'));
        }                  // 返回指定键值的值
        var sValue = sessionStorage.getItem(name),
            cValue = Cookie.get(name);
        sValue = sValue?sValue:'';
        cValue = (cValue && cValue !='undefined')?cValue:'';
        return sValue?sValue:cValue?cValue:'' ;
    },
    remove:function(name){
        if(!name){
            return;
        }
        sessionStorage.removeItem(name);

        // 删除Cookie
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        document.cookie=  name+ "="+Cookie.get(name)+";expires="+exp.toGMTString()+"; path=/";
    },
    clear:function(){
        sessionStorage.clear();
        Cookie.clear();
    }
};

export  default  SyncStorage;