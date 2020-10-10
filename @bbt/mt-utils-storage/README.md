## 组件说明
   存储组件，包含sessionStorage、localStorage、和Cookie的操作.

   * cookie操作类 Cookie
   * session操作和cookie操作类 SyncStorage
   * localstorage操作类  MtLocalStorage

## 组件引入方式
 ```
 import { Cookie,SyncStorage,MtLocalStorage} from '@bbt/mt-utils-storage';


 ```

## 方法调用说明

### cookie操作类 Cookie
```
//获取所有的cookie值，以map格式返回
Cookie.getCookiesObj();

/**
 *
 * @param name  名称
 * @param value 值
 * @param opts  对象key包含：maxAge, path, domain, secure
 * @returns {*}
 */
Cookie.set(name,value,opts);

//获取cookie值
Cookie.get(name);

//删除值
Cookie.remove(name);

//清除cookie
Cookie.clear();

//获取所有的cookie值，以map格式返回 等同于getCookieObj();
Cookie.getCookies();

```

### session操作和cookie操作类 SyncStorage
```
//同时往sessionstorage和cookie中写入数据.
SyncStorage.set(name,value);

//优先从sessionstorage获取数据，如果没有，则从cookie中获取.
SyncStorage.get(name);

//从sessionstorage和cookie中删除数据.
SyncStorage.remove(name);

//清空sessionstorage和cookie
SyncStorage.clear();

```

### localstorage操作类  MtLocalStorage

```
//localstorage存储值
MtLocalStorage.set(name,value);

//localstorage取值
MtLocalStorage.get(name);

//localstorage删除值
MtLocalStorage.remove(name);

//清空localstorage
MtLocalStorage.clear();

```