## Modules

<dl>
<dt><a href="#module_@bbt/mt-utils-util/Base64Utils">@bbt/mt-utils-util/Base64Utils</a></dt>
<dd><p>Base64操作模块</p>
</dd>
<dt><a href="#module_@bbt/mt-utils-util/LoadScript">@bbt/mt-utils-util/LoadScript</a></dt>
<dd></dd>
<dt><a href="#module_@bbt/mt-utils-util/NumUtils">@bbt/mt-utils-util/NumUtils</a></dt>
<dd><p>数字操作工具模块</p>
</dd>
<dt><a href="#module_@bbt/mt-utils-util/ObjUtils">@bbt/mt-utils-util/ObjUtils</a></dt>
<dd><p>数据操作工具模块</p>
</dd>
<dt><a href="#module_@bbt/mt-utils-util/UrlUtils">@bbt/mt-utils-util/UrlUtils</a></dt>
<dd><p>URL操作工具模块</p>
</dd>
</dl>

<a name="module_@bbt/mt-utils-util/Base64Utils"></a>

## @bbt/mt-utils-util/Base64Utils
Base64操作模块

<a name="exp_module_@bbt/mt-utils-util/Base64Utils--base64Decode"></a>

### base64Decode(str) ⇒ <code>String</code> ⏏
Base64解码

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

**Example**  
```js
Base64Utils.base64Decode("Uy5ILkkuRS5MLkQ=") === 'S.H.I.E.L.D'
```
<a name="module_@bbt/mt-utils-util/LoadScript"></a>

## @bbt/mt-utils-util/LoadScript
<a name="exp_module_@bbt/mt-utils-util/LoadScript--loadScript"></a>

### loadScript(opts, callback) ⏏
动态加载外部JS脚本

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| opts | <code>Object</code> | 
| callback | <code>function</code> | 

<a name="module_@bbt/mt-utils-util/NumUtils"></a>

## @bbt/mt-utils-util/NumUtils
数字操作工具模块


* [@bbt/mt-utils-util/NumUtils](#module_@bbt/mt-utils-util/NumUtils)
    * [num2str(num)](#exp_module_@bbt/mt-utils-util/NumUtils--num2str) ⇒ <code>String</code> ⏏
    * [fillNumber(number, len, char)](#exp_module_@bbt/mt-utils-util/NumUtils--fillNumber) ⏏

<a name="exp_module_@bbt/mt-utils-util/NumUtils--num2str"></a>

### num2str(num) ⇒ <code>String</code> ⏏
数字转成字符串

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| num | <code>Number</code> | 

**Example**  
```js
NumUtil.num2str(654.560) === '654.56'
```
<a name="exp_module_@bbt/mt-utils-util/NumUtils--fillNumber"></a>

### fillNumber(number, len, char) ⏏
字符串首部占位填充

**Kind**: Exported function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| number | <code>Number</code> |  | 要填充的字符串 |
| len | <code>Number</code> | <code>2</code> | 填充后的长度 |
| char | <code>String</code> | <code>0</code> | 占位的字符，默认为'0' |

**Example**  
```js
NumUtil.fillNumber(34,3)==='034'
NumUtil.fillNumber(34,3,'@')==='@34'
```
<a name="module_@bbt/mt-utils-util/ObjUtils"></a>

## @bbt/mt-utils-util/ObjUtils
数据操作工具模块


* [@bbt/mt-utils-util/ObjUtils](#module_@bbt/mt-utils-util/ObjUtils)
    * [ObjUtils.extend(destination)](#exp_module_@bbt/mt-utils-util/ObjUtils--ObjUtils.extend) ⏏
    * [ObjUtils.isEmptyObject(obj)](#exp_module_@bbt/mt-utils-util/ObjUtils--ObjUtils.isEmptyObject) ⇒ <code>Boolean</code> ⏏

<a name="exp_module_@bbt/mt-utils-util/ObjUtils--ObjUtils.extend"></a>

### ObjUtils.extend(destination) ⏏
对象合并,建议用Object.assign来替代

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| destination | <code>Object</code> | 

<a name="exp_module_@bbt/mt-utils-util/ObjUtils--ObjUtils.isEmptyObject"></a>

### ObjUtils.isEmptyObject(obj) ⇒ <code>Boolean</code> ⏏
判断给定的对象是否为空对象

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | 给定的对象 |

<a name="module_@bbt/mt-utils-util/UrlUtils"></a>

## @bbt/mt-utils-util/UrlUtils
URL操作工具模块


* [@bbt/mt-utils-util/UrlUtils](#module_@bbt/mt-utils-util/UrlUtils)
    * [parseUrl(url)](#exp_module_@bbt/mt-utils-util/UrlUtils--parseUrl) ⇒ <code>Object</code> ⏏
    * [getParams(url)](#exp_module_@bbt/mt-utils-util/UrlUtils--getParams) ⇒ <code>Object</code> ⏏
    * [toCusString(obj)](#exp_module_@bbt/mt-utils-util/UrlUtils--toCusString) ⏏
    * [appendParams(url, obj)](#exp_module_@bbt/mt-utils-util/UrlUtils--appendParams) ⏏
    * [hasParam(url)](#exp_module_@bbt/mt-utils-util/UrlUtils--hasParam) ⏏
    * [getUrlParamByName(name)](#exp_module_@bbt/mt-utils-util/UrlUtils--getUrlParamByName) ⇒ <code>\*</code> ⏏
    * [appendHref(href, key, value)](#exp_module_@bbt/mt-utils-util/UrlUtils--appendHref) ⏏

<a name="exp_module_@bbt/mt-utils-util/UrlUtils--parseUrl"></a>

### parseUrl(url) ⇒ <code>Object</code> ⏏
解析URL

**Kind**: Exported function  
**Returns**: <code>Object</code> - 解析后返回的对象, {"loc": loc,"params": params, "append": append}  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | 需要解析的url |

**Example**  
```js
const url = 'https://m.meitun.com/pdetails.html?mtoapp=0&mtomeitun=302&sid=18405&pid=08010200640101&promotionId=18405&promotionType=1&topicType=1&url=//m.meitun.com/h5/group/group.html&index=1&referer_url=joingroup&referer_code=joingroupHot'
UrlUtils.parseUrl(url)
//return {'loc':'https://m.meitun.com/pdetails.html',params:{mtoapp:'0',mtomeitun:'302',sid:'18405',pid:'08010200640101',promotionId:'18405','promotionType':'1','topicType':'1',url:'//m.meitun.com/h5/group/group.html',index:'1',referer_url:'joingroup',referer_code:'joingroupHot'},append:{}}
```
<a name="exp_module_@bbt/mt-utils-util/UrlUtils--getParams"></a>

### getParams(url) ⇒ <code>Object</code> ⏏
获取URL的qs

**Kind**: Exported function  
**Returns**: <code>Object</code> - 返回qs  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 

**Example**  
```js
const url = 'https://m.meitun.com/pdetails.html?mtoapp=0&mtomeitun=302&sid=18405&pid=08010200640101&promotionId=18405&promotionType=1&topicType=1&url=//m.meitun.com/h5/group/group.html&index=1&referer_url=joingroup&referer_code=joingroupHot'
UrlUtils.getParams(url)
//return {mtoapp:'0',mtomeitun:'302',sid:'18405',pid:'08010200640101',promotionId:'18405','promotionType':'1','topicType':'1',url:'//m.meitun.com/h5/group/group.html',index:'1',referer_url:'joingroup',referer_code:'joingroupHot'}
```
<a name="exp_module_@bbt/mt-utils-util/UrlUtils--toCusString"></a>

### toCusString(obj) ⏏
组装URL

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | 类型{"loc": loc,"params": params, "append": append} |

**Example**  
```js
let obj = {loc: "https://m.meitun.com/pdetails.html",params: {a: 1, b: 2},append: "#aaa"}
let url = UrlUtils.toCusString(obj);
//return 'https://m.meitun.com/pdetails.html?a=1&b=2#aaa'
```
<a name="exp_module_@bbt/mt-utils-util/UrlUtils--appendParams"></a>

### appendParams(url, obj) ⏏
往给定url上追加参数

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | 给定的url |
| obj | <code>Object</code> | 需要追加的参数键值对 |

**Example**  
```js
let url = 'https://m.meitun.com/pdetails.html?a=1&b=2#aaa';
UrlUtils.appendParams(url, {a: 1})
//return 'https://m.meitun.com/pdetails.html?a=1&b=2#aaa'
```
<a name="exp_module_@bbt/mt-utils-util/UrlUtils--hasParam"></a>

### hasParam(url) ⏏
判断给定的URL是否带有query string

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | 给定的url |

<a name="exp_module_@bbt/mt-utils-util/UrlUtils--getUrlParamByName"></a>

### getUrlParamByName(name) ⇒ <code>\*</code> ⏏
查询location.href的queryString

**Kind**: Exported function  
**Returns**: <code>\*</code> - 返回url 查询参数值 没有则返回null  

| Param | Description |
| --- | --- |
| name | url 查询参数名 |

<a name="exp_module_@bbt/mt-utils-util/UrlUtils--appendHref"></a>

### appendHref(href, key, value) ⏏
给指定的href增加参数

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| href | <code>String</code> | 指定的href |
| key | <code>String</code> | 需要增加的参数名称 |
| value | <code>Number</code> \| <code>String</code> \| <code>Array</code> | 需要增加的参数值 |

**Example**  
```js
let url = 'https://m.meitun.com/pdetails.html?a=1&b=2#aaa';
UrlUtils.appendHref(url, a,1)
//return 'https://m.meitun.com/pdetails.html?a=1&b=2#aaa'
```
