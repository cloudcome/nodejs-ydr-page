/*!
 * 分页器类
 * @author ydr.me
 * @create 2015-02-05 20:08
 */

'use strict';
var dato = require('ydr-util').dato;
var klass = require('ydr-util').class;
var defaults = {
    max: 1,
    page: 1,
    size: 3
};
var Pagination = klass.create({
    STATIC: {
        defaults: defaults
    },
    constructor: function (options) {
        this._options = dato.extend(true, {}, defaults, options);
        return this._init();
    },
    _init: function () {
        var the = this;
        var options = the._options;
        var list = [];
        var i;
        var j;
        var offset;
        var remainLeft = 0;
        var remainRight = 0;

        options.max = Math.abs(dato.parseInt(options.max, 1));
        options.page = Math.abs(dato.parseInt(options.page, 1));
        options.page = options.page > options.max ? options.max : options.page;
        options.size = Math.abs(dato.parseInt(options.size, 3));
        options.size += options.size % 2 ? 0 : 1;
        offset = Math.floor(options.size / 2);

        // 小于可视范围
        if (options.max <= options.size) {
            for (i = 1; i <= options.max; i++) {
                list.push({
                    page: i,
                    active: i === options.page
                });
            }
        }
        // 大于可视范围
        else {
            if (options.page > 1) {
                list.push({
                    type: 'prev',
                    page: options.page - 1
                });
            }

            // 先判断剩余在哪边
            i = options.page - offset;
            j = options.page + offset;


            // 剩左边
            if (i < 1) {
                remainLeft = -i + 1;
                i = 1;
            }
            // 剩右边
            else if (j > options.max) {
                remainRight = j - options.max;
                i -= remainRight;
                if (i < 1) {
                    i = 1;
                }
            }

            // 首页
            if (i !== 1) {
                list.push({
                    page: 1
                });
            }

            if(i > 2){
                list.push({
                    type: 'ellipsis'
                });
            }

            // 当前之前
            for (; i < options.page; i++) {
                list.push({
                    page: i
                });
            }

            // 当前
            list.push({
                page: options.page,
                active: !0
            });

            // 当前之后
            i = options.page + 1;
            j = i + offset + remainLeft;

            if (j > options.max) {
                j = options.max;
            }

            for (; i < j; i++) {
                list.push({
                    page: i
                });
            }

            if(i < options.max){
                list.push({
                    type: 'ellipsis'
                });
            }

            // 尾页
            if (i <= options.max) {
                list.push({
                    page: options.max
                });
            }

            if (options.page < options.max) {
                list.push({
                    type: 'next',
                    page: options.page + 1
                });
            }
        }

        return list;
    }
});

module.exports = Pagination;
