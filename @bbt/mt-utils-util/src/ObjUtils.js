/**
 * 数据操作工具模块
 * @module @bbt/mt-utils-util/ObjUtils
 */


let ObjUtils = {};

let slice = Array.prototype.slice;

let each = function(obj, iterator, context) {
    // 不处理空值
    if (obj == null)
        return;
    obj.forEach(iterator, context);
};


/**
 * 对象合并,建议用Object.assign来替代
 * @param {Object} destination 
 * @kind function
 * @alias module:@bbt/mt-utils-util/ObjUtils
 */
ObjUtils.extend = function (destination) {
    each(slice.call(arguments, 1), function (source) {
        // 将对象中的全部属性复制或覆盖到obj对象
        for (var prop in source) {
            if(source.hasOwnProperty(prop)){
                destination[prop] = source[prop];
            }
        }
    });
    return destination;
};

/**
 * 判断给定的对象是否为空对象
 * @param {Object} obj 给定的对象
 * @returns {Boolean}
 * @kind function
 * @alias module:@bbt/mt-utils-util/ObjUtils
 */
ObjUtils.isEmptyObject  = function(obj){
    if (!obj) {
        return true;
    }
    // for (var key in obj) {
    //     return 0;
    // }

    if(Object.keys(obj).length == 0){
        return true;
    }
    return false;
};


(function () {
    const isSomething = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Array', 'Boolean', 'Object'];
    for (let i in isSomething) {
        (function (j) {
            let item = isSomething[j];
            ObjUtils['is' + item] = function (obj) {
                return Object.prototype.toString.call(obj) === '[object ' + item + ']';
            }
        })(i);
    }
})();


export  default ObjUtils;
