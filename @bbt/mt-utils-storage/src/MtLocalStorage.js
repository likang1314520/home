/**
 * Created by lvhaizhen on 2018/5/8.
 */

let MtLocalStorage = {
    set:function(name,value){             // 存储sessionStorage 和 Cookie
        if(!name){
            throw  new Error(('set()参数不足，请指定key和value'));
        }
        localStorage.setItem(name,value);
    },
    get:function(name){       // 先读sessionStorage 后读Cookie
        if(!name){              // 如果没有指定要返回的键值,则返回
            throw  new Error(('get()参数不足，请指定key'));
        }                  // 返回指定键值的值
        var sValue = localStorage.getItem(name);
        return sValue || '';
    },
    remove:function(name){
        if(!name){
            return;
        }
        localStorage.removeItem(name);
    },
    clear:function(){
        localStorage.clear();
    }
};

export default MtLocalStorage;