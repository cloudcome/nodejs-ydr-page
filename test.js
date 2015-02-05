/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-02-05 20:19
 */

'use strict';

var pagination = require('./index.js');
var html = pagination({
    max: 100,
    page: 33
});

console.log(html);
