import {UrlUtils} from '@bbt/mt-utils-util';
import domUtils from './domUtils';
import {Env} from '@bbt/mt-utils-env';
import {Cookie} from '@bbt/mt-utils-storage';



let TrackUtils = {
    /*e
     * 获取当前结点的trackercode
     * @param el
     * @private
     */
    getTrackCode(el){
        var track = el.getAttribute("data-track");
        if(!track){
            var parent = domUtils.getParents(el,"[data-track]");
            if(parent.length>0){
                track = parent[0].getAttribute("data-track");
            }
        }
        return track;
    },
    
    getCurrentUrl(){
        return encodeURIComponent(location.href);
    },
    getCurrentPageId(){
        var body = document.getElementsByTagName("body");
        if(body.length>0){
          var code = body[0].getAttribute("data-loadtrack");
          if(code){
            return code;
          }
        }
        return null;
    },
    //优先从当前URL上获取refercode,如果没有，获取refer值
    getReferer(){
        var  referer_url = UrlUtils.getUrlParamByName("referer_url");
        if(referer_url){
            return referer_url;
        }
        return encodeURIComponent(document.referrer);
    },
    //判断link是否为一个可打开的
    isLinkRef(link) {
        if(typeof(link) == 'undefined' || !link || link=="#" || link.indexOf("#")==0 || link=="###" || link.toLowerCase().indexOf("javascript")>=0){
            return false;
        }
        return true;
    },

    //获取href
    getHref(){
        var search = location.search;
        if(search.indexOf("?") == 0){
            search = search.substring(1);
        }

        //针对cms页需要特殊处理
        var _curl = location.href;
        if(_curl.indexOf("m.meitun.com/mcms")>=0){
            var pageid = $("[data-pageid]").attr("data-pageid");
            if(pageid){
                if(search){
                    search=search+"&pageId="+pageid;
                }else{
                    search = "pageId="+pageid;
                }
            }
        }


        if(search){
            search=search+"&track_source=H5";
        }else{
            search="track_source=H5";
        }

        var append66Href = function (href){
            var str="";
            if(Env.isIn66App()){//66app
                str="source66=1&";
            }else{//通过66分享的地址,如果cookie中存在66地址
                var flag = Cookie.get("source");
                if(flag){
                    str="source66=2&"
                }else{
                    //cookie中没有数据,则尝试从URL取
                    flag = UrlUtils.getUrlParamByName("source");
                    var shareuser = UrlUtils.getUrlParamByName("shareuser");

                    if(flag && shareuser){
                        str="source66=2&"
                    }
                }

            }
            return str+href;
        };
        search = append66Href(search);
        return search ;
    }
};
export  default TrackUtils; 
