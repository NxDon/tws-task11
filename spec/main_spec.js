"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;

chai.use(sinonChai);


var index = require("../index.js");

//
// describe("测试isLegit函数", function(){
//     sinon.spy(console, 'log');
//
//     it("测试输入学生信息是否正确", function(){
//         var input = "段宇,12,2,数学：99,语文：88,英语：88,编程：99";
//         var result = index.isLeigitInfo(input);
//
//         expect(result).to.equal(true);
//     });
//
// });
    describe("main函数测试", function(){
        sinon.spy(console, 'log');

        it("3退出", function(){
            index.main();
            let result = console.log.calledWith("quitting");
            expect(result).to.equal(true);
        });

    });