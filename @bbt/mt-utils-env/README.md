## 组件说明
   获取当前环境、token等信息.

  * 环境信息 Env
  * 获取token  Token

## 组件引入方式
 ```
 import {Env} from '@bbt/mt-utils-env';
 import {Token} from '@bbt/mt-utils-env';


 ```

## 方法调用说明

### 环境信息 Env

```
//获取appType
Env.getAppType();

//获取platform信息.
Env.getPlatForm();

//判断是否在宝宝树66小区 1-是 0-否
Env.isInBBT66App();

//获取真实的app版本号.
Env.getAppRealVersion();

//获取数字类型的app版本号
Env.getAppVersion();

 /***
  * 判断来源：区分66和美囤
  * return 12：表示是在66APP中或者66分享出去时链接的source=1来判断
 */
 Env.getOrderSource();


```

### token获取 Token

```
//获取各种环境下的token信息
 Token.getToken();

 //获取用户id.
 Token.getEncUserId();

```

