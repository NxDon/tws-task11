"use strict";
var query = require('cli-interact');

function addStudent(studentInfo, infoList) {
    var infoArr = studentInfo.split(',').join("：").split("：");
    var [name, id, className] = infoArr;
    infoList.push({
        name,
        id:parseFloat(id),
        className:parseFloat(className),
        math: parseFloat(infoArr[4]),
        chinese: parseFloat(infoArr[6]),
        english: parseFloat(infoArr[8]),
        programming: parseFloat(infoArr[10])
    })
    console.log(`学生${name}的成绩被添加`);
    return infoList;
}

function formatToString(studentsGrades, mean, median) {
    let title = `
        成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================`;
    let studentsGrade = '';
    studentsGrades.forEach((obj) => {
        studentsGrade += `\n${obj.name}|${obj.math}|${obj.chinese}|${obj.english}|${obj.programming}|${obj.mean}|${obj.total}`;//tober
    })
    let bottom = `\n========================
全班总分平均数：${mean}
全班总分中位数：${median}`;
    return `${title}${studentsGrade}${bottom}`;
}

function getMedian(totalGrades) {
    let length = totalGrades.length;
    if (length % 2 === 0) {
        return (totalGrades[length / 2 - 1] + totalGrades[length / 2]) / 2;
    }
    return totalGrades[Math.floor(length / 2)]
}

function getClassMeanAndMedian(infoLists) {
    let totalGrades = [];
    infoLists.forEach((obj) => {
        totalGrades.push(obj.math);
        totalGrades.push(obj.chinese);
        totalGrades.push(obj.english);
        totalGrades.push(obj.programming);
    });
    totalGrades = totalGrades.sort((a, b) => a - b);
    let mean = totalGrades.reduce((a, b) => a + b) / totalGrades.length;
    let median = getMedian(totalGrades);
    return [mean, median];
}
function getSelectedGrade(ids, infoLists) {
    let results = [];
    let studentID = ids.split(',').map((elem) => parseInt(elem));
    infoLists.forEach((obj) => {
        if (studentID.includes(obj.id)) {
            let total = parseFloat(obj.math) + parseFloat(obj.chinese) + parseFloat(obj.english) + parseFloat(obj.programming);
            let mean = total / 4;
            results.push({
                name: obj.name,
                math: obj.math,
                chinese: obj.chinese,
                english: obj.english,
                programming: obj.programming,
                mean,
                total
            })
        }
    });
    return results;
}

function printGradeList(ids, infoLists) {
        let studentsGrades = getSelectedGrade(ids, infoLists);
    let [mean, median] = getClassMeanAndMedian(infoLists);
    let result = formatToString(studentsGrades, mean, median);
    console.log(result);
}

function isLegitInfo(studentInfo) {
    let reg = new RegExp(/^[\u4e00-\u9fa5]+,\d+,\d+,\d+,\d+,\d+,\d+$/)
    return reg.test(studentInfo);
}

function main() {
    var infoList = [];
    while (true) {
        console.log("1. 添加学生\n2. 生成成绩单\n3. 退出");
        let choice = query.getNumber("请输入你的选择（1～3）：");
        console.log(choice);
        switch (choice) {
            case 1:
                while (true) {
                    var studentInfo = query.question("请输入学生信息（格式：姓名, 学号, 班级, 数学成绩，语文成绩，英语成绩，编程成绩），按回车提交：\n");
                    if (isLegitInfo(studentInfo)) {
                        break;
                    }
                    console.log("请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：");
                    continue;
                }
                addStudent(studentInfo, infoList);
                break;
            case 2:
                var studentIDs = query.question("请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：");
                printGradeList(studentIDs, infoList);
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
    isLegitInfo,
    main,
    addStudent,
    makeGradeList: printGradeList,
    getMeanAndMedian: getClassMeanAndMedian,
    formatToString,
    getStudentsGrade: getSelectedGrade,
    getMedian,
}
