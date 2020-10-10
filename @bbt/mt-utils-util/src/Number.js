/**
 * 数字操作工具模块
 * @module @bbt/mt-utils-util/NumUtils
 */

/**
 * 数字转成字符串
 * @kind function
 * @param {Number} num 
 * @returns {String}
 * @alias module:@bbt/mt-utils-util/NumUtils
 * @example
 * NumUtil.num2str(654.560) === '654.56'
 */
const num2str = (num) => {
  if (typeof (num) == 'number' && Math.abs(num) > (Number.MAX_SAFE_INTEGER || 9007199254740991)) {
    throw new Error('[Util.number Exception]: Input number out of range.');
  } else {
    var numStr = (num + '').replace(/^\s+|\s+$/g, '') || '0';

    if (!/^[+-]?(?:[\da-f]+\.?|[\da-f]*\.[\da-f]+)$/i.test(numStr)) {
      throw new Error('[Util.number Exception]: Invalid input number.');
    } else {
      return numStr;
    }
  }
}

/**
 * 字符串首部占位填充 
 * @kind function
 * @param {Number} number 要填充的字符串
 * @param {Number} len 填充后的长度
 * @param {String} char 占位的字符，默认为'0'
 * @alias module:@bbt/mt-utils-util/NumUtils
 * @example
 * NumUtil.fillNumber(34,3)==='034'
 * NumUtil.fillNumber(34,3,'@')==='@34'
 */
const fillNumber = (number, len = 2,char='0') => {
  number = num2str(number);
  while (number.length < len) {
    number = char + number;
  }
  return number;
};

export default {
  fillNumber,
  num2str
}