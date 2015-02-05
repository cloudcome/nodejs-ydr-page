/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-02-05 20:19
 */

'use strict';

var page = require('./index.js');
var html1 = page.pagination({
    max: 100,
    page: 33
});
var html2 = page.pager({
    max: 100,
    page: 33
});

//console.log(html1);
console.log(html2);
