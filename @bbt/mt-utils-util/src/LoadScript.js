/**
 * @module @bbt/mt-utils-util/LoadScript
 */


const loadedUrls = {};

/**
 * 动态加载外部JS脚本
 * @param {Object} opts 
 * @param {Function} callback 
 * @alias module:@bbt/mt-utils-util/LoadScript
 */
function loadScript(opts, callback) {
  if (!loadedUrls[opts.url]) {
    var script = document.createElement('script');
    script.charset = opts.charset || 'utf-8';
    script.src = opts.url;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
    script.onload = function () {
      script.onload = script.onreadystatechange = script.onerror = null;
      script = null;
      loadedUrls[opts.url] = true;
      callback();
    };
    script.onreadystatechange = function () {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        loadedUrls[opts.url] = true;
        callback();
      }
    };
  } else {
    callback();
  }
}

export default loadScript;