/**
 *
 * 对dom进行简单操作.
 *
 * Created by lvhaizhen on 2018/5/15.
 */

import Sizzle from 'sizzle';

let domUtils = {

    /**
     * 批量获取某结点下的元素信息.
     * @param parentDom  父结点
     * @param attr  属性名称.
     */
    getDoms(selector){
        return Sizzle(selector);
    },

    /**
     * 获取结点的上级元素.
     * @param dom
     * @param seletor
     */
    getParent(elem){

        if(elem instanceof Sizzle){
            elem = elem[0];
        }

        let parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;

    },

    /**
     * 获取结点的祖先元素.
     */
    getParents(elem,seletor){
        let matched = [];

        if(elem instanceof Sizzle){
            elem = elem[0];
        }

        let cur = elem.parentNode;

        while ( cur && cur.nodeType !== 9 && ( cur.nodeType !== 1 || !Sizzle.matchesSelector(cur,seletor)) ) {
            if ( cur.nodeType === 1 ) {
                matched.push( cur );
            }
            cur = cur.parentNode;
        }
        return matched;
    },

    is(elem,selector){
        return Sizzle.matchesSelector(elem,selector);
    }

};

export default  domUtils;
