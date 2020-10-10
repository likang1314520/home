import {UrlUtils} from '@bbt/mt-utils-util';
import TrackUtils from './tracking.utils';
import Track from './tracking';
import datasetUtils from './datasetUtils';
import domUtils from './domUtils';


function lisennerHandler(_this){
    let href = _this.getAttribute('href') || '';

    let linkFlag = TrackUtils.isLinkRef(href);

    if (!linkFlag) {
        href = '';
    }

    let trackCode = TrackUtils.getTrackCode(_this);
    let spId = UrlUtils.getUrlParamByName("spId");

    href = UrlUtils.appendHref(href,'supplier_id',spId);
    let refererUrl = decodeURIComponent(TrackUtils.getCurrentUrl());

    let obj = null;
    if (refererUrl == 'cms') {
        obj = datasetUtils.getAllDatasetsWithCms(_this);
    }

    href = UrlUtils.appendHref(href,'referer_url',refererUrl);
    href = UrlUtils.appendHref(href,'referer_code',trackCode);


    if (linkFlag) {
        if (obj) {
            href = UrlUtils.appendParams(href, obj);
        }
        _this.setAttribute("href", href);
    } else {
        if (obj) {
            var arr = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    arr.push(key + "=" + obj[key]);
                }
            }
            href = arr.join("&");
        }
        Track.doTracker(2, trackCode, href);
    }
}

let TrackLisener = {
    /**
     * 给页面添加点击事件监听.
     */
    addClickListenner(){
        document.addEventListener('click',function(event){
            event = event || window.event;
            let _this = event.target || event.srcElement;

            if(domUtils.is(_this,"a,area,[data-track]")){
                lisennerHandler(_this);
            }
        });
    }
};

export  default TrackLisener;
