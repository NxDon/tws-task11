"use strict";
var	query = require('cli-interact');

function addStudent() {

}

function makeGradeList() {

}

function isLeigitInfo(studentInfo) {
    let reg = new RegExp(/^[\u4e00-\u9fa5]+,\d+,\d+,数学：\d+,语文：\d+,英语：\d+,编程：\d+$/)
    return reg.test(studentInfo);
}

function main() {

    while (true){
        console.log("1. 添加学生\n2. 生成成绩单\n3. 退出");
        let choice = query.getNumber("请输入你的选择（1～3）：");
        console.log(choice);
        switch (choice) {
            case 1:
                while (true){
                    let studentInfo = query.question("请输入学生信息（格式：姓名, 学号, 班级, 学科: 成绩, ...），按回车提交：");
                    if(isLeigitInfo(studentInfo)){
                        break;
                    }
                    console.log("请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：");
                    continue;
                }

                var studentInfos = addStudent(studentInfo);
                break;
            case 2:
                makeGradeList(studentNum);
                break;
            case 3:
                console.log('quitting');
                console.log("****************\n程序退出！\n****************\n")
                return;
            default:
                console.log("****************\n请输入1~3!\n****************")
                break;
        }
    }
}

main();




module.exports = {
    isLeigitInfo:isLeigitInfo,
    main:main
}