/*!
 * 分页器产出
 * @author ydr.me
 * @create 2015-02-05 20:11
 */

'use strict';

var fs = require('fs');
var dato = require('ydr-util').dato;
var Pagination = require('./Pagination.js');
var Template = require('ydr-template');
var template = fs.readFileSync('./template.html', 'utf8');
var tpl = new Template(template);
var defaults = {
    addClass: '',
    max: 1,
    page: 1,
    size: 3
};


/**
 * 分页
 * @param [options] {Object} 分页数据
 * @returns {String}
 */
module.exports = function (options) {
    options = dato.extend(true, {}, defaults, options);

    var list = new Pagination(options);

    return tpl.render(dato.extend(options, {
        pagination: list
    }));
};



