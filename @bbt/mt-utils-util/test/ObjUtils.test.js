/**
 * Created by lvhaizhen on 2018/5/8.
 */
import {ObjUtils} from "../index";

import { expect } from 'chai';


describe('Object操作',function(){

    it('Object合并操作',function(){
        let obj = ObjUtils.extend({"a":1},{"b":1});

        expect(obj.b).to.be.equals(1);
        expect(obj.a).to.be.equals(1);
    });

    it('对象非空判断',function(){
        expect(ObjUtils.isEmptyObject(null)).to.be.ok;
    });


});