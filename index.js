/*!
 * 分页器产出
 * @author ydr.me
 * @create 2015-02-05 20:11
 */

'use strict';

var fs = require('fs');
var path = require('path');
var dato = require('ydr-util').dato;
var Pagination = require('./Pagination.js');
var Template = require('ydr-template');
var paginationTemplate = fs.readFileSync(path.join(__dirname, './template/pagination.html'), 'utf8');
var pagerTemplate = fs.readFileSync(path.join(__dirname, './template/pager.html'), 'utf8');
var paginationTpl = new Template(paginationTemplate);
var pagerTpl = new Template(pagerTemplate);
var paginationDefaults = {
    addClass: '',
    max: 1,
    page: 1,
    size: 3,
    url: '/page/:page/'
};
var pagerDefaults = {
    addClass: '',
    prev: '上一页',
    next: '下一页',
    // 默认为第 1 页
    page: 1,
    // 最大页数
    max: 1,
    url: '/page/:page/'
};


/**
 * 分页
 * @param [options] {Object} 分页数据
 * @returns {String}
 */
exports.pagination = function (options) {
    options = dato.extend(true, {}, paginationDefaults, options);

    var list = new Pagination(options);

    return paginationTpl.render(dato.extend(options, {
        pagination: list
    }));
};


/**
 * 分页
 * @param [options] {Object} 分页数据
 * @returns {String}
 */
exports.pager = function (options) {
    options = dato.extend(true, {}, pagerDefaults, options);
    options.prev = {
        text: options.prev,
        url: options.url.replace(':page', options.page - 1)
    };
    options.next = {
        text: options.next,
        url: options.url.replace(':page', options.page + 1)
    };

    return pagerTpl.render(options);
};



