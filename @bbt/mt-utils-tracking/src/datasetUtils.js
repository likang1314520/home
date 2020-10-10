/**
 *
 * dataset操作工具类.
 *
 * Created by lvhaizhen on 2018/5/15.
 */

import domUtils from './domUtils';

let datasetUtils = {

    /**
     * 获取所有的dataset集合,包含子结点，父结点，祖宗结点.
     * @param ele
     */
    getAllDatasetsWithCms(ele){
        let obj = {};
        let currentDataset = ele.dataset;
        let areaDataset = null;
        let moduleDataset = null;
        //获取区域结点的dataset

        let area = domUtils.parents(ele,"[areaFlag]");
        if(area.length>0){
            areaDataset = area[0].dataset;
        }
        let module = domUtils.parents(ele,"[data-moduleId]");
        if(module.length > 0){
            moduleDataset = module[0].dataset;
        }

        if(moduleDataset){
            for (let m in moduleDataset) {
                if (moduleDataset.hasOwnProperty(m)) {
                    obj[m] = moduleDataset[m];
                }
            }
        }

        if(areaDataset){
            for (let a in areaDataset) {
                if (areaDataset.hasOwnProperty(a)) {
                    obj[a] = areaDataset[a];
                }
            }
        }
        if(currentDataset){
            for (let c in currentDataset) {
                if (currentDataset.hasOwnProperty(c)) {
                    obj[c] = currentDataset[c];
                }
            }
        }

        let pageidObj = domUtils.getDoms("[data-pageid]");
        //获取页面的pageid和pagecode

        if(pageidObj.length > 0){
            let pageDom = pageidObj[0];
            let pagecode = pageDom.getAttribute("data-pageid");
            if(pagecode){
                obj["pagecode"] = pagecode;
            }

            let pageId = pageDom.getAttribute("data-page");
            if(pageId){
                obj["pageId"] = pageId;
                obj["activityID"] = pageId;
            }
        }




        for(let key in obj){
            if (obj.hasOwnProperty(key)) {
                if(key == "track"){
                    delete obj[key];
                    continue;
                }
                if(key=='promotionid' || key=='promotiontype'){
                    delete obj[key];
                    continue;
                }
                let item = key;
                if(key == 'templateid'){
                    item = 'templateId';
                }else if(key == 'moduleid'){
                    item = 'moduleId';
                }else if(key == 'indexid'){
                    item='indexId';
                }
                obj[item] = obj[key];
                if(item!=key){
                    delete obj[key];
                }
            }
        }
        return obj;

    }

};

export default datasetUtils;
