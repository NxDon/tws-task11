"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;

chai.use(sinonChai);


var index = require("../index.js");


describe("测试函数", function () {
    it("测试输入学生信息是否正确", function () {
        var input = "段宇,12,22,23,42,124,34";
        var result = index.isLegitInfo(input);
        expect(result).to.equal(true);
    });

    it("测试添加学生信息到列表", function () {
        let input = "段宇,12,2,数学：99,语文：88,英语：88,编程：99";
        let infoList = [];
        let result = index.addStudent(input, infoList);

        //设置deep标记，然后使用equal和property断言。该标记可以让其后的断言不是比较对象本身，而是递归比较对象的键值对
        expect(infoList).to.deep.equal([{
            name: '段宇',
            id: 12,
            className: 2,
            math: 99,
            chinese: 88,
            english: 88,
            programming: 99
        }])
    });
});

describe("printGradeList子函数测试", function () {
    let listInfo = [{
        name: '段宇',
        id: 1,
        className: 2,
        math: 88,
        chinese: 88,
        english: 88,
        programming: 88
    },{
        name: '段天',
        id: 2,
        className: 2,
        math: 88,
        chinese: 88,
        english: 88,
        programming: 88
    },{
        name: '段昊',
        id: 3,
        className: 2,
        math: 100,
        chinese: 100,
        english: 100,
        programming: 100
    }];

    it("makeGradeList打印出学生成绩", function () {
        let makeGradeList = index.makeGradeList;
        let studentsIDs = '1,2';
        let results = `
        成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================
段宇|88|88|88|88|88|352
段天|88|88|88|88|88|352
========================
全班总分平均数：92
全班总分中位数：88`;
        sinon.spy(console, 'log');
        makeGradeList(studentsIDs, listInfo);
        expect(console.log).to.be.calledWith(results);
    });

    it("getStudentsGrade返回由学生成绩对象构成的数组", function () {
        let result = index.getStudentsGrade('1,2', listInfo);
        expect(result).to.be.deep.equal([{
            name: "段宇", math: 88, chinese: 88, english: 88, programming: 88, mean: 88, total: 352
        }, {
            name: "段天", math: 88, chinese: 88, english: 88, programming: 88, mean: 88, total: 352
        }])
    })

    it("getMeanAndMedian应该返回一个数组包含两个值，平均数和中位数", function () {
        let result = index.getMeanAndMedian(listInfo);
        expect(result).to.be.deep.equal([92, 88])
    });

    it("formatToString应该调用console.log函数，打印results", function () {

    });

    it("getMedian应该返回数组中位数", function () {
        let arr1 = [1, 2, 3, 4, 5];
        let arr2 = [1, 2, 3, 4, 5, 6];
        expect(index.getMedian(arr1)).to.be.equal(3);
        expect(index.getMedian(arr2)).to.be.equal(3.5);
    })

})


