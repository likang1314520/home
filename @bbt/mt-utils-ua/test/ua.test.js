
import { UA} from '../index.js';

import { expect } from 'chai';


describe('userAgent测试',function(){

    let ua = new UA("Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Mobile Safari/537.36");

    it('安卓 gs5 useragent',function(){
      //  console.log(ua.getOs());
      //  console.log(ua.getBrowser());
        //{android: true,type: 'AM',version: '5.0',tablet: false,phone: true }
        expect(ua.os.android).to.be.ok;
        //{ webkit: true, version: '66.0.3359.139', chrome: true }
        expect(ua.getBrowser().chrome).to.be.ok;

    });


});