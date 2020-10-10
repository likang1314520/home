## 组件说明
   埋点发送工具类.

  * 基础对象，可以自定义发送任意字段 Track
  * 埋点发送工具类  TrackUtils
  * 埋点增加点击事件 TrackLisener

## 组件引入方式
 ```
 import {Track} from '@bbt/mt-utils-tracking';
 import {TrackLisener} from '@bbt/mt-utils-tracking';


 ```

## 方法调用说明

### 基础对象，可以自定义发送任意字段 Track

```
//初始化埋点对象.
let track = new Track.Tracking();

//track增加属性
track.addParam(key,value);

 //批量增加属性
 track.addParams(params);

 //发送track请求.
 track.send();

```

### 埋点发送工具类  TrackUtils

```
//发送埋点，允许自定义事件类型和参数.
Track.doPublicTracker(logEvent,params);

//发送埋点，允许自定义事件类型、trackCode、href、orderNo、tcode.
Track.doTracker(logEvent, trackCode, toHref, orderNo, tCode)

//发送埋点，允许自定义事件类型、trackCode、orderNo.
Track.doOrderTracker(trackCode,orderNo)
```

### 埋点增加点击事件 TrackLisener

```
//给页面增加click埋点事件.
TrackLisener.addClickListenner();


```
