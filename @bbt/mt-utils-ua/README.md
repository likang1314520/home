## 组件说明
   对userAgent进行解析，得到对应的浏览器信息，手机设备，浏览器版本号等信息

## 组件引入方式
 import { UA} from '@bbt/mt-utils-ua';

## 方法调用说明
```
 let ua = new UA("Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Mobile Safari/537.36");

 console.log(ua.getOs());//{android: true,type: 'AM',version: '5.0',tablet: false,phone: true }

 console.log(ua.getBrowser());//{ webkit: true, version: '66.0.3359.139', chrome: true }

```
