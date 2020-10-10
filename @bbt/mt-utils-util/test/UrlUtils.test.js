/**
 * Created by lvhaizhen on 2018/5/8.
 */

import {UrlUtils} from "../index";
import { expect } from 'chai';

describe('url操作',function(){

    let  url = "https://m.meitun.com/pdetails.html?mtoapp=0&mtomeitun=302&sid=18405&pid=08010200640101&promotionId=18405&promotionType=1&topicType=1&url=//m.meitun.com/h5/group/group.html&index=1&referer_url=joingroup&referer_code=joingroupHot";



    it('url解析',function(){

        let obj = UrlUtils.parseUrl(url);

        expect(obj.loc).to.be.equals('https://m.meitun.com/pdetails.html');
        expect(obj.params.mtoapp).to.be.equal('0');
        expect(obj.params.mtomeitun).to.be.equal('302');
        expect(obj.params.sid).to.be.equal('18405');
        expect(obj.params.pid).to.be.equal('08010200640101');
        expect(obj.params.promotionId).to.be.equal('18405');
        expect(obj.params.promotionType).to.be.equal('1');
    });

    it('获取url参数',function(){

        let obj = UrlUtils.getParams(url);
        expect(obj.mtoapp).to.be.equal('0');
        expect(obj.mtomeitun).to.be.equal('302');
        expect(obj.sid).to.be.equal('18405');
        expect(obj.pid).to.be.equal('08010200640101');
        expect(obj.promotionId).to.be.equal('18405');
        expect(obj.promotionType).to.be.equal('1');
    });

    it('url参数合并组合',function(){

        let obj = {
            loc:"https://m.meitun.com/pdetails.html",
            params:{a:1,b:2},
            append:"#aaa"
        }

        let url = UrlUtils.toCusString(obj);
        expect(url).to.be.equal('https://m.meitun.com/pdetails.html?a=1&b=2#aaa');

    });

    it('url追加参数',function(){

        let url = 'https://m.meitun.com/pdetails.html?a=1&b=2#aaa';

        expect(UrlUtils.appendParams(url,{a:1})).to.be.equal('https://m.meitun.com/pdetails.html?a=1&b=2#aaa');
        expect(UrlUtils.appendParams(url,{c:1})).to.be.equal('https://m.meitun.com/pdetails.html?a=1&b=2&c=1#aaa');

    });

    it('url删除参数',function(){
        let url = 'https://m.meitun.com/pdetails.html?a=1&b=2#aaa';

        expect(UrlUtils.removeParams(url,['c'])).to.be.equal('https://m.meitun.com/pdetails.html?a=1&b=2#aaa');
        expect(UrlUtils.removeParams(url,['b'])).to.be.equal('https://m.meitun.com/pdetails.html?a=1#aaa');
    });





});