import {
  NumUtil
} from "../index";
import {
  expect
} from 'chai';

describe('NumberUtil::num2str', function () {

  it('number2str:16进制', function () {

    let num = 0x291;

    expect(NumUtil.num2str(num)).to.be.equals('657');

  });

  it('number2str:10进制', function () {

    let num = 657;

    expect(NumUtil.num2str(num)).to.be.equals('657');

  });

  it('number2str:小数', function () {

    let num = 657.450;

    expect(NumUtil.num2str(num)).to.be.equals('657.45');

  });

});

describe('NumberUtil::fillNumber', function () {

  it('fillNumber:16进制', function () {

    let num = 0x291;

    expect(NumUtil.fillNumber(num,5)).to.be.equals('00657');

  });

  it('fillNumber:10进制,填充字符串@', function () {

    let num = 657;

    expect(NumUtil.fillNumber(num, 5, '@')).to.be.equals('@@657');

  });


});