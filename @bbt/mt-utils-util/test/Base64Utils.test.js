/**
 * Created by lvhaizhen on 2018/5/8.
 */
import {Base64Utils} from "../index";
import { expect } from 'chai';

describe('base64解码',function(){

    it('base64解码',function(){

        let str = "Mk9ib0lrQ0tKK3hDSCtpY3U1ZjBvb3NkbUxpY1NFVGo5d1NzcldhazY2az0=";

        expect(Base64Utils.base64Decode(str)).to.be.equals('2OboIkCKJ+xCH+icu5f0oosdmLicSETj9wSsrWak66k=');

    });

});