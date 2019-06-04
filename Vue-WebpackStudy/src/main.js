//这个main.js是我们项目的js入口文件

//1.导入Jquery
//import *** from *** 是ES6中导入模块的方式
//由于ES6里面的代码太高级了，浏览器解析不了，所以这一行执行会报错
import $ from 'jquery'
// const  $ = require('jquery')

//使用import语法，导入css样式表
import './css/index.css'
import './css/index.less'
$(function () {
    $("li:odd").css('backgroundColor','pink')
    $('li:even').css('backgroundColor',function () {
        return '#'+'D97635'
    })
})